import { Request } from 'express'

export interface PotentialQs {
  fm: string
  token?: string
}

const defaultQsParams: PotentialQs = {
  fm: 'webp',
}

export function getAllQueryParams(req: Request): PotentialQs {
  // get the ALL query params
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token: _token, ...restOfTheQsParams } = req.query

  return Object.assign({}, restOfTheQsParams, defaultQsParams)
}
