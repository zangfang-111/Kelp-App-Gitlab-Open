import { S3 } from 'aws-sdk'
import axios, { AxiosResponse } from 'axios'
import { length } from 'ramda'

/**
 * Get Object using signed URL
 * @param params
 * @param bucket
 */
export async function getObjectViaSignedUrl(
  params: { Key: string },
  bucket = process.env.AWS_BUCKET as string,
): Promise<Buffer> {
  const sourceBucket: S3 = new S3()
  const s3Params = {
    ...params,
    Bucket: bucket,
  }
  const signedUrl = await sourceBucket.getSignedUrlPromise('getObject', s3Params)

  const res = await axios.get<any, AxiosResponse<Buffer>>(signedUrl, {
    responseType: 'arraybuffer',
  })
  const data = res.data

  // const res = await sourceBucket.getObject(s3Params).promise()
  // const data = res.Body

  // console.log(res.headers, signedUrl)

  return data as Buffer
}
/**
 * image_storage_path: 'urn:s3:dev-sensio-image-previews:28/data',
 * @param storagePath
 */
export function parseStoragePath(
  storagePath: string,
): {
  bucket: string
  path: string
  storage: string
} {
  const chunks = storagePath.split(':')
  const chunksLength = length(chunks)
  if (chunksLength !== 4) {
    throw new Error(`Got ${chunksLength} but expected 4`)
  }

  return {
    bucket: chunks[2],
    path: chunks[3],
    storage: chunks[1],
  }
}
