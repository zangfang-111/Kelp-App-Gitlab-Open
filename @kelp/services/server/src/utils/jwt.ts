import { Request } from 'express'
import { decode, verify } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const { AUTH_JWKS_URI } = process.env
interface Jwt {
  'https://roles.sensio.photo': [string]
  iss: 'https://sensio.eu.auth0.com/'
  sub: string
  aud: [string]
  iat: number
  exp: number
  azp: string
  scope: string
}

// i don't like callbacks

// cached jwt client
let client: any = null

if (!client) {
  client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: AUTH_JWKS_URI || '',
  })
}

export const getKey = async (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let decoded: any
    try {
      decoded = decode(token, { complete: true })
    } catch (error) {
      reject(error)
    }
    const { kid } = decoded.header
    client.getSigningKey(kid, (err: any, key: any) => {
      if (err) {
        reject(err)
      } else {
        const signingKey = key.publicKey || key.rsaPublicKey
        resolve(signingKey)
      }
    })
  })
}

export const verifyToken = async (token: string, key: string): Promise<any> => {
  return new Promise((resolve) => {
    resolve(verify(token, key))
  })
}

export const tokenFromEvent = (event: any) => {
  const { headers, queryStringParameters, authorizationToken } = event
  let isTokenFound = false
  let authHeader

  if (authorizationToken || headers.Authorization || headers.authorization) {
    const authHeaderFull = authorizationToken || headers.Authorization || headers.authorization
    authHeader = authHeaderFull.split(' ')[1]
    isTokenFound = true
  } else if (queryStringParameters.token) {
    authHeader = queryStringParameters.token
    isTokenFound = true
  }
  if (!authHeader || !isTokenFound) {
    throw new Error('Token not found in qs.token or Authorization header')
  }

  return authHeader
}

export const verifyTokenString = async (token: string): Promise<Jwt> => {
  const signingKey = await getKey(token)
  return verifyToken(token, signingKey)
}

export function getJWTFromExpressRequest(req: Request): string {
  const {
    headers: { authorization },
  } = req
  if (!authorization) throw new Error('Authorization header is missing')

  const authArray = authorization.split(' ').map((v) => v.trim())
  if (authArray.length != 2)
    throw new Error(
      `Authorization header field is not valid. Please check the header field ${authorization}`,
    )

  const [authType, token] = authArray
  if (authType != 'Bearer') throw new Error('Only supporting authorization type Bearer')
  if (!token) throw new Error('Authorization token is empty.')
  return token
}

interface UserClaims {
  sub: string
  identifier: string
  serviceName: string
  scope: string
}

export const getUserClaimsFromRequest = async (req: Request): Promise<UserClaims> => {
  const token = getJWTFromExpressRequest(req)
  const tokenPayload = await verifyTokenString(token)

  const [serviceName, identifier] = tokenPayload.sub.split('|')
  const ret: UserClaims = {
    sub: tokenPayload.sub,
    identifier,
    serviceName,
    scope: tokenPayload.scope,
  }

  return ret
}
