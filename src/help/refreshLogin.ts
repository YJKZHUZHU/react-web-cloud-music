import { anonimous, loginStatus } from "@/api/user"
import { removeLoginCache, setLoginCache, } from "./cache"

const onRegister = async () => {
  try {
    document.cookie = ''
    removeLoginCache()
    const res = await anonimous()
    if (res.success) {
      console.log('==注册游客成功==', res)
      setLoginCache(true, false, res.data.userId, res.data.cookie)
      // window.location.reload()
      location.href = "/"
    }
  } catch (error) {
    console.log("error", error)
  }
}

// 刷新登录状态
export const refreshLogin = async () => {
  try {

    const res = await loginStatus()
    console.log('==刷新登录态==', res)
    if (!res.data.profile && !res.data.account) {

      // 注册游客模式
      await onRegister()
      return
    }
    // 是否是游客
    const isVisitor = !res.data.profile

    const userId = isVisitor ? res.data.account.id : res.data.profile.userId
    setLoginCache(isVisitor, !isVisitor, userId)
  } catch (error) {
    console.log("error", error)
    throw error
  }
}
