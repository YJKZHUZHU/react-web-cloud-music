export enum EnumLocalStorage {
  cookie = "cookie", // 登录凭证
  userId = "userId", // 用户ID
  visitor = "visitor", // 是否游客
  login = "login", // 是否登录
}

export const setItem = (key: EnumLocalStorage, value: string | boolean | number) =>
  window.localStorage.setItem(key, String(value))

export const removeItem = (key: EnumLocalStorage) => window.localStorage.removeItem(key)

export const getItem = (key: EnumLocalStorage) => {
  const result = window.localStorage.getItem(key)
  if ([EnumLocalStorage.visitor, EnumLocalStorage.login].includes(key)) {
    if (result !== null) {
      return result === "true"
    }
    return result
  }
  return result
}

// 是否是游客
export const visitor = () => getItem(EnumLocalStorage.visitor) as boolean

export const login = () => getItem(EnumLocalStorage.login) as boolean

export const setLoginCache = (
  visitor?: boolean,
  login?: boolean,
  userId?: string | number,
  cookie?: string
) => {
  visitor !== undefined && setItem(EnumLocalStorage.visitor, visitor)
  login !== undefined && setItem(EnumLocalStorage.login, login)
  userId !== undefined && setItem(EnumLocalStorage.userId, userId)
  cookie !== undefined && setItem(EnumLocalStorage.cookie, cookie)
}

export const removeLoginCache = () => {
  removeItem(EnumLocalStorage.cookie)
  removeItem(EnumLocalStorage.login)
  removeItem(EnumLocalStorage.userId)
  removeItem(EnumLocalStorage.visitor)
}
