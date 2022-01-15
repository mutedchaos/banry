export const localStorageName = 'banry-login-token'

export function logout() {
  localStorage.removeItem(localStorageName)
  document.location.reload()
}

export function getLoginToken() {
  return localStorage.getItem(localStorageName)
}

export function updateLoginToken(newToken: string | null) {
  if (newToken) {
    localStorage.setItem(localStorageName, newToken)
  } else {
    localStorage.removeItem(localStorageName)
  }
}
