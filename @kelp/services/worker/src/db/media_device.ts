import { PoolClient } from 'pg'
import { isNil } from 'ramda'
import { generateSQLPreparedValues } from '../dbHelpers'
import { defaultCreator } from '../tasks/createPoe'
import { createPendingTx, ForWhat } from './pending_tx'

/**
 * Create Device, WARNING, using `ON CONFLICT DO NOTHING`
 * @param data
 * @param pgClient
 */
export async function createMediaDevice(
  data: {
    mediaId: number
    deviceId: number
  },
  pgClient: PoolClient,
  deviceType?: ForWhat | null,
) {
  const uniqMappingPrep = generateSQLPreparedValues(data)
  const query = {
    text: `insert into app_public._media_device (${uniqMappingPrep.columns}) values (${uniqMappingPrep.preparedValues}) on conflict do nothing returning *;`,
    values: uniqMappingPrep.values,
  }

  const {
    rows: [row],
  } = await pgClient.query(query)

  if (!isNil(deviceType)) {
    // create pending poe for the rendition
    await createPendingTx(
      {
        deviceId: data.deviceId,
      },
      'proof',
      deviceType,
      defaultCreator,
      'poe',
      pgClient,
    )
  }

  return row
}
