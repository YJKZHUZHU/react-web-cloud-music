// 评论

type Associator = {
  // 表示会员代码的数字
  vipCode: number;
  // 表示是否拥有某些权限的布尔值
  rights: boolean;
  // 表示图标URL的字符串
  iconUrl: string;
};

type MusicPackage = {
  // 表示音乐包会员代码的数字
  vipCode: number;
  // 表示是否拥有某些权限的布尔值
  rights: boolean;
  // 表示图标URL的字符串
  iconUrl: string;
};

// 整个JSON对象的类型定义
type UserInformation = {
  // 关联账户信息
  associator: Associator;
  // 音乐包信息
  musicPackage: MusicPackage;
  // 可能表示某种服务或优惠的关联信息，类型为null或未指定
  redplus: null | undefined;
  // 表示红钻年数的整数，这里为-1可能表示未设置或有特殊含义
  redVipAnnualCount: number;
  // 表示红钻等级的整数
  redVipLevel: number;
  // 表示关系类型的整数
  relationType: number;
};


interface User {
  locationInfo: null | string; // 用户的位置信息，可能是null或字符串
  liveInfo: null | string; // 用户的直播信息，可能是null或字符串
  anonym: 0 | 1; // 用户是否匿名，0表示非匿名，1表示匿名
  avatarUrl: string; // 用户头像的URL
  socialUserId: null | string; // 社交用户ID，可能是null或字符串
  vipRights: UserInformation;
  nickname: string; // 用户昵称
  authStatus: number; // 认证状态
  expertTags: null | string[]; // 专家标签，可能是null或字符串数组
  experts: null | string[]; // 专家信息，可能是null或字符串数组
  vipType: number; // 用户的VIP类型
  followed: boolean; // 是否已关注
  mutual: boolean; // 是否互相关注
  remarkName: null | string; // 备注名称，可能是null或字符串
  avatarDetail: null | string; // 头像详细信息，可能是null或字符串
  userType: number; // 用户类型
  commonIdentity: null | string; // 通用身份信息，可能是null或字符串
  userId: number; // 用户ID
  target: null | string; // 目标信息，可能是null或字符串
};

interface IpLocation {
  ip: null | string; // IP地址，可能是null或字符串
  location: string; // 地理位置
  userId: number; // 用户ID
};

export interface IBeReplied {
  user: User,
  beRepliedCommentId: number,
  content: string,
  richContent: null | string,
  status: number,
  expressionUrl: null | string,
  ipLocation: IpLocation
}

export interface ICommentItem {
  user: User; // 用户信息
  beReplied: IBeReplied[]; // 被回复的评论列表
  pendantData: null | any; // 挂件数据，可能是null或任何类型
  showFloorComment: null | string; // 显示楼层评论，可能是null或字符串
  status: number; // 状态
  commentId: number; // 评论ID
  content: string; // 评论内容
  richContent: null | string; // 富文本内容，可能是null或字符串
  contentResource: null | any; // 内容资源，可能是null或任何类型
  time: number; // 时间戳
  timeStr: string; // 时间字符串
  needDisplayTime: boolean; // 是否需要显示时间
  likedCount: number; // 点赞数
  expressionUrl: null | string; // 表情URL，可能是null或字符串
  commentLocationType: number; // 评论位置类型
  parentCommentId: number; // 父评论ID
  decoration: Record<string, unknown>; // 装饰信息
  repliedMark: null | string; // 回复标记，可能是null或字符串
  grade: null | string; // 等级，可能是null或字符串
  userBizLevels: null | any[]; // 用户业务等级，可能是null或任何类型的数组
  ipLocation: IpLocation; // IP位置信息
  owner: boolean; // 是否是所有者
  medal: null | string; // 勋章信息，可能是null或字符串
  liked: boolean; // 是否被点赞
};

export const enum CommentTypeEnum {
  /** 音乐 */
  music,
  /** mv */
  mv,
  /** 歌单 */
  playList,
  /** 专辑 */
  album,
  /** 电台节目 */
  radioStationProgram,
  /** 视频 */
  video,
  /** 动态 */
  dynamic,
  /** 电台 */
  radioStation
}

export const enum CommentSortTypeEnum {
  recommend = 1,
  hot,
  time
}

