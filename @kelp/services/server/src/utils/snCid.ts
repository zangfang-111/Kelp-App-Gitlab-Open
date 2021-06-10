import CID from 'cids'
import mh from 'multihashing-async'

export default async function makeCid(data: Buffer): Promise<string> {
  const algo = 'blake2b-256'
  const hash = await mh(data, algo)
  const cid = new CID(1, 'dag-cbor', hash)
  return cid.toV1().toString()
}
