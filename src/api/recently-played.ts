/** @format */

import {service} from "@/help/server"
import {SearchResponse, Song, Playlist, SUGGEST_TYOE_ENUM, SEARCH_TYPE_ENUM} from "@/store/search"

enum FetchEnum {
  song = "/record/recent/song"
}

interface SongDetail {
  resourceId: string // 资源ID
  playTime: number // 播放时间
  resourceType: "SONG" // 资源类型
  data: SongData // 歌曲数据
  banned: boolean // 是否被禁止
  multiTerminalInfo: MultiTerminalInfo // 多终端信息
}

interface SongData {
  name: string // 歌曲名称
  id: number // 歌曲ID
  pst: number // 未知字段
  t: number // 未知字段
  ar: Artist[] // 艺术家列表
  alia: string[] // 别名列表
  pop: number // 流行度
  st: number // 未知字段
  rt: string // 未知字段
  fee: number // 费用
  v: number // 未知字段
  crbt: any // 未知字段
  cf: string // 未知字段
  al: Album // 专辑信息
  dt: number // 未知字段
  h: Quality // 高品质音频信息
  m: Quality // 中品质音频信息
  l: Quality // 低品质音频信息
  a: any // 未知字段
  cd: string // 未知字段
  no: number // 序号
  rtUrl: any // 未知字段
  ftype: number // 文件类型
  rtUrls: any[] // 未知字段
  djId: number // DJ ID
  copyright: number // 版权信息
  s_id: number // 未知字段
  mark: number // 标记
  originCoverType: number // 原始封面类型
  originSongSimpleData: any // 原始简单歌曲数据
  single: number // 是否是单曲
  noCopyrightRcmd: any // 无版权推荐
  rtype: number // 未知字段
  rurl: any // 未知字段
  mst: number // 未知字段
  cp: number // 未知字段
  mv: number // MV ID
  publishTime: number // 发布时间
}

interface Artist {
  id: number // 艺术家ID
  name: string // 艺术家名称
  tns: string[] // 未知字段
  alias: string[] // 别名列表
}

interface Album {
  id: number // 专辑ID
  name: string // 专辑名称
  picUrl: string // 专辑封面URL
  tns: string[] // 未知字段
  pic_str: string // 专辑封面字符串
  pic: number // 专辑封面数字ID
}

interface Quality {
  br: number // 比特率
  fid: number // 文件ID
  size: number // 文件大小
  vd: number // 未知字段
}

interface MultiTerminalInfo {
  icon: string // 图标URL
  os: string // 操作系统
  osText: string // 操作系统文本描述
}

interface ISongRes {
  code: number // 响应状态码
  data: {
    total: number // 总数
    list: SongDetail[] // 歌曲列表
  }
  message: string // 消息内容
}

export const song = (data: {limit: number}) => {
  return service<ISongRes>(FetchEnum.song, data, false, {format: false}) as unknown as ISongRes
}
