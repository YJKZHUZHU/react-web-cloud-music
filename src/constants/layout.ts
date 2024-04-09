import { MenuProps } from "antd"

/** @format */
type MenuItem = Required<MenuProps>["items"][number]



export enum MenuKeyEnum {
  FIND_MUSIC = "findMusic",
  VIDEO = "video",
  MY_MUSIC = "myMusic",
  MY_SONG_LIST = "songList"
}
export const MAP_MENU_PATH = new Map<MenuKeyEnum, string>()
  .set(MenuKeyEnum.FIND_MUSIC, "/personal-recommendation")
  .set(MenuKeyEnum.VIDEO, "/video")
  .set(MenuKeyEnum.MY_MUSIC, "/collect")
  .set(MenuKeyEnum.MY_SONG_LIST, "/collect-song-list")

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
  {
    label: "主播电台",
    path: "/todo",
    key: "todo"
  },
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
  }
]

export const MAP_TAGS_VIEWS = new Map().set(MenuKeyEnum.FIND_MUSIC, FIND_MUSIC_TAGS).set(MenuKeyEnum.MY_MUSIC, MY_MUSIC)

export const menuList: MenuItem[] = [
  {
    label: "发现音乐",
    key: MenuKeyEnum.FIND_MUSIC
    // icon:
  },
  {
    label: "精彩视频",
    key: MenuKeyEnum.VIDEO
    // icon:
  },
  {
    label: "我的音乐",
    key: MenuKeyEnum.MY_MUSIC
    // icon:
  },
  {
    label: "我的歌单",
    key: MenuKeyEnum.MY_SONG_LIST
    // icon:
  }
]
