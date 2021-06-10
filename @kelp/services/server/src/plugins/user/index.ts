import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'
import { generateECCKeyPair } from '../../utils/pgp'
import { checkForInfinity, createCID, encode } from '../../utils/utils'

export interface CurrentUserIdFunction {
  current_user_id: number
}

export const UserPlugin = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build

  return {
    typeDefs: gql`
      input SimpleUserInput {
        username: String
        email: String!
        email_verified: Boolean
        name: String
        avatarUrl: String
      }
      input RegisterInput {
        user: SimpleUserInput!
        cryptoKey: CryptoKeySimpleInput
        authService: AuthServiceInput!
      }

      input CryptoKeySimpleInput {
        passphrase: String
        comment: String
      }

      input AuthServiceInput {
        service: String
        identifier: String
        details: JSON
      }

      type RegisterPayload {
        user: User! @pgField
      }

      extend type Mutation {
        register(input: RegisterInput!): RegisterPayload
      }

      extend type Query {
        me: User!
      }
    `,
    resolvers: {
      Query: {
        me: async (_, __, ctx, resolveInfo) => {
          const { pgClient } = ctx

          const {
            rows: [user],
          } = await pgClient.query('select * from app_public.current_user()')

          if (!user.id) {
            throw new Error(`USER_DOES_NOT_EXIST`)
          }
          const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
            sql.fragment`app_public.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(user.id)}`)
              sqlBuilder.limit(1)
            },
          )
          return row
        },
      },
      Mutation: {
        async register(
          _mutation,
          args,
          ctx: OurGraphQLContext,
          _resolveInfo,
          { selectGraphQLResultFromTable },
        ) {
          const { input } = args
          const {
            user: {
              jwt: {
                claims: {
                  identity: { name: identityName, identifier: identityIdentifier },
                },
              },
            },
            rootPgPool,
          } = ctx
          const {
            authService: { service, identifier, details },
            user,
            cryptoKey,
          } = input

          // verify that user service and identifier are same as ones in the access token
          if (service != identityName || identifier != identityIdentifier) {
            throw new Error(
              `You can't create user with different ID than your own. Check the authService payload `,
            )
          }

          // link or register a user
          const {
            rows: [dbUser],
          } = await rootPgPool.query(
            // eslint-disable-next-line quotes
            `select * from app_private.link_or_register_user($1, $2, $3, $4, $5, $6);`,
            [
              null,
              service,
              identifier,
              {
                username: user.username,
                avatar_url: user.avatarUrl,
                email: user.email,
                name: user.name,
                ...details,
              },
              {},
              user.email_verified,
            ],
          )

          const {
            rows: [cryptoKeyDb],
          } = await rootPgPool.query(
            `select ck.is_primary from app_public.crypto_keys as ck
              join app_public.users as u on u.id = ck.user_id
              where u.id = $1 and ck.is_primary = true;`,
            [dbUser.id],
          )
          if (!cryptoKeyDb) {
            // CREATE CRYPTO KEY
            // 4. create keys
            const passphrase = cryptoKey && cryptoKey.passphrase ? cryptoKey.passphrase : user.email

            const {
              key,
              privateKeyArmored,
              publicKeyArmored,
              revocationCertificate,
            } = await generateECCKeyPair({
              passphrase,
              name: user.name,
              email: user.email,
            })
            const keyId = key.getKeyId() as any
            const fingerprint: string = key.getFingerprint()
            const algo = key.getAlgorithmInfo() as any
            const expiration_time = await key.getExpirationTime()
            const ck = {
              cid: await createCID(fingerprint),
              user_id: dbUser.id,
              is_primary: true,
              private_key: encode(privateKeyArmored).toString(),
              public_key: encode(publicKeyArmored).toString(),
              fingerprint,
              key_id: keyId.toHex(),
              implementation: 'pgp',
              algorithm: algo.algorithm,
              curve: algo.curve,
              creation_time: key.getCreationTime(),
              expiration_time: !checkForInfinity(expiration_time) ? expiration_time : null,
              revocation_certificate: encode(revocationCertificate).toString(), // put that in the secrets
              passphrase: encode(await createCID(passphrase)).toString(),
            }

            const ckValues = Object.values(ck)
            const placeHolders = ckValues.map((v, k) => `$${k + 1}`).join(',')

            await rootPgPool.query(
              // eslint-disable-next-line quotes
              `select * from app_private.insert_crypto_key(${placeHolders});`,
              ckValues,
            )
          }

          const results = await Promise.all([
            // Fetch the data that was requested from GraphQL, and return it
            selectGraphQLResultFromTable(
              sql.fragment`app_public.users`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(dbUser.id)}`)
              },
            ),

            // // Tell pg we're logged in
            // pgClient.query('select set_config($1, $2, true);', [
            //   'jwt.claims.user_id',
            //   user.id,
            // ]),
          ])
          const [row] = results[0]

          return { data: row }
        },
      },
    },
  }
})

export default UserPlugin
