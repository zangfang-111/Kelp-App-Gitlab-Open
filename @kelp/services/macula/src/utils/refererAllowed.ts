import { Request } from 'express'
import { ErrorNotAllowedOrigin } from '../errors/ErrorNotAllowedOrigin'

export function refererAllowed(req: Request) {
  const allowed = ['sensio.ddd']
  const referer = req.get('Referer ')
  const re = new RegExp(allowed.join('|'), 'gim')

  if (!referer || !re.test(referer)) {
    throw new ErrorNotAllowedOrigin('not allowed origin')
  }
}

export default refererAllowed
