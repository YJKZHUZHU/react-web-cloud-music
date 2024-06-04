/** @format */

import {MenuProps} from "antd"
import cycle from "@/assets/footer/cycle.png"
import listCycle from "@/assets/footer/list-cycle.png"
import order from "@/assets/footer/order.png"
import random from "@/assets/footer/random.png"
import {PlayerModeEnum} from "@/store/player"

type MenuItem = Required<MenuProps>["items"][number]

export enum MenuKeyEnum {
  FIND_MUSIC = "findMusic",
  VIDEO = "video",
  MY_MUSIC = "myMusic",
  MY_SONG_LIST = "songList",
  RECENTLY_PLAYED = "recentlyPlayed",
  ATTENTION='attention'
}
export const MAP_MENU_PATH = new Map<MenuKeyEnum, string>()
  .set(MenuKeyEnum.FIND_MUSIC, "/personal-recommendation")
  .set(MenuKeyEnum.VIDEO, "/video")
  .set(MenuKeyEnum.MY_MUSIC, "/collect")
  .set(MenuKeyEnum.MY_SONG_LIST, "/collect-song-list")
  .set(MenuKeyEnum.RECENTLY_PLAYED, "/recently-played")
  .set(MenuKeyEnum.ATTENTION, "/attention")

export interface ITagItem {
  label: string
  path: string
  key: string
}

export const FIND_MUSIC_TAGS: ITagItem[] = [
  {
    label: "个性推荐",
    path: "/personal-recommendation",
    key: "personal-recommendation"
  },
  {
    label: "歌单",
    path: "/find-music/song-list",
    key: "song-list"
  },
  // {
  //   label: "主播电台",
  //   path: "/todo",
  //   key: "todo"
  // },
  {
    label: "排行榜",
    path: "/find-music/top",
    key: "top"
  },
  {
    label: "歌手",
    path: "/find-music/singer",
    key: "singer"
  },
  {
    label: "最新音乐",
    path: "/find-music/latest-music",
    key: "latest-music"
  }
]

export const MY_MUSIC: ITagItem[] = [
  {
    label: "我的收藏",
    path: "/collect",
    key: "collect"
  },
  {
    label: "音乐云盘",
    path: "/test",
    key: "test"
  },
  {
    label: "我的歌单",
    path: "/my-playlist",
    key: "my-playlist"
  }
]

export const VIDEO: ITagItem[] = [
  {
    label: "视频",
    path: "/video",
    key: "video"
  },
  {
    label: "MV",
    path: "/mv",
    key: "mv"
  }
]

export const MAP_TAGS_VIEWS = new Map<MenuKeyEnum, ITagItem[]>()
  .set(MenuKeyEnum.FIND_MUSIC, FIND_MUSIC_TAGS)
  .set(MenuKeyEnum.MY_MUSIC, MY_MUSIC)
  .set(MenuKeyEnum.VIDEO, VIDEO)

export const MAP_PALYER_MODE = new Map<PlayerModeEnum, string>()
  .set(PlayerModeEnum.order, order)
  .set(PlayerModeEnum.listCycle, listCycle)
  .set(PlayerModeEnum.cycle, cycle)
  .set(PlayerModeEnum.random, random)

export const MAP_PALYER_MODE_NEXT = new Map<PlayerModeEnum, PlayerModeEnum>()
  .set(PlayerModeEnum.order, PlayerModeEnum.listCycle)
  .set(PlayerModeEnum.listCycle, PlayerModeEnum.cycle)
  .set(PlayerModeEnum.cycle, PlayerModeEnum.random)
  .set(PlayerModeEnum.random, PlayerModeEnum.order)

export const MAP_PALYER_MODE_TIP = new Map<PlayerModeEnum, string>()
  .set(PlayerModeEnum.order, "顺序播放")
  .set(PlayerModeEnum.listCycle, "列表循环")
  .set(PlayerModeEnum.cycle, "单曲循环")
  .set(PlayerModeEnum.random, "随机播放")
