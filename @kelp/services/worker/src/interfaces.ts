export interface UserJwtContext {
  jwt: {
    claims: {
      sub: string
      identity: {
        name: string
        identifier: string
      }
    }
  }
}
