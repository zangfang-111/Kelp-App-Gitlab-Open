import { PoolClient, QueryConfig, QueryResultRow } from 'pg'
import { UserJwtContext } from '../interfaces'

/**
 * Return the User Id based on connected authentication
 * @param user
 * @param pgClient
 * @param raw If `true` this will return unresolved `pgClient.query`. Default `false`
 */
export async function getUserIdBasedOnJWT(
  user: UserJwtContext,
  pgClient: PoolClient,
): Promise<QueryResultRow> {
  const query: QueryConfig = {
    text: `SELECT u.id FROM app_public.users AS u
    INNER JOIN app_public.user_authentications AS au ON au.user_id = u.id
    WHERE au.service = $1 AND au.identifier = $2 LIMIT 1;`,
    values: [user.jwt.claims.identity.name, user.jwt.claims.identity.identifier],
  }
  return pgClient.query(query)
}
