export class ErrorNotAllowedOrigin extends Error {
  public name: string
  public message: string

  constructor(message: string) {
    super(message)
    this.name = 'ErrorNotAllowedOrigin'
    this.message = message
  }
}
