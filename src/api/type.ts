
export enum FetchUrl {
  /**
   *  轮播图
   */
  Banner = '/banner',
  /**
   * 推荐歌单
   */
  Personalized = '/personalized',
  /**
   * 推荐新音乐
   */
  newsong = '/personalized/newsong',
  /**
   * 歌单详情部分
   */
  PlaylistDetail = '/playlist/detail',
  /**
   * 歌单收藏者
   */
  PlaylistSubscribers = '/playlist/subscribers',
  /**
   * 歌单评论
   */
  CommentPlaylist = '/comment/playlist',
  /**
   * 获取歌单音乐
   */
  SongDetail = '/song/detail',
  /**
   * 获取音乐url
   */
  SongUrl = '/song/url',
  /**
   * 获取歌词
   */
  Lyric = '/lyric',
  /**
   * 排行榜
   */
  TopList = '/top/list',
  /**
   * 所有榜单
   */
  Toplist = '/toplist',
  /**
   * 全部歌单
   */
  PlaylistCatlist = '/playlist/catlist',
  /**
   * 新歌速递
   */
  TopSong = '/top/song',
  /**
   * 新碟上架
   */
  TopAlbum = '/top/album',
  /**
   * 获取用户播放记录
   */
  UserRecord = '/user/record',
  /**
   * 热搜详细
   */
  SearchHotDetail = '/search/hot/detail',
  /**
   * 搜索建议
   */
  SearchSuggest = '/search/suggest',
  /**
   * 搜索指定
   */
  Search = '/search',
  /**
   * 获取用户详情
   */
  UserDetail = '/user/detail',
  /**
   * 登录状态
   */
  LoginStatus = '/login/status',
  /**
   * 检测手机号是否注册过网易云音乐
   */
  CheckCellPhone = '/cellphone/existence/check',
  /**
   * 手机号登录
   */
  LoginCellphone = '/login/cellphone',
  /**
   * 邮箱登录
   */
  Login = '/login',
  /**
   * 退出登录
   */
  Logout = '/logout',
  /**
   * 签到
   */
  DailySignin = '/daily_signin',
  /**
   * 获取用户关注列表
   */
  UserFollows = '/user/follows',
  /**
   * 获取用户粉丝列表
   */
  UserFolloweds = '/user/followeds',
  /**
   * 关注取消用户
   */
  Follow = '/follow',
  /**
   * 获取用户动态
   */
  UserEvent = '/user/event',
  /**
   * 给评论点赞
   */
  CommentLike = '/comment/like',
  /**
   * 删除用户动态
   */
  EventDel = '/event/del',
  /**
   * 收藏的歌手列表
   */
  ArtistSublist = '/artist/sublist',
  /**
   * 收藏的专辑列表
   */
  AlbumSublist = '/album/sublist',
  /**
   * 收藏的mv列表
   */
  MvSublist = '/mv/sublist',
  /**
   * 获取用户订阅信息
   */
  UserSubcount = '/user/subcount',
  /**
   * 获取用户歌单
   */
  UserPlaylist = '/user/playlist',
  /**
   * 新建歌单
   */
  PlaylistCreate = '/playlist/create',
  /**
   * 删除歌单
   */
  PlaylistDelete = '/playlist/delete',
  /**
   * 更新歌单
   */
  PlaylistUpdate = '/playlist/update',
  /**
   * 获取播放列表
   */
  UserList = '/user/record',
  /**
   * 获取MV数据
   */
  MvDetail = '/mv/detail',
  /**
   * mv地址
   */
  MvUrl = '/mv/url',
  /**
   * 相似MV
   */
  SimiMv = '/simi/mv',
  /**
   * mv评论
   */
  CommentMv = '/comment/mv',
  /**
   * 收藏/取消MV
   */
  MvSub = '/mv/sub',
  /**
   * 资源点赞
   */
  ResourceLike = '/resource/like',
  /**
   * 分享歌曲、歌单、mv、电台、电台节目到动态
   */
  ShareResource = '/share/resource',
  /**
   * 歌手分类列表
   */
  ArtistList = '/artist/list',
  /**
   * 歌单分类
   */
  PlayListCatlist = '/playlist/catlist',
  /**
   * 热门歌单分类
   */
  PlaylistHot = '/playlist/hot',
  /**
   * 获取精品歌单
   */
  TopPlayListHighquality = '/top/playlist/highquality',
  /**
   * 获取网友精选歌单
   */
  TopPlaylist = '/top/playlist',
  /**
   * 歌手描述
   */
  ArtistDesc = '/artist/desc',
  /**
   * 相似歌手
   */
  SimiArtist = '/simi/artist',
  /**
   * 歌手MV
   */
  ArtistMv = '/artist/mv',
  /**
   * 歌手专辑
   */
  ArtistAlbum = '/artist/album',
  /**
   * 热门50首
   */
  ArtistToSong = '/artist/top/song',
  /**
   * 专辑内容
   */
  AlbumContent = '/album',
  /**
   * 收藏/取消收藏歌手
   */
  ArtistSub = '/artist/sub',
  /**
   * 是否喜欢该音乐
   */
  Like = '/like',
  /**
   * 专辑评论
   */
  CommentAlbum = '/comment/album',
  /**
   * 专辑动态消息
   */
  AlbumDetailDynamic = '/album/detail/dynamic',
  /**
   * 收藏取消收藏专辑
   */
  AlbumSub = '/album/sub',
  /**
   * 获取 mv 点赞转发评论数数据
   */
  MvDetailInfo = '/mv/detail/info',
  /**
   * 推荐MV
   */
  RecommendMv = '/personalized/mv',
  /**
   * 独家放送（入口列表）
   */
  ExclusiveBroadcast = '/personalized/privatecontent',
  /**
   * 所有榜单内容摘要
   */
  AllTopList = '/toplist/detail',
  /**
   * 歌手榜
   */
  SingerTopList = '/toplist/artist',
  /**
   * 独家放送列表
   */
  ExclusiveBroadcastList = '/personalized/privatecontent/list',
  /**
   * 视频评论
   */
  VedioComment = '/comment/video',
  /**
   * 视频详情
   */
  VedioDetail = '/video/detail',
  /**
   * 相关视频
   */
  RelatedVedio = '/related/allvideo',
  /**
   * 获取视频点赞转发评论数数据
   *
   */
  VedioDetailInfo = '/video/detail/info',
  /**
   * 获取视频播放地址
   */
  VedioUrl = '/video/url',
  /**
   * 发送验证码
   */
  SentCaptcha = '/captcha/sent',
  /**
   * 验证验证码
   */
  CheckCaptcha = '/captcha/verify',
  /**
   * 歌曲评论
   */
  MusicComment = '/comment/music',
  /**
   * 相似音乐
   */
  SimiSong = '/simi/song',
  /**
   * 相似歌单
   */
  SimiSongList = '/simi/playlist',
  /**
   * 获取视频标签列表
   */
  VedioGroupList = '/video/group/list',
  /**
   * 获取视频分类列表
   */
  VedioCategoryList = '/video/category/list',
  /**
   * 获取全部视频列表
   */
  ALLVedioList = '/video/timeline/all',
  /**
   * 获取视频标签/分类下的视频
   */
  VedioGroup ='/video/group',
  /**
   * 全部MV
   */
  AllMv = '/mv/all'
}

enum Banner {
  pc,
  android,
  iphone,
  ipad
}

export interface IShareResource {
  id: string | number
  type: 'song' | 'playlist' | 'mv' | 'djradio' | 'djprogram'
  msg: string
}
export interface ILoginByPhone {
  phone: string
  password: string
  countrycode?: number
  loading?: boolean
}


export interface IBanner {
  type: Banner.pc | Banner.android | Banner.ipad | Banner.iphone
  loading?:boolean
}

export interface IUser {
  uid:string
}