/**
 * elapsed time
 * @param start
 * @return miliseconds
 */
export const elapsed_time = (start: any): number => {
  const elapsed = process.hrtime(start)[1] / 1000000 // divide by a million to get nano to milli
  return elapsed
}
