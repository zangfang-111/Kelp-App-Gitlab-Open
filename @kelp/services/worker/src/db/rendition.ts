import { RenditionPatch } from '@kelp/graphql'
import { PoolClient, QueryConfig } from 'pg'
import { generateSQLPreparedValues } from '../dbHelpers'

/**
 * Update simple rendition
 * @param renditionId
 * @param data
 * @param pgClient
 * @param raw If `true` this will return unresolved `pgClient.query`. Default `false`
 */
export async function updateRendition(
  renditionId: number,
  data: RenditionPatch,
  pgClient: PoolClient,
  raw = false,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mediaId, ...rest } = data
  const { columns, values } = generateSQLPreparedValues<Partial<RenditionPatch>>(rest, true)

  const updateQuery: QueryConfig = {
    text: `UPDATE app_public.rendition as r SET ${columns} WHERE r.id=${renditionId} returning *;`,
    values,
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
