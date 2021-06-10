import { isNil } from 'ramda'

/**
 * Process the keywords
 * Stupid exif reader says this is the array then returns the fucking object
 * @param data
 */
export default function processKeywords(data: any): string[] {
  if (isNil(data)) {
    return []
  }

  if (Array.isArray(data)) {
    return data.map((k) => k.description)
  } else {
    return [data.description]
  }
}
