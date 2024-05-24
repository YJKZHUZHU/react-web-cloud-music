/** @format */

export const enum TabEnum {
  album = "album",
  singer = "singer",
  video = "video"
}
export const MapTab = new Map<TabEnum, {label: string; key: TabEnum}>()
  .set(TabEnum.album, {
    label: "专辑",
    key: TabEnum.album
  })
  .set(TabEnum.singer, {
    label: "歌手",
    key: TabEnum.singer
  })
  .set(TabEnum.video, {
    label: "视频",
    key: TabEnum.video
  })
