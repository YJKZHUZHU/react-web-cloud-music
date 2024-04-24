import { service } from '@/help/server'
import { ILyrics, IPrivilegeItem, ISongUrl, ISongsItem, MusicLevelEnum } from '@/store/player'


enum FetchEnum {
  songUrl = '/song/url',
  songUrlV1 = '/song/url/v1',
  checkMusic = '/check/music',
  songDetail = '/song/detail',
  lyric = '/lyric'
}


export const getSongUrl = (data: { id: number, level: MusicLevelEnum }) => {
  return service<ISongUrl[]>(FetchEnum.songUrlV1, data)
}

export const checkMusic = (data: { id: number, }) => {
  return service<any>(FetchEnum.checkMusic, data)
}

interface ISongDetailRes {
  songs: ISongsItem[]; // 歌曲列表
  privileges: IPrivilegeItem[]; // 权限列表
  code: number; // 响应状态码，200表示成功
}
export const getSongDetail = (data: { ids: number, }) => {
  return service<ISongDetailRes>(FetchEnum.songDetail, data)
}
export const getLyric = (data: { id: number, }) => {
  return service<ILyrics>(FetchEnum.lyric, data)
}
