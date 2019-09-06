import Cookies from 'js-cookie'

const TokenKey = 'tsToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, date) {
  return Cookies.set(TokenKey, token, { expires: date })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}