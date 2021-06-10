/**
 * Sleep
 * @param howLong miliseconds
 */
export default async function sleep(howLong: number) {
  return new Promise<void>((resolve) => {
    console.log('sleeping ...')
    return setTimeout(() => resolve(), howLong)
  })
}
