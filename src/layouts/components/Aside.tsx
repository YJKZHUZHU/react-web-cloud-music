/** @format */

import {Menu, MenuProps} from "antd"
import {history} from "@umijs/max"
import {FC} from "react"
import {MAP_MENU_PATH, MenuKeyEnum} from "@/constants/layout"
import {UserContent} from "./Header/components"
import classNames from "classnames"
import findMusic from "@/assets/menu/findMusic.png"
import findMusicActive from "@/assets/menu/findMusic_active.png"
import video from "@/assets/menu/video.png"
import videoActive from "@/assets/menu/video_Active.png"
import playList from "@/assets/menu/myPlayList.png"
import myCollect from "@/assets/menu/myCollect.png"
import myLoveMusic from "@/assets/menu/myLoveMusic.png"
import myLoveMusicActive from "@/assets/menu/myLoveMusic_active.png"
import myCollectActive from "@/assets/menu/myCollect_active.png"
import playListActive from "@/assets/menu/myPlaylist_active.png"
import recentlyPlayedActive from "@/assets/menu/recentlyPlayed_active.png"
import recentlyPlayed from "@/assets/menu/recentlyPlayed.png"
import attention from "@/assets/menu/attention.png"
import attentionActive from "@/assets/menu/attention_active.png"
import {useActiveMenu, useSetActiveMenu} from "@/store/app"

interface IProps {
  visible: boolean
  // onMenuItem: (item: {key: string; keyPath: string[]}) => void
}
type MenuItem = Required<MenuProps>["items"][number]

const Aside: FC<IProps> = ({visible}) => {
  const activeMenu = useActiveMenu()

  const renderIcon = (key: MenuKeyEnum, icon: string, activeIcon: string) => {
    const active = activeMenu?.includes(key)
    return (
      <div>
        <img
          className={classNames(active ? "inline-block" : "hidden")}
          alt=""
          src={activeIcon}
          width={16}
        />
        <img
          className={classNames(!active ? "inline-block" : "hidden")}
          alt=""
          src={icon}
          width={16}
        />
      </div>
    )
  }

  const menuList: MenuItem[] = [
    {
      label: "发现音乐",
      key: MenuKeyEnum.FIND_MUSIC,
      icon: renderIcon(MenuKeyEnum.FIND_MUSIC, findMusic, findMusicActive)
    },
    {
      label: "精彩视频",
      key: MenuKeyEnum.VIDEO,
      icon: renderIcon(MenuKeyEnum.VIDEO, video, videoActive)
    },
    {
      label: "最近播放",
      key: MenuKeyEnum.RECENTLY_PLAYED,
      icon: renderIcon(MenuKeyEnum.RECENTLY_PLAYED, recentlyPlayed, recentlyPlayedActive)
    },
    {
      label: "关注",
      key: MenuKeyEnum.ATTENTION,
      icon: renderIcon(MenuKeyEnum.ATTENTION, attention, attentionActive)
    },
    {
      label: "我的歌单",
      key: MenuKeyEnum.MY_PLAYLIST,
      icon: renderIcon(MenuKeyEnum.MY_PLAYLIST, playList, playListActive)
    },
    {
      label: "我的收藏",
      key: MenuKeyEnum.COLLECT,
      icon: renderIcon(MenuKeyEnum.COLLECT, myCollect, myCollectActive)
    },
    {
      label: "我喜欢的音乐",
      key: MenuKeyEnum.MY_LOVE_MUSIC,
      icon: renderIcon(MenuKeyEnum.MY_LOVE_MUSIC, myLoveMusic, myLoveMusicActive)
    }
  ]
  const setActiveMenu = useSetActiveMenu()

  const onMenuItem = (item: {key: string; keyPath: string[]}) => {
    console.log("item--", item)
    const pathKey = item.key as unknown as MenuKeyEnum
    setActiveMenu(pathKey)
    const path = MAP_MENU_PATH.get(pathKey)
    history.push(path!)
  }

  return (
    <aside
      className={classNames(
        "w-[220px] bg-[#ffffff]  h-[calc(100vh-60px)] flex flex-col gap-[4px]",
        visible ? "pb-[80px]" : "pb-[0px]"
      )}>
      <div className=" mb-[4px] mx-[4px] pl-[24px] pr-[16px]">
        <UserContent />
      </div>

      <Menu
        className="flex-1 overflow-scroll"
        selectedKeys={[activeMenu!]}
        onClick={onMenuItem}
        mode="inline"
        style={{width: 220, borderInlineEndColor: "#ffffff"}}
        items={menuList}
      />
    </aside>
  )
}

export default Aside
