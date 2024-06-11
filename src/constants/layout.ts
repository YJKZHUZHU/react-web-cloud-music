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
  ATTENTION = "attention",
  COLLECT = "collect",
  MY_PLAYLIST = "my-playlist",
  MY_LOVE_MUSIC = "my-love-music",
  EXCLUSIVE_BROADCAST = "exclusive-broadcast"
}
export const MAP_MENU_PATH = new Map<MenuKeyEnum, string>()
  .set(MenuKeyEnum.FIND_MUSIC, "/personal-recommendation")
  .set(MenuKeyEnum.VIDEO, "/video")
  .set(MenuKeyEnum.MY_PLAYLIST, "/my-playlist")
  .set(MenuKeyEnum.MY_LOVE_MUSIC, "/my-love-music")
  .set(MenuKeyEnum.RECENTLY_PLAYED, "/recently-played-single")
  .set(MenuKeyEnum.ATTENTION, "/attention")
  .set(MenuKeyEnum.COLLECT, "/collect-album")

export interface ITagItem {
  label: string
  path: string
  key: string
  parentKey?: MenuKeyEnum
}

export const FIND_MUSIC_TAGS: ITagItem[] = [
  {
    label: "个性推荐",
    path: "/personal-recommendation",
    key:  "/personal-recommendation",
    parentKey: MenuKeyEnum.FIND_MUSIC
  },
  {
    label: "歌单",
    path: "/find-music/song-list",
    key: "/find-music/song-list",
    parentKey: MenuKeyEnum.FIND_MUSIC
  },
  {
    label: "排行榜",
    path: "/find-music/top",
    key: "/find-music/top",
    parentKey: MenuKeyEnum.FIND_MUSIC
  },
  {
    label: "歌手",
    path: "/find-music/singer",
    key: "/find-music/singer",
    parentKey: MenuKeyEnum.FIND_MUSIC
  },
  {
    label: "最新音乐",
    path: "/find-music/latest-music",
    key: "/find-music/latest-music",
    parentKey: MenuKeyEnum.FIND_MUSIC
  }
]

export const MY_MUSIC: ITagItem[] = [
  {
    label: "我的收藏",
    path: "/collect",
    key: "/collect",
  },
  {
    label: "音乐云盘",
    path: "/test",
    key: "/test",
  },
  {
    label: "我的歌单",
    path: "/my-playlist",
    key: "/my-playlist",
  }
]

export const VIDEO: ITagItem[] = [
  {
    label: "视频",
    path: "/video",
    key: "/video",
    parentKey: MenuKeyEnum.VIDEO
  },
  {
    label: "MV",
    path: "/mv",
    key: "/mv",
    parentKey: MenuKeyEnum.VIDEO
  }
]

export const COLLECT: ITagItem[] = [
  {
    label: "专辑",
    path: "/collect-album",
    key:"/collect-album",
    parentKey: MenuKeyEnum.COLLECT
  },
  {
    label: "歌手",
    path: "/collect-singer",
    key: "/collect-singer",
    parentKey: MenuKeyEnum.COLLECT
  },
  {
    label: "视频",
    path: "/collect-video",
    key: "/collect-video",
    parentKey: MenuKeyEnum.COLLECT
  },
  {
    label: "专栏",
    path: "/collect-special-column",
    key:"/collect-special-column",
    parentKey: MenuKeyEnum.COLLECT
  }
]

export const TAG_LIST: ITagItem[] = [
  ...FIND_MUSIC_TAGS,
  ...VIDEO,
  ...COLLECT,
  {
    label: "动态",
    path: "/attention",
    key: "/attention",
    parentKey: MenuKeyEnum.ATTENTION
  },
  {
    label: "歌曲",
    path: "/recently-played-single",
    key:  "/recently-played-single",
    parentKey: MenuKeyEnum.RECENTLY_PLAYED
  },
  {
    label: "视频",
    path: "/recently-played-video",
    key:  "/recently-played-video",
    parentKey: MenuKeyEnum.RECENTLY_PLAYED
  },
  {
    label: "歌单",
    path: "/recently-played-playlist",
    key:  "/recently-played-playlist",
    parentKey: MenuKeyEnum.RECENTLY_PLAYED
  },
  {
    label: "专辑",
    path: "/recently-played-album",
    key:  "/recently-played-album",
    parentKey: MenuKeyEnum.RECENTLY_PLAYED
  },
  {
    label: "独家放送",
    path: "/exclusive-broadcast",
    key:"/exclusive-broadcast",
    parentKey: MenuKeyEnum.EXCLUSIVE_BROADCAST
  }
]

export const MAP_TAGS_VIEWS = new Map<MenuKeyEnum, ITagItem[]>()
  .set(MenuKeyEnum.FIND_MUSIC, FIND_MUSIC_TAGS)
  .set(MenuKeyEnum.VIDEO, VIDEO)
  .set(MenuKeyEnum.COLLECT, COLLECT)

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
