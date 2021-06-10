import { Task } from 'graphile-worker'
import { createPendingTx, ForWhat } from '../db/pending_tx'
import { defaultCreator } from './createPoe'

/**
 * Sync media metadata and the devices to the DB.
 * @param inPayload InPayload
 * @param param JobHelpers
 */
const task: Task = async (inPayload, { withPgClient }) => {
  console.log('executing task mediaPoeExists with payload', inPayload)

  const { rows } = await withPgClient((pgClient) =>
    pgClient.query<{
      device_id: number
      device_type: string
    }>(
      `select d.id as device_id, d.device_type as device_type from app_public.device d where d.poe_id = '' or d.poe_id is null;`,
    ),
  )
  console.log('How many devices are missing the PoE?', rows.length)
  console.log(rows)

  await Promise.all(
    rows.map(
      async (m) =>
        await withPgClient((pgClient) =>
          createPendingTx(
            {
              deviceId: m.device_id,
            },
            'proof',
            m.device_type.toLowerCase() as ForWhat,
            defaultCreator,
            'poe',
            pgClient,
          ),
        ),
    ),
  )
}

export default task
