import CopyrightPlugin from './copyright'
import LightroomRemoveMediaFromCatalog from './lightroom/removeMediaFromCatalog'
import LightroomSyncCatalogPlugin from './lightroom/syncCatalog'
import LightroomSyncCollectionPlugin from './lightroom/syncCollection'
import LightroomSyncMediaPlugin from './lightroom/syncMedia'
import LightroomSyncRenditionPlugin from './lightroom/syncRendition'
import UserPlugin from './user'

export default [
  UserPlugin,
  LightroomSyncCollectionPlugin,
  LightroomSyncCatalogPlugin,
  LightroomSyncMediaPlugin,
  LightroomSyncRenditionPlugin,
  LightroomRemoveMediaFromCatalog,
  CopyrightPlugin,
]
