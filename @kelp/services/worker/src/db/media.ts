import { MediaPatch } from '@kelp/graphql'
import { PoolClient, QueryConfig } from 'pg'
import { generateSQLPreparedValues } from '../dbHelpers'
/**
 * Update the Media record and maybe return the id
 * @param id
 * @param data
 * @param pgClient
 * @param raw If `true` this will return unresolved `pgClient.query`. Default `false`
 */
export async function updateMedia(id: number, data: MediaPatch, pgClient: PoolClient, raw = false) {
  const prepValues = generateSQLPreparedValues<MediaPatch>(data, true)

  const updateQuery: QueryConfig = {
    text: `update app_public.media as m set ${prepValues.columns} where m.id=${id} returning *;`,
    values: prepValues.values,
  }

  if (raw) {
    return pgClient.query(updateQuery)
  } else {
    const {
      rows: [updatedMedia],
    } = await pgClient.query(updateQuery)
    return updatedMedia
  }
}
