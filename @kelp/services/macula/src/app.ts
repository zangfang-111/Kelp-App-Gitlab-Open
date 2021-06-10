/* eslint-disable no-console */
import { getSdk } from '@kelp/graphql/nodes'
import express, { Express, Request, Response } from 'express'
import { Server } from 'http'
import { isEmpty } from 'ramda'
import { getContentType } from './utils/getContentType'
import { elapsed_time } from './utils/performance'
import { parseStoragePath, processImage } from './utils/processImage'
import { transformQsToSharpOperations } from './utils/processResizing'
import { getAllQueryParams } from './utils/queryParams'
// import refererAllowed from './utils/refererAllowed'
const version = '0.1.1'
/**
 * Main Function to make an express app
 * @param httpServer
 */
export async function makeApp(httpServer: Server): Promise<Express> {
  /*
   * Our Express server
   */
  const app = express()
  app.set('httpServer', httpServer)

  /**
   * Our home route, info on server etc....
   */
  app.get('/r/:cid', async (req: Request, res: Response) => {
    const start = process.hrtime()

    try {
      // refererAllowed(req)
      // need to check the token expiry
      const { token } = req.query

      const client = app.get('graphqlClient')
      client.setHeader('authorization', 'Bearer ' + token)

      const cid = req.params.cid

      const sdk = getSdk(client)

      const { data, errors } = await sdk.GetRenditionByCidWithMedia({ cid })

      if (errors) {
        throw new Error(errors.toString())
      }

      if (!data || !data.rendition) {
        throw new Error('No data or rendition')
      }

      const qsParams = getAllQueryParams(req)
      const contentType = getContentType(qsParams.fm)

      const { rendition } = data

      let copyrightOwner = ''
      if (
        rendition.media &&
        rendition.media.copyrights &&
        !isEmpty(rendition.media.copyrights.nodes)
      ) {
        copyrightOwner = rendition.media.copyrights.nodes[0].statementId
      }

      console.log('Processing rendition %s', cid)

      const operations = transformQsToSharpOperations(qsParams)
      const { path } = parseStoragePath(rendition.imageStoragePath)

      const processedPhoto = await processImage(path, operations)

      res.set({
        'x-kelp-elapsed-time': elapsed_time(start),
        'x-kelp-verified': !!copyrightOwner,
        'x-kelp-copyright-verified': !!copyrightOwner,
        'x-kelp-copyright': copyrightOwner ? `urn:kelp:id:copyright:${copyrightOwner}` : '',
        'X-Powered-By': `Macula/v${version}`,
        'access-control-allow-origin': '*',
        'Content-Type': contentType,
        // Accept: 'image/jpeg',
        // 'Content-Disposition': `filename="${photo.title ||
        //   photo.renditions.nodes[0].name}"`,
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
        //https://varvy.com/pagespeed/cache-control.html
        // 'Cache-Control': 'max-age=2592000, private', // 720 Hour (h)
        'Cache-Control': 'max-age=3600, private, stale-while-revalidate=60',
        'Last-Modified': rendition.updatedAt,
      })

      res.status(200).end(processedPhoto)
    } catch (error) {
      console.error('Error catch', error)
      res.status(400).send(error.message.response)
    }
  })
  app.get('/favicon.ico', (req, res) => {
    res.send()
  })
  app.get('/', (req, res) => {
    res.json({
      name:
        'Macula, copyright and license aware on-the-fly multimedia manipulation (resize) software',
      version,
      up: true,
    })
  })

  return app
}
