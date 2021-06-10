import qs from 'qs'
import { getLocalAccessToken } from './getTokens'

const defaultQsParams = {
  fm: 'webp',
  fit: 'cover',
  // m: true, // metadata
}

export interface MaculaQsParams {
  w: number
  h?: number
  fm?: 'webp' | 'jpeg'
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'crop'
  fp_l?: number
  fp_r?: number
}

interface CreateImageSrcProps {
  path: string
  qsParams?: Partial<MaculaQsParams>
}

/**
 * Creates image source url based on givenStorage path, qsParams and accessToken
 * @param props Accepts media path and can accept optional qsParams and withAuth
 */
export const createImageSrc = (props: CreateImageSrcProps): string => {
  const { path, qsParams } = props

  if (!path) {
    throw new Error('Path variable must be passed for creation of image src')
  }

  const url = `http://localhost:9876/r/${path}?${qs.stringify({
    // ...params,
    ...defaultQsParams,
    ...qsParams,
    token: getLocalAccessToken(),
  })}`
  return url
}
