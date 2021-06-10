import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { isNil } from 'ramda'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'

export interface LightroomRemoveMediaFromCollectionInput {
  mediaId: number
  lrCollectionId: number
}

export const RemoveMediaFromCollection = makeExtendSchemaPlugin(() => {
  // const { pgSql: sql } = build

  return {
    typeDefs: gql`
      input LightroomRemoveMediaFromCollectionInputPayload {
        mediaId: Int!
        lrCollectionId: Int!
      }
      type LightroomRemoveMediaFromCollectionResponse {
        deleted: Boolean
      }

      extend type Mutation {
        """
        This mutation removes the MEDIA from the Album and the LrMediaUniqueness. If all goes well the return will be TRUE, in any other case there will be an error. The mutation accepts media ID which is the REAL media and the Lightroom collection ID.
        """
        lightroomRemoveMediaFromCollection(
          input: LightroomRemoveMediaFromCollectionInputPayload!
        ): LightroomRemoveMediaFromCollectionResponse
      }
    `,
    resolvers: {
      Mutation: {
        async lightroomRemoveMediaFromCollection(
          _mutation,
          args: { input: LightroomRemoveMediaFromCollectionInput },
          { pgClient }: OurGraphQLContext,
        ) {
          console.log('syncing removeMediaFromCollection')
          const {
            input: { mediaId, lrCollectionId },
          } = args

          await pgClient.query('SAVEPOINT remove_media_from_collection')
          /**
           * internal sync method
           */
          async function sync() {
            // Get the LrMedia from media and LrCollection from the collectionId

            const {
              rows: [existingConnection],
            } = await pgClient.query<{
              media_id: number
              album_id: number
              lr_media_id: number
              collection_id: number
              catalog_id: number
            }>({
              text: `select m.id as media_id, am.album_id , lm.id as lr_media_id , lmu.collection_id , lmu.catalog_id
              from app_public.media m
              join app_public.lightroom_media lm on lm.media_id = m.id
              join app_public."_lightroom_media_uniqueness" lmu on lmu.media_id = lm.id
              join app_public."_album_media" am on am.media_id = m.id
              where m.id = $1 and lmu.collection_id = $2;`,
              values: [mediaId, lrCollectionId],
            })

            if (isNil(existingConnection)) {
              throw new Error(
                `Cannot delete the media ${mediaId} from collection ${lrCollectionId}. It doesn't exist.`,
              )
            }

            /**
             * Steps explained:
             * 1. delete the entry from the _album_media
             * 2. delete the entry from the _lightroom_media_uniqueness
             */

            // Step 1
            await pgClient.query({
              text: `DELETE FROM app_public."_album_media" WHERE album_id=$1 AND media_id=$2 returning *;`,
              values: [existingConnection.album_id, existingConnection.media_id],
            })

            // Step 2
            await pgClient.query({
              text: `DELETE FROM app_public."_lightroom_media_uniqueness" WHERE media_id=$1 AND catalog_id=$2 AND collection_id=$3 returning *;`,
              values: [
                existingConnection.lr_media_id,
                existingConnection.catalog_id,
                existingConnection.collection_id,
              ],
            })
          }
          try {
            await sync()

            return {
              data: { deleted: true },
            }
          } catch (error) {
            await pgClient.query('ROLLBACK TO SAVEPOINT remove_media_from_collection')
            throw error
          } finally {
            // Release our savepoint so it doesn't conflict with other mutations
            await pgClient.query('RELEASE SAVEPOINT remove_media_from_collection')
          }
        },
      },
    },
  }
})

export default RemoveMediaFromCollection
