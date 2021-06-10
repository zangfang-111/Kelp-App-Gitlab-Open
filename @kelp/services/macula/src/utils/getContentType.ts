import * as mime from 'mime-types'

/**
 * Get correct mime type for the browser and the file
 * @param mimeType
 */
export function getContentType(mimeType: string): string {
  const resolvedType = mime.contentType(mimeType)
  if (!resolvedType) {
    return mime.contentType('webp') as string
  } else {
    return resolvedType
  }
}
