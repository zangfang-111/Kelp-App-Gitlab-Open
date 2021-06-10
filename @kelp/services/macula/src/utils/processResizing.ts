/* eslint-disable @typescript-eslint/no-unused-vars */

import { isNil } from 'ramda'
import sharp from 'sharp'

// const options = { all: [], outputs: [] }

export default async function sharpify(
  inputBuffer: Buffer,
  operations?: any,
): Promise<sharp.Sharp> {
  if (!inputBuffer)
    throw new TypeError('sharpify() expects first parameter to be a valid image input.')

  const image: any = sharp(inputBuffer)

  // /* preOperations are performed on the input image and shared across all the outputs */
  for (const func in operations) {
    if (func in operations) {
      const options = operations[func]

      if (options) {
        // console.log(`calling  image[${func}](${options})`)
        image[func](options)
      } else {
        // console.log(`calling  image[${func}]()`)
        image[func]()
      }
    }
  }

  return image.clone()
}

const genMetadata = (qs: { [key: string]: any }) => {
  const { m, mo } = qs

  if (!isNil(m)) {
    let options = null
    if (mo) {
      options = {
        orientation: parseInt(mo, 10),
      }
    }

    return { metadata: options }
  }
  return null
}

const genResize = (qs: { [key: string]: any }) => {
  // https://sharp.pixelplumbing.com/api-resize#resize

  const { w, h, fit } = qs
  const options = {
    height: h ? parseInt(h, 10) : null,
    width: w ? parseInt(w, 10) : null,
    withoutEnlargement: true,
    fit: fit ? fit : 'cover',
  }
  // reassign the fit, since the crop is part of Extract
  if (fit === 'crop') {
    options.fit = 'cover'
  }

  return { resize: options }
}

const genCrop = (qs: { [key: string]: any }) => {
  // https://sharp.pixelplumbing.com/api-resize#resize
  throw new Error('genCrop is not implemented yet')

  // const { w, h, fit, fp_l, fp_t } = qs
  // // we don't need to process this if it's not crop
  // if (fit !== 'crop') {
  //   return null
  // }

  // const width = w ? parseInt(w, 10) : 666
  // const height = h ? parseInt(h, 10) : width

  // const centerWidth = width / 2
  // const centerHeight = height / 2

  // const left = fp_l ? parseInt(fp_l, 10) : centerWidth - 25
  // const top = fp_t ? parseInt(fp_t, 10) : centerHeight - 25

  // console.log(centerHeight, centerWidth)
  // const options = {
  //   height,
  //   width,
  //   left,
  //   top,
  // }
  // console.log(options)

  // return { extract: options }
}

// eslint-disable-next-line complexity
const genOutputImage = (qs: { [key: string]: any }) => {
  // https://sharp.pixelplumbing.com/api-output
  const { fm, q, lossless } = qs

  let ret = {}

  switch (fm) {
    default:
    case 'webp':
      ret = {
        webp: {
          lossless: lossless === 'true' || lossless === '1' ? true : false,
          quality: q ? parseInt(q, 10) : 80,
        },
      }
      break
    case 'png':
      ret = {
        png: {
          quality: q ? parseInt(q, 10) : 100,
        },
      }
      break
    case 'jpg':
    case 'jpeg':
      ret = {
        jpeg: {
          quality: q ? parseInt(q, 10) : 80,
        },
      }
      break
    case 'tiff':
      ret = {
        tiff: {
          quality: q ? parseInt(q, 10) : 80,
        },
      }
      break
    case 'raw':
      break
  }

  return ret
}

// interface Operation {
//   [key: string]: string | number | any
// }

// interface SharpOperations {
//   [k: any]: Operation | null
// }

export const transformQsToSharpOperations = (qs: { [key: string]: any }) => {
  const operations = {
    rotate: null,
    // ...genCrop(qs),
    ...genResize(qs),
    ...genMetadata(qs),
    ...genOutputImage(qs),
    toBuffer: null,
  }

  return operations
}
