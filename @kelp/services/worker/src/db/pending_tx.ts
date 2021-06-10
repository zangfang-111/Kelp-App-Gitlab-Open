import snCid from '@sensio/op-sn-cid'
import snJsonEnc from '@sensio/op-sn-json-enc'
import { PoolClient } from 'pg'
import { generateSQLPreparedValues } from '../dbHelpers'

export interface InPayload {
  mediaId?: number
  renditionId?: number
  deviceId?: number
}

export type Pallet = 'poe' | 'statement'
export type ForWhat = 'photo' | 'camera' | 'lens'
export type PayloadType = 'proof' | 'copyright' | 'ownership'

/**
 * Create Pending Transaction for the PoE or the Statement
 * @param data
 * @param pgClient
 */
export async function createPendingTx(
  payload: InPayload,
  payloadType: PayloadType,
  forWhat: ForWhat,
  creatorAccount: string,
  pallet: Pallet,
  pgClient: PoolClient,
) {
  const cid = (
    await snCid([
      {
        data: (
          await snJsonEnc([
            {
              data: payload,
              decode: () => payload,
            },
          ])
        ).data,
        decode: () => payload,
      },
    ])
  ).decode()

  const data = {
    cid,
    payload,
    creatorAccount,
    forWhat,
    pallet,
    payloadType,
  }

  const uniqMappingPrep = generateSQLPreparedValues(data)

  const query = {
    text: `insert into network.pending_tx (${uniqMappingPrep.columns}) values (${uniqMappingPrep.preparedValues}) on conflict do nothing RETURNING *;`,
    values: uniqMappingPrep.values,
  }
  // console.log('inpayloa', payload)

  return pgClient.query(query)
}
