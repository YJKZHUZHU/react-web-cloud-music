/** @format */

import {SEARCH_TYPE_ENUM} from "@/store/search"

type ListType = "songs" | "albums" | "playlists" | "artists" | "mvs" | "userprofiles" | "videos"

type CountType =
  | "songCount"
  | "albumCount"
  | "playlistCount"
  | "artistCount"
  | "mvCount"
  | "userprofileCount"
  | "videoCount"

export const MapTabLabel = new Map()
  .set(SEARCH_TYPE_ENUM.single, "单曲")
  .set(SEARCH_TYPE_ENUM.album, "专辑")
  .set(SEARCH_TYPE_ENUM.video, "视频")
  .set(SEARCH_TYPE_ENUM.user, "用户")
  .set(SEARCH_TYPE_ENUM.playlist, "歌单")
  .set(SEARCH_TYPE_ENUM.singer, "歌手")

export const MapKey = new Map<SEARCH_TYPE_ENUM, [ListType, CountType, (total: number) => string]>()
  .set(SEARCH_TYPE_ENUM.single, ["songs", "songCount", (total: number) => `找到${total}首单曲`])
  .set(SEARCH_TYPE_ENUM.album, ["albums", "albumCount", (total: number) => `找到${total}张专辑`])
  .set(SEARCH_TYPE_ENUM.lyric, ["songs", "songCount", (total: number) => `找到${total}首歌词`])
  .set(SEARCH_TYPE_ENUM.playlist, [
    "playlists",
    "playlistCount",
    (total: number) => `找到${total}个歌单`
  ])
  .set(SEARCH_TYPE_ENUM.singer, ["artists", "artistCount", (total: number) => `找到${total}位歌手`])
  .set(SEARCH_TYPE_ENUM.mv, ["mvs", "mvCount", (total: number) => `找到${total}个MV`])
  .set(SEARCH_TYPE_ENUM.user, [
    "userprofiles",
    "userprofileCount",
    (total: number) => `找到${total}位用户`
  ])
  .set(SEARCH_TYPE_ENUM.video, ["videos", "videoCount", (total: number) => `找到${total}个视频`])
