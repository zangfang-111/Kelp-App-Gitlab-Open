export const getLocalAccessToken = () => {
  return localStorage.getItem('accessToken') || undefined
}

export const removeLocalAccessToken = () => {
  return localStorage.removeItem('accessToken')
}

export const setLocalAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const getIdToken = () => {
  return localStorage.getItem('idToken') || undefined
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') || undefined
}
