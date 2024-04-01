import { accountDetail, userDetail, userPlaylist, vipGrowthpoint } from "@/api/user"
import { EnumLocalStorage, getItem, login } from "@/help/cache"
import { refreshLogin } from "@/help/refreshLogin"
import renderRouter, { defaultRoutes, mapPlayList } from "@/layouts/Router"
import { useLoginStore } from "@/store/login"
import { useCreatorSongList, useFavoriteSongList, useIsVip, useUserStore } from "@/store/user"
import { useEffect, useMemo, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { Route } from "@ant-design/pro-layout/es/typing"


const useApp = () => {
  const update = useLoginStore((state) => state.update)

  const [setAccountInfo, setUserInfo, setVipInfo, setSongList] = useUserStore(
    useShallow((state) => [state.setAccountInfo, state.setUserInfo, state.setVipInfo, state.setSongList])
  )

  const isVip = useIsVip()
  // 账户信息
  const getAccountInfo = async () => {
    try {
      const res = await accountDetail()
      console.log("==账户信息==", res.data)
      res.success && setAccountInfo(res.data)
      if (res.success && res.data.profile && res.data.profile?.nickname!) {
        update({ nickName: res.data.profile.nickname! })
      }

      return res.success
    } catch (error) {
      console.log("error", error)
    }
  }

  // 用户信息
  const getUserDetail = async (userId: number) => {
    try {
      const res = await userDetail({ uid: String(userId) })
      console.log("==用户信息==", res)
      res.success && setUserInfo(res.data)
    } catch (error) {
      console.log("error", error)
    }
  }
  // vip信息
  const getVipGrowthpoint = async () => {
    try {
      const res = await vipGrowthpoint()
      console.log("==vip信息==", res)
      if (res.success) {
        setVipInfo(res.data)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  // 用户歌单信息
  const getUserSongList = async (userId: number) => {
    try {
      const res = await userPlaylist({ uid: String(userId) })
      console.log('歌单==', res)
      if (res.success) {
        setSongList(res.data.playlist)
        // const target =
        // setMenu(target)
      }
    } catch (error) {
      console.log('error', error)
    }
  }


  const init = async () => {
    try {
      await refreshLogin()

      if (login()) {

        // 已登录，设置账号和用户信息
        const result = await getAccountInfo()
        const userId = getItem(EnumLocalStorage.userId) as string
        result && userId && (await getUserDetail(+userId))
        result && userId && (await getUserSongList(+userId))
      }

      // 未登录，默认注册游客模式，获取用户ID
      // !pathName.startsWith("/login") && (await onRegister())

    } catch (error) {
      console.log('error', error)
    }

  }




  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    isVip && getVipGrowthpoint()
  }, [isVip])

  return {
    init,
  }
}

export default useApp