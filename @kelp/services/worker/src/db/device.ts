import { DeviceInput, DevicePatch, RenditionPatch } from '@kelp/graphql'
import { PoolClient, QueryConfig } from 'pg'
import { generateSQLPreparedValues } from '../dbHelpers'

/**
 * Update Device
 * @param id
 * @param data
 * @param pgClient
 * @param raw If `true` this will return unresolved `pgClient.query`. Default `false`
 */
export async function updateDevice(
  id: number,
  data: DevicePatch,
  pgClient: PoolClient,
  raw = false,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { columns, values } = generateSQLPreparedValues<Partial<RenditionPatch>>(data, true)

  const updateQuery: QueryConfig = {
    text: `UPDATE app_public.device as d SET ${columns} WHERE d.id=${id} returning *;`,
    values,
  }

  console.log('Update device', updateQuery)
  if (raw) {
    return pgClient.query(updateQuery)
  } else {
    const {
      rows: [updatedMedia],
    } = await pgClient.query(updateQuery)
    return updatedMedia
  }
}
/**
 * Create Device
 * @param data
 * @param pgClient
 */
export async function createDevice(
  data: ThisType<DeviceInput & { userId: number }>,
  pgClient: PoolClient,
) {
  const uniqMappingPrep = generateSQLPreparedValues(data)

  const query = {
    text: `insert into app_public.device (${uniqMappingPrep.columns}) values (${uniqMappingPrep.preparedValues}) RETURNING *;`,
    values: uniqMappingPrep.values,
  }

  return pgClient.query(query)
}

/**
 * Devices exist based on the CID
 * @param data
 * @param pgClient

 */
export async function devicesExistByCid(data: string[], pgClient: PoolClient) {
  const query: QueryConfig = {
    text: `select d.id, d.cid from app_public.device d where d.cid in ($1,$2);`,
    values: data,
  }
  return pgClient.query(query)
}
