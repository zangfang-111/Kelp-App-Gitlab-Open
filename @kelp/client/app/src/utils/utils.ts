import CID from 'cids'
import { decode as mbDecode, encode as mbEncode } from 'multibase'
import mh from 'multihashing-async'

const sensioDefaults = {
  hashAlgo: 'blake2b-256',
  encodingAlgo: 'base32',
}

/**
 * Create a buffer
 * @param s
 */
export const bufferify = (s: Buffer | string | number): Buffer => {
  if (!Buffer.isBuffer(s)) {
    return Buffer.from(s.toString().trim(), 'utf8')
  }
  return s
}

/**
 * elapsed time, useful for performance testing
 * @param start
 * @return miliseconds
 */
export const elapsedTime = (start: [number, number]): number => {
  const elapsed = process.hrtime(start)[1] / 1000000 // divide by a million to get nano to millisecond
  return elapsed
}

/**
 * Encoding Binary-to-text encoding based on multibase
 * @param s Buffer | string | number
 * @param base string, @default base32
 * @returns Buffer
 */
export const encode = (s: Buffer | string | number, base = sensioDefaults.encodingAlgo): Buffer => {
  return mbEncode(base, bufferify(s))
}

/**
 * Decode Binary-to-text encoding based on multibase
 * @param s Buffer | string | number
 * @param base string, @default base32
 * @returns Buffer
 */
export const decode = (s: Buffer | string | number): Buffer => {
  return mbDecode(bufferify(s))
}

/**
 * Create V1 Content Identifier with default params
 * @param s
 * @param hashAlgorithm
 * @returns Promise<string|Buffer>
 */
export async function createCID(
  s: string,
  hashAlgorithm = sensioDefaults.hashAlgo,
): Promise<string> {
  const buff = bufferify(s)
  const identifier = new CID(1, 'dag-cbor', await mh(buff, hashAlgorithm))

  return identifier.toString()
}

/**
 * Check is the value type Infinity
 * taken from https://www.impressivewebs.com/infinity-in-javascript/
 * @param value
 */
export function checkForInfinity(value: number): boolean {
  // You can also use Number.MAX_VALUE
  return value === Number.POSITIVE_INFINITY
}

/**
 * Generate crypto hash using multihash implementation with multibase return string
 * using default hash algo and encoding base
 *
 * @param {string | Buffer} s
 */
export async function createHashWithDefaults(s: string | Buffer): Promise<string> {
  const r = await mh(bufferify(s), sensioDefaults.hashAlgo)
  return encode(r).toString()
}

/**
 * Removes null values from object
 * @param obj
 */
export const cleanupNullValuesFromObject = (obj: any) => {
  const ret: any = {}
  Object.keys(obj).map((k) => {
    const v = obj[k]
    if (v !== null) {
      ret[k] = v
    }
  })
  return Object.entries(ret).length === 0 ? null : ret
}
