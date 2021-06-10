import { InMemoryCache, makeVar } from '@apollo/client'
import type { Notification } from '@kelp/graphql'
import { createImageSrc, MaculaQsParams } from '../utils/createImgSrc'

// Reactive vars
export const activeNotifications = makeVar<Notification[]>([])
export const selectedMediaVar = makeVar<number[]>([])
export const isSidebarOpenVar = makeVar(false)
export const isLoggedInVar = makeVar(false)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isSidebarOpen() {
          return isSidebarOpenVar()
        },
        selectedMedia() {
          return selectedMediaVar()
        },
        isLoggedIn() {
          return isLoggedInVar()
        },
        notifications() {
          return activeNotifications()
        },
      },
    },
    Rendition: {
      fields: {
        src(_, { readField }) {
          const path = readField<string>('cid')
          if (!path) return

          const qsParams: MaculaQsParams = {
            w: 800,
            fit: 'cover',
            fm: 'webp',
          }

          const src = createImageSrc({ path, qsParams })
          return src
        },
      },
    },
  },
})
