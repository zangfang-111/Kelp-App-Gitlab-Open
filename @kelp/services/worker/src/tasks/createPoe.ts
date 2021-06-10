/* eslint-disable no-console */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-case-declarations */

import { WaitGroup } from '@jpwilliams/waitgroup'
import SensioApi from '@sensio/api'
import { getAlice } from '@sensio/api/utils/accounts'
import calculateRecordCid from '@sensio/api/utils/calculateRecordCid'
import saveBatch from '@sensio/api/utils/saveBatch'
import { SnForWhat, SnProof, SnProofData } from '@sensio/types'
import { Task, WithPgClient } from 'graphile-worker'
import { isEmpty, isNil, map, reject } from 'ramda'
import { ForWhat, InPayload as InPendingTxPayload, Pallet, PayloadType } from '../db/pending_tx'

// woss-test kusama account
export const defaultCreator =
  'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network'

const poePhotoRuleId = 'bafy2bzacedx33reiyw5cf7u3b6mq6o6p7pz2zk5lcqodqwnq4zfvwloudeqw6'
const poeCameraRuleId = 'bafy2bzacec3r3ed3xywad56go3iv4bsoe4mff2ndulmoy7s3hocykhkwp4mag'
const poeLensRuleId = 'bafy2bzacea6g26tot3qmg6w74vliofoq6tus7xkd7gynx4l2a6sgamrutdhkc'

interface Extrinsic {
  proofId: string
  extrinsic: any
  dbId: number
  type: 'media' | 'camera' | 'lens'
  pendingTxID: number
}

interface PendingTxTable {
  id: number
  cid: string
  payload: InPendingTxPayload
  payload_type: PayloadType
  for_what: ForWhat
  creator_account: string
  pallet: Pallet
  errors: []
  failed: boolean
}

/**
 * Creates PoE for the Anagolay Network.
 * @param inPayload This is the type of `PoeCreateDataList`
 * @param helpers
 * ```ts
    export interface PoeCreateDataPayload {
      id: number
      forWhat: SnForWhat
      user: UserJwtContext
    }
    export type PoeCreateDataList = PoeCreateDataPayload[]
```
 */
const task: Task = async (inPayload, { withPgClient }) => {
  // create the WaitGroup
  const wg = new WaitGroup()
  // setup connection to the Anagolay Network
  await SensioApi.api.setupConnection()

  const signer = getAlice()
  /**
   * Create the extrinsic for the poe, it will throw the error if the case(forWhat) is not implemented.
   * @param params
   */
  async function processPoe(params: PendingTxTable): Promise<Extrinsic> {
    // console.log('Creating PENDING poe for', params.cid)

    wg.add(1)

    const { for_what } = params
    let extrinsic: Extrinsic | null = null

    switch (for_what) {
      case 'camera':
        const camera = await processDevice(params, withPgClient, for_what)
        if (!isNil(camera)) {
          extrinsic = {
            proofId: camera.payload.id,
            extrinsic: camera.extrinsic,
            dbId: params.payload.deviceId as number,
            type: 'camera',
            pendingTxID: params.id,
          }
        }

        break

      case 'lens':
        const lens = await processDevice(params, withPgClient, for_what)
        if (!isNil(lens)) {
          extrinsic = {
            proofId: lens.payload.id,
            extrinsic: lens.extrinsic,
            dbId: params.payload.deviceId as number,
            type: 'lens',
            pendingTxID: params.id,
          }
        }

        break

      case 'photo':
        const photo = await processPhoto(params, withPgClient)
        console.log(JSON.stringify(photo))

        if (!isNil(photo)) {
          extrinsic = {
            proofId: photo.payload.id,
            extrinsic: photo.extrinsic,
            dbId: params.payload.mediaId as number,
            type: 'media',
            pendingTxID: params.id,
          }
        }

        break

      default:
        throw new Error(`Unrecognized switch case ${for_what}`)
    }

    wg.done()
    return extrinsic as Extrinsic
  }

  const { rows } = await withPgClient((pgClient) =>
    pgClient.query<PendingTxTable>(`select * from network.pending_tx pt
        where pt.failed is false and pt.pallet = 'poe'
        limit 100;`),
  )

  if (isEmpty(rows)) {
    console.log('Nothing to process, no pending tx records')
    await SensioApi.api.disconnect()
    return
  }

  // process all the requests
  console.log('Creating PoE for pending TXs')
  const extrinsicsMap = await Promise.all(map(processPoe, rows))

  // clean the map from nil values
  const extrinsics = reject(isNil, extrinsicsMap)
  console.log('extrinsics.length', extrinsics.length)

  if (isEmpty(extrinsics)) {
    console.log('Nothing to create, extrinsics are empty.')

    return
  }

  // extract the extrinsics
  const txs = extrinsics.map((e) => e.extrinsic)
  console.log('txs.length', txs.length)

  // batch save them
  if (isNil(txs)) {
    console.log('Nothing to create')
    return
  }

  // save the TXs to the network
  const b = await saveBatch(txs, signer)
  console.log('Saving PoE to the network', b)

  wg.add(1)
  let lastError = null
  b.on('utils::txs::batch', async (p) => {
    console.log('batch::message', p.message)
    console.log('batch::all', p)

    if (p.message.includes('BatchInterrupted')) {
      wg.add(1)
      console.error('ERROR in the event', p)
      lastError = p
      wg.done()
    } else {
      if (p.finalized) {
        console.log('batch-finalized', p, lastError)
        // need to update the things
        // let updateMedia: [string, number][] = []
        // let updateDevice: [string, number][] = []
        const deletePendingTxIds: number[] = []
        await Promise.all(
          extrinsics.map(async (e) => {
            console.log('Updating DB for', e.proofId, e.type)

            switch (e.type) {
              case 'media':
                // updateMedia.push([e.proofId, e.dbId])
                wg.add(1)
                await withPgClient((pgClient) =>
                  pgClient.query(`UPDATE app_public.media SET poe_id=$1 WHERE id=$2;`, [
                    e.proofId,
                    e.dbId,
                  ]),
                )
                wg.done()
                // console.log(`Done with the mediaID ${e.dbId}`)
                break
              case 'camera':
              case 'lens':
                wg.add(1)
                await withPgClient((pgClient) =>
                  pgClient.query(`UPDATE app_public.device SET poe_id=$1 WHERE id=$2;`, [
                    e.proofId,
                    e.dbId,
                  ]),
                )
                wg.done()
                // console.log(`Done with the deviceID ${e.dbId}`)
                // updateDevice.push([e.proofId, e.dbId])
                break

              default:
                break
            }
            deletePendingTxIds.push(e.pendingTxID)
          }),
        )

        // if (!isEmpty(updateMedia)) {
        //   const unnestPoEArray = updateMedia.map((m) => `'${m[0]}'`).join(',')
        //   const unnestIdArray = updateMedia.map((m) => m[1]).join(',')
        //   const query = `UPDATE app_public.media as m
        //   SET poe_id=dt.poe_id
        //   from (select unnest(array[$1]) as poe_id, unnest(array[$2]) as id) as dt WHERE m.id=dt.id;`

        //   await withPgClient((pgClient) => pgClient.query(query, [unnestPoEArray, unnestIdArray]))
        // }

        if (!isEmpty(deletePendingTxIds)) {
          // delete the records
          wg.add(1)
          await withPgClient((pgClient) =>
            pgClient.query(
              `DELETE FROM network.pending_tx as ptx WHERE ptx.id in (${deletePendingTxIds.join(
                ',',
              )});`,
            ),
          )
          wg.done()
        }
        wg.add(1)
        await SensioApi.api.disconnect()
        wg.done()

        // this done() call is for the one add(1) above the .on listener
        wg.done()
      }
    }
  })
  try {
    console.log('waiting ....')
    await wg.wait()
  } catch (error) {
    console.log('error', error)
  }
}
/**
 * Process the request for the CAMERA OR LENS and save it to the chain
 * @param params
 * @param withPgClient
 */
async function processDevice(
  params: PendingTxTable,
  withPgClient: WithPgClient,
  for_what: ForWhat,
) {
  console.log('processing', params)

  const {
    rows: [device],
  } = await withPgClient((pgClient) =>
    pgClient.query<{
      cid: string
      poe_id: string
    }>(`select d.cid, d.poe_id from app_public.device as d where d.id = $1;`, [
      params.payload.deviceId,
    ]),
  )
  if (isNil(device)) {
    console.error(`Device with ID ${params.payload.deviceId} does not exist.`)
  }

  if (!isNil(device.poe_id) && !isEmpty(device.poe_id)) {
    return null
  }
  let ruleId = ''
  let groups: SnForWhat[] = []

  switch (for_what) {
    case 'camera':
      ruleId = poeCameraRuleId
      groups = [SnForWhat.CAMERA]
      break
    case 'lens':
      ruleId = poeLensRuleId
      groups = [SnForWhat.LENS]
      break
  }
  const data: SnProofData = {
    ruleId,
    prevId: '',
    creator: params.creator_account,
    groups, // @FUCK fix this on the network side to INCLUDE one of these, not EXACTLY verify against the rule
    params: [
      {
        k: 'an_cid',
        v: device.cid,
      },
    ],
  }

  const payload: SnProof = {
    id: await calculateRecordCid(data),
    data,
  }

  return { extrinsic: SensioApi.pallets.poe.createSubmittableExtrinsic(payload), payload }
}

/**
 * Process the request for the PHOTO and save it to the chain
 * @param params
 * @param withPgClient
 */
async function processPhoto(params: PendingTxTable, withPgClient: WithPgClient) {
  const {
    rows: [mediaAndRendition],
  } = await withPgClient((pgClient) =>
    pgClient.query<{
      metadata_cid: string
      pixel_cid: string
      phash: string
      poe_id: string
    }>(
      `select
    r.metadata_cid,
    r.pixel_cid,
    m.phash,
    m.poe_id
    from app_public.rendition as r
    join app_public.media as m on m.id=r.media_id
    where m.id=$1 and r.id=$2;`,
      [params.payload.mediaId, params.payload.renditionId],
    ),
  )

  if (isNil(mediaAndRendition)) {
    console.error(
      `Rendition with ID ${params.payload.renditionId} does not exist and media with Id ${params.payload.mediaId}`,
    )
  }

  if (!isNil(mediaAndRendition.poe_id) && !isEmpty(mediaAndRendition.poe_id)) {
    return null
  }

  const data: SnProofData = {
    ruleId: poePhotoRuleId,
    prevId: '',
    creator: params.creator_account,
    groups: [SnForWhat.PHOTO],
    params: [
      {
        k: 'image_raw_pixels_hash',
        v: mediaAndRendition.pixel_cid,
      },
      {
        k: 'image_metadata_hash',
        v: mediaAndRendition.metadata_cid,
      },
      {
        k: 'image_phash',
        v: mediaAndRendition.phash,
      },
    ],
  }

  const payload: SnProof = {
    id: await calculateRecordCid(data),
    data,
  }

  return { extrinsic: SensioApi.pallets.poe.createSubmittableExtrinsic(payload), payload }
}

export default task
