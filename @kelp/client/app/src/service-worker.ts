import { clientsClaim, skipWaiting } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

// Fix self: https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
declare const self: ServiceWorkerGlobalScope

const IMAGE_CACHE = 'kelp_images'

self.addEventListener('install', () => {
  console.log('install got from event SW')
})

skipWaiting()
clientsClaim()

registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico)$/,
  new CacheFirst({
    cacheName: IMAGE_CACHE,
    plugins: [new ExpirationPlugin({ maxEntries: 100, purgeOnQuotaError: true })],
  }),
  'GET',
)

precacheAndRoute(self.__WB_MANIFEST)

export {}
