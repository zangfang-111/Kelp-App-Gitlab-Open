import snCid from '@sensio/op-sn-cid'
import { InputParams as SnCidInputParams } from '@sensio/op-sn-cid/interfaces'
import { InputParams } from '@sensio/op-sn-file/interfaces'
import snImageMetadata from '@sensio/op-sn-image-metadata'
import snImageMetadataHash from '@sensio/op-sn-image-metadata-hash'
import snImagePhash from '@sensio/op-sn-image-phash'
import snImageRawPixelsHash from '@sensio/op-sn-image-raw-pixels-hash'
import * as Sentry from '@sentry/node'
import { Task } from 'graphile-worker'
import { isEmpty, isNil } from 'ramda'
// import sharp from 'sharp'
import { createDevice, devicesExistByCid } from '../db/device'
import { updateMedia } from '../db/media'
import { createMediaDevice } from '../db/media_device'
import { updateRendition } from '../db/rendition'
import { getUserIdBasedOnJWT } from '../db/user'
import { DeviceInput, Devicetype, MediaPatch, RenditionPatch } from '../graphqlNodes'
import { UserJwtContext } from '../interfaces'
import { getObjectViaSignedUrl, parseStoragePath } from '../s3'
import processKeywords from '../utils/keywords'
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://e1241a243ec24514b5651447aad43086@o235171.ingest.sentry.io/1823888',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
interface InPayload {
  mediaId: number
  renditionId: number
  user: UserJwtContext
}

export interface RenditionTable {
  id: number
  user_id: number
  media_id: number
  cid: string
  pixel_cid: string
  metadata_cid: string
  file_name: string
  size: number
  file_format: string
  height: number
  width: number
  fps: number
  file_version: string
  is_smart_preview: boolean
  is_master: boolean
  image_storage_path: string
  metadata_storage_path: string
  created_at: string
  updated_at: string
  develop_settings: JSON
  metadata: JSON
}

/**
 * Sync media metadata and the devices to the DB.
 * @param inPayload InPayload
 * @param param JobHelpers
 */
const task: Task = async (inPayload, { withPgClient }) => {
  const transaction = Sentry.startTransaction({
    op: 'syncMediaMetadata',
    name: 'Sync media metadata',
  })

  try {
    console.log('executing task syncMediaMetadata with payload', inPayload)

    const payload: InPayload = inPayload as any

    const {
      rows: [rendition],
    } = await withPgClient((pgClient) =>
      pgClient.query<RenditionTable>(`select * from app_public.rendition as r where r.id=$1;`, [
        payload.renditionId,
      ]),
    )

    if (isNil(rendition)) {
      throw new Error(`Rendition with ID ${payload.renditionId} does not exist.`)
    }
    const { path, bucket, storage } = parseStoragePath(rendition.image_storage_path)

    if (storage !== 's3') {
      throw new Error(`Storage not supported ${storage}`)
    }

    const bufferResponse = await getObjectViaSignedUrl(
      {
        Key: path,
      },
      bucket,
    )

    if (isNil(bufferResponse)) {
      throw new Error('BufferResponse cannot be empty')
    }
    const filePayload = {
      data: Buffer.from(bufferResponse),
      decode: () => Buffer.from(bufferResponse),
    }

    //   const sharpImage = sharp(bufferResponse)
    //   const imageBuff = await sharpImage.toBuffer()

    //   console.log('imageBuff length sharp', imageBuff.length);
    //   const imageRawPixelsHash1 = await snCid<SnCidInputParams>([{
    //     data: new Uint8Array(imageBuff),
    //     decode: () => imageBuff
    //   }])
    // console.log(imageRawPixelsHash1.decode());

    const imageRawPixelsHash = await snImageRawPixelsHash<InputParams>([filePayload])
    const imageMetadataHash = await snImageMetadataHash<InputParams>([filePayload])
    const imagePhash = await snImagePhash<InputParams>([filePayload])

    const cid = await snCid<SnCidInputParams>([
      {
        data: new Uint8Array(bufferResponse),
        decode: () => bufferResponse,
      },
    ])

    const { exif, iptc, xmp } = (await snImageMetadata<InputParams>([filePayload])).decode()

    const updateRenditionData: RenditionPatch = {
      cid: cid.decode(),
      pixelCid: imageRawPixelsHash.decode(),
      metadataCid: imageMetadataHash.decode(),
      aspectRatio: rendition.width / rendition.height,
    }

    const updateMediaData: MediaPatch = {
      phash: imagePhash.decode(),
      aperture: exif?.ApertureValue?.description,
      focalLength: exif?.FocalLength?.description,
      shutterSpeed: exif?.ShutterSpeedValue?.description,
      exposureTime: exif?.ExposureTime?.description,
      exposureProgram: exif?.ExposureProgram?.description,
      exposureBias: exif?.ExposureBiasValue?.description,
      isoSpeedRating: exif?.ISOSpeedRatings?.value,
      meteringMode: exif?.MeteringMode?.description,
      title: xmp?.title?.description,
      headline: iptc?.Headline?.description,
      caption: iptc?.['Caption/Abstract']?.description,
      keywords: processKeywords(iptc?.Keywords),
      dateCreated: xmp?.DateCreated?.description
        ? new Date(xmp?.DateCreated?.description).toUTCString()
        : null,
      creator: xmp?.creator?.description,
      // gps: { longitude: exif?.GPSDestLongitude?.value, latitude: exif?.GPSLatitude?.value },
    }
    // console.log(JSON.stringify({ exif, iptc, xmp, updateMediaData }))
    let cameraIdentifiers: string[] = []

    if (exif?.BodySerialNumber?.description) {
      cameraIdentifiers = [exif?.BodySerialNumber?.description]
    }

    const cameraIdentifiersBuffer = Buffer.from(JSON.stringify(cameraIdentifiers))

    const cameraDevice: DeviceInput = {
      cid: (
        await snCid<SnCidInputParams>([
          {
            data: new Uint8Array(cameraIdentifiersBuffer),
            decode: () => cameraIdentifiersBuffer,
          },
        ])
      ).decode(),
      deviceType: Devicetype.Camera,
      name: `My ${exif?.Model?.description}`,
      maker: exif?.Make?.description,
      model: exif?.Model?.description,
      identifiers: cameraIdentifiers,
    }

    const lensIdentifiers = []
    if (xmp?.LensID?.description) {
      lensIdentifiers.push(xmp?.LensID?.description)
    }
    if (xmp?.LensSerialNumber?.description) {
      lensIdentifiers.push(xmp?.LensSerialNumber?.description)
    }

    const lensIdentifiersBuffer = Buffer.from(JSON.stringify(lensIdentifiers))
    const lensDevice: DeviceInput = {
      cid: (
        await snCid<SnCidInputParams>([
          {
            data: new Uint8Array(lensIdentifiersBuffer),
            decode: () => lensIdentifiersBuffer,
          },
        ])
      ).decode(),
      deviceType: Devicetype.Lens,
      name: `My ${xmp?.Lens?.description}`,
      model: xmp?.Lens?.description,
      identifiers: lensIdentifiers,
    }

    const {
      rows: [user],
    } = await withPgClient((pgClient) => getUserIdBasedOnJWT(payload.user, pgClient))

    // maybe we have the devices already?
    const { rows: existingDevices } = await withPgClient((pgClient) =>
      devicesExistByCid([cameraDevice.cid, lensDevice.cid], pgClient),
    )

    if (!isEmpty(existingDevices)) {
      // go through all devices and connect them to the media
      await Promise.all(
        existingDevices.map(
          async (m: any) =>
            await withPgClient((pgClient) =>
              createMediaDevice({ deviceId: m.id, mediaId: payload.mediaId }, pgClient),
            ),
        ),
      )
    } else {
      if (cameraDevice.identifiers?.length > 0) {
        console.log('Creating camera device')
        const {
          rows: [{ id: cameraDeviceId }],
        } = await withPgClient((pgClient) =>
          createDevice({ ...cameraDevice, userId: user.id }, pgClient),
        )

        await withPgClient((pgClient) =>
          createMediaDevice(
            { deviceId: cameraDeviceId, mediaId: payload.mediaId },
            pgClient,
            'camera',
          ),
        )
      }

      if (lensDevice.identifiers?.length > 0) {
        console.log('Creating lens device')
        const {
          rows: [{ id: lensDeviceId }],
        } = await withPgClient((pgClient) =>
          createDevice({ ...lensDevice, userId: user.id }, pgClient),
        )

        await withPgClient((pgClient) =>
          createMediaDevice({ deviceId: lensDeviceId, mediaId: payload.mediaId }, pgClient, 'lens'),
        )
      }
    }

    await withPgClient((pgClient) => updateMedia(payload.mediaId, updateMediaData, pgClient))

    await withPgClient((pgClient) =>
      updateRendition(payload.renditionId, updateRenditionData, pgClient, true),
    )
  } catch (e) {
    Sentry.captureException(e)
    throw e
  } finally {
    transaction.finish()
  }
}

export default task
