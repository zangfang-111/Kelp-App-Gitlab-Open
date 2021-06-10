import sharpify from './processResizing'
import { get } from './s3'

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
  const chunksLength = chunks.length
  if (chunksLength !== 4) {
    throw new Error(`Got ${chunksLength} but expected 4`)
  }

  return {
    bucket: chunks[2],
    path: chunks[3],
    storage: chunks[1],
  }
}

export const processImage = async (path: string, sharpOperations: any) => {
  // https://dev-sensio-image-previews.s3-eu-west-1.amazonaws.com/20140607-_MG_1948.jpg

  let image: any = null
  // const cached = mc.get(path)
  // if (!cached) {
  // console.info('Caching the raw bytes from the storage', path)
  const { Body } = await get({ Key: path })
  // mc.put(path, Body)
  image = Body
  // } else {
  //   image = cached
  // }

  const r = await sharpify(image as any, sharpOperations)
  return r.toBuffer()
}
