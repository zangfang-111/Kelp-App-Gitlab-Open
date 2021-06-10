import { Task } from 'graphile-worker'
import { createPendingTx } from '../db/pending_tx'
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
      media_id: number
      rendition_id: number
    }>(`select m.id as media_id, r.id as rendition_id from app_public.media m
    join app_public.rendition r on r.media_id = m.id
          where m.poe_id is null or m.poe_id = ''  or m.poe_id is null;`),
  )
  console.log('How many media is missing the PoE?', rows.length)

  await Promise.all(
    rows.map(
      async (m) =>
        await withPgClient((pgClient) =>
          createPendingTx(
            {
              mediaId: m.media_id,
              renditionId: m.rendition_id,
            },
            'proof',
            'photo',
            defaultCreator,
            'poe',
            pgClient,
          ),
        ),
    ),
  )
}

export default task
