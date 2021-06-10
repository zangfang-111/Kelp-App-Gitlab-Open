type LensData = {
  lens: string
  lensId: string
  lensSerialNumber: string
  identifiers: string[]
}
type CameraData = {
  maker: string
  model: string
  serialNumber: string
  identifiers: string[]
}

/**
 * Metadata Tag
 * @param tag
 */
export const tagDescription = (tag: ExifReader.XmpTag | undefined | ExifReader.StringArrayTag) => {
  if (!tag) return ''

  const { description } = tag

  return description
}
/**
 * Extracts the Lens data from photo metadata
 * @param metadata
 */
export function extractLensData(metadata: any): LensData {
  const lens: LensData = {
    lens: tagDescription(metadata?.LensModel),
    lensId: tagDescription(metadata?.LensID),
    lensSerialNumber: tagDescription(metadata?.LensSerialNumber),
    identifiers: [],
  }
  if (lens.lensId) {
    lens.identifiers.push(lens.lensId)
  }

  if (lens.lensSerialNumber) {
    lens.identifiers.push(lens.lensSerialNumber)
  }

  return lens
}

/**
 * Extracts the Camera data from photo metadata
 * @param metadata
 */
export function extractCameraData(metadata: any): CameraData {
  const camera = {
    maker: tagDescription(metadata?.Make),
    model: tagDescription(metadata?.Model),
    serialNumber: tagDescription(metadata?.BodySerialNumber),
    identifiers: [tagDescription(metadata?.BodySerialNumber)],
  }

  return camera
}
