
import { service } from '@/help/server'


enum FetchEnum {
  /** 歌手分类 */
  artistList = '/artist/list',
}

export interface ArtistInfo {
  accountId: number; // 账号ID
  albumSize: number; // 专辑数量
  alias: string[]; // 别名列表
  briefDesc: string; // 简介描述
  fansCount: number; // 粉丝数量
  followed: boolean; // 是否已关注
  id: number; // 艺人ID
  img1v1Id: number; // 头像1v1图片ID
  img1v1Id_str: string; // 头像1v1图片ID的字符串形式
  img1v1Url: string; // 头像1v1图片URL
  musicSize: number; // 音乐作品数量
  name: string; // 艺人名称
  picId: number; // 专辑图片ID
  picId_str: string; // 专辑图片ID的字符串形式
  picUrl: string; // 专辑图片URL
  topicPerson: number; // 主题人物数量
  trans: string; // 翻译名称
  transNames: string[]; // 翻译名称列表
}

export interface IArtistListParams {
  limit: number
  /** 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
  offset: number
  /** 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0 */
  initial: number | string
  type: number
  area: number
}
interface IArtistListRes {
  code: number; // 响应码
  artists: ArtistInfo[];
  more: boolean;
}
export const artistList = (data: Partial<IArtistListParams>) => {
  return service<IArtistListRes>(FetchEnum.artistList, data)
}














