/** @format */

import {Menu, MenuProps} from "antd"
import {FC} from "react"
import {MenuKeyEnum} from "@/constants/layout"
import {UserContent} from "./Header/components"
import classNames from "classnames"
import findMusic from "@/assets/menu/findMusic.png"
import findMusicActive from "@/assets/menu/findMusic_active.png"
import video from "@/assets/menu/video.png"
import videoActive from "@/assets/menu/video_Active.png"
import myMusic from "@/assets/menu/myMusic.png"
import myMusic_Active from "@/assets/menu/myMusic_Active.png"
import recentlyPlayed_active from "@/assets/menu/recentlyPlayed_active.png"
import recentlyPlayed from "@/assets/menu/recentlyPlayed.png"
import attention from "@/assets/menu/attention.png"
import attentionActive from "@/assets/menu/attention_active.png"

interface IProps {
  visible: boolean
  selectKeys: string[]
  onMenuItem: (item: any) => void
}
type MenuItem = Required<MenuProps>["items"][number]

const Aside: FC<IProps> = ({visible, selectKeys, onMenuItem}) => {
  const menuList: MenuItem[] = [
    {
      label: "发现音乐",
      key: MenuKeyEnum.FIND_MUSIC,
      icon: (
        <div>
          {selectKeys.includes(MenuKeyEnum.FIND_MUSIC) && (
            <img alt="" src={findMusicActive} width={16} />
          )}
          {!selectKeys.includes(MenuKeyEnum.FIND_MUSIC) && (
            <img alt="" src={findMusic} width={16} />
          )}
        </div>
      )
    },
    {
      label: "精彩视频",
      key: MenuKeyEnum.VIDEO,
      icon: (
        <div>
          {selectKeys.includes(MenuKeyEnum.VIDEO) && <img alt="" src={videoActive} width={16} />}
          {!selectKeys.includes(MenuKeyEnum.VIDEO) && <img alt="" src={video} width={16} />}
        </div>
      )
    },
    {
      label: "我的音乐",
      key: MenuKeyEnum.MY_MUSIC,
      icon: (
        <div>
          {selectKeys.includes(MenuKeyEnum.MY_MUSIC) && (
            <img alt="" src={myMusic_Active} width={16} />
          )}
          {!selectKeys.includes(MenuKeyEnum.MY_MUSIC) && <img alt="" src={myMusic} width={16} />}
        </div>
      )
    },
    {
      label: "最近播放",
      key: MenuKeyEnum.RECENTLY_PLAYED,
      icon: (
        <div>
          {selectKeys.includes(MenuKeyEnum.RECENTLY_PLAYED) && (
            <img alt="" src={recentlyPlayed_active} width={16} />
          )}
          {!selectKeys.includes(MenuKeyEnum.RECENTLY_PLAYED) && (
            <img alt="" src={recentlyPlayed} width={16} />
          )}
        </div>
      )
    },
    {
      label: "关注",
      key: MenuKeyEnum.ATTENTION,
      icon: (
        <div>
          {selectKeys.includes(MenuKeyEnum.ATTENTION) && (
            <img alt="" src={attentionActive} width={16} />
          )}
          {!selectKeys.includes(MenuKeyEnum.ATTENTION) && <img alt="" src={attention} width={16} />}
        </div>
      )
    }
  ]

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
        selectedKeys={selectKeys}
        onClick={onMenuItem}
        mode="inline"
        style={{width: 220, borderInlineEndColor: "#ffffff"}}
        items={menuList}
      />
    </aside>
  )
}

export default Aside
