import API from "@/api"
import { removeLoginCache } from "@/help/cache"

const useLogout = () => {
  return async () => {
    try {
      const res = await API.logout({ loading: true })
      document.cookie = ''
      removeLoginCache()
      // window.location.reload()
      location.href = '/'
      console.log("==退出登录==", res)
    } catch (error) {
      console.log("error", error)
    }
  }
}

export default useLogout
