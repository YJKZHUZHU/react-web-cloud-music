import { loginStatus } from "@/api/user"
import { setLoginCache, } from "./cache"

// 刷新登录状态
export const refreshLogin = async () => {
  try {

    const res = await loginStatus()
    if (!res.data.profile && !res.data.account) return
    // 是否是游客
    const isVisitor = !res.data.profile

    const userId = isVisitor ? res.data.account.id : res.data.profile.userId
    setLoginCache(isVisitor, !isVisitor, userId)
  } catch (error) {
    console.log("error", error)
    throw error
  }
}
