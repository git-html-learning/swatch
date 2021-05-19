import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//存储用户名
export function setName(name) {
  return Cookies.set("name", name)
}
export function getName() {
  return Cookies.get("name")
}

//管理员操作
const adminToken = 'adminToken'

export function getAdminToken() {
  return Cookies.get(adminToken)
}

export function setAdminToken(admintoken) {
  return Cookies.set(adminToken, admintoken)
}

export function removeAdminToken() {
  return Cookies.remove(adminToken)
}