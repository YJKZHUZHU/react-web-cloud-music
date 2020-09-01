import { request } from 'umi'
import { ILoginByPhone, IBanner, IUser } from './type'

const POST: any = {
  method: "POST",
  requestType: 'form'
}
enum FetchUrl {
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
  Like = '/like'
}

export class API {
  //轮播图
  static banner = (params: IBanner) => request(FetchUrl.Banner, { params })
  //推荐歌单
  static personalized = (params: object) => request(FetchUrl.Personalized, { params })
  //推荐新音乐
  static newSong = (params: object) => request(FetchUrl.newsong, { params })
  //歌单详情部分
  static playList = (params: any) => request(FetchUrl.PlaylistDetail, { params })
  //歌单收藏者
  static playlistCollection = (params: object) => request(FetchUrl.PlaylistSubscribers, { params })
  //歌单评论
  static comment = (params: object) => request(FetchUrl.CommentPlaylist, { params })
  //获取歌单音乐
  static song = (params: object) => request(FetchUrl.SongDetail, { params })
  //获取音乐url
  static playSong = (params: object) => request(FetchUrl.SongUrl, { params })
  //获取歌词
  static getLyric = (params: object) => request(FetchUrl.Lyric, { params })
  //排行榜
  static getTopList = (params: object) => request(FetchUrl.TopList, { params })
  //所有榜单
  static getAllTopList = (params?: object) => request(FetchUrl.Toplist, { params })
  //全部歌单
  static getAllCatList = (params: object) => request(FetchUrl.PlaylistCatlist, { params })
  //新歌速递
  static getLatestMusic = (params: object) => request(FetchUrl.TopSong, { params })
  //新碟上架
  static getTopAlbum = (params: object) => request(FetchUrl.TopAlbum, { params })
  //获取用户播放记录
  static getUserPlayList = (params: object) => request(FetchUrl.UserRecord, { params })
  //热搜详细
  static getHotList = (params?: object) => request(FetchUrl.SearchHotDetail, { params })
  //搜索建议
  static getSearchSuggest = (params: object) => request(FetchUrl.SearchSuggest, { params })
  //搜索指定
  static getSearchByType = (params: object) => request(FetchUrl.Search, { params })
  //获取用户详情
  static useInfo = (params: IUser) => request(FetchUrl.UserDetail, { params })
  //登录状态
  static status = (params?: object) => request(FetchUrl.LoginStatus, { params, ...POST })
  //检测手机号是否注册过网易云音乐
  static check = (params: object) => request(FetchUrl.CheckCellPhone, { params, ...POST })
  //手机号登录
  static loginByPhone = (params: ILoginByPhone) => request(FetchUrl.LoginCellphone, { params, ...POST })
  //邮箱登录
  static loginByEmail = (params: object) => request(FetchUrl.Login, { params, ...POST })
  //退出登录
  static logout = (params?: object) => request(FetchUrl.Logout, { params, ...POST })
  //签到
  static dailySignIn = (params?: object) => request(FetchUrl.DailySignin, { params })
  //获取用户关注列表
  static follows = (params: any) => request(FetchUrl.UserFollows, { params })
  //获取用户粉丝列表
  static followeds = (params: any) => request(FetchUrl.UserFolloweds, { params })
  //关注取消用户
  static follow = (params: any) => request(FetchUrl.Follow, { params })
  //获取用户动态
  static event = (params: any) => request(FetchUrl.UserEvent, { params })
  //给评论点赞
  static commentLike = (params: any) => request(FetchUrl.CommentLike, { params })
  //删除用户动态
  static del = (params: any) => request(FetchUrl.EventDel, { params })
  //收藏的歌手列表
  static artistSublist = (params?: any) => request(FetchUrl.ArtistSublist, { params })
  //收藏的专辑列表
  static albumSublist = (params?: any) => request(FetchUrl.AlbumSublist, { params })
  //收藏的mv列表
  static mvSublist = (params?: any) => request(FetchUrl.MvSublist, { params })
  //获取用户订阅信息
  static subCount = (params?: any) => request(FetchUrl.UserSubcount, { params })
  //获取用户歌单
  static userPlaylist = (params: any) => request(FetchUrl.UserPlaylist, { params })
  //新建歌单
  static playlistCreate = (params: any) => request(FetchUrl.PlaylistCreate, { params })
  //删除歌单
  static playlistDelete = (params: any) => request(FetchUrl.PlaylistDelete, { params })
  //更新歌单
  static playlistUpdate = (params: any) => request(FetchUrl.PlaylistUpdate, { params })
  //获取播放列表
  static getPlayRecord = (params: any) => request(FetchUrl.UserList, { params })
  // 获取MV数据
  static getMvDetail = (params: any) => request(FetchUrl.MvDetail, { params })
  // mv地址
  static getMvUrl = (params: any) => request(FetchUrl.MvUrl, { params })
  // 相似MV
  static getSimi = (params: any) => request(FetchUrl.SimiMv, { params })
  // mv评论
  static getMvComment = (params: any) => request(FetchUrl.CommentMv, { params })
  // 收藏/取消MV
  static setMvSub = (params: any) => request(FetchUrl.MvSub, { params })
  // 资源点赞
  static setResourceLike = (params: any) => request(FetchUrl.ResourceLike, { params })
  // 分享歌曲、歌单、mv、电台、电台节目到动态
  static shareResource = (params: any) => request(FetchUrl.ShareResource, { params })
  // 歌手分类列表
  static getArtistList = (params: any) => request(FetchUrl.ArtistList, { params })
  // 歌单分类
  static getCatlist = (params?: any) => request(FetchUrl.PlayListCatlist, { params })
  // 热门歌单分类
  static getCatlistHot = (params?: any) => request(FetchUrl.PlaylistHot, { params })
  // 获取精品歌单
  static getHighQuality = (params?: any) => request(FetchUrl.TopPlayListHighquality, { params })
  // 获取网友精选歌单
  static topPlaylist = (params?: any) => request(FetchUrl.TopPlaylist, { params })
  // 歌手描述
  static getArtistDesc = (params: any) => request(FetchUrl.ArtistDesc, { params })
  // 相似歌手
  static getSimilarSinger = (params: any) => request(FetchUrl.SimiArtist, { params })
  // 歌手MV
  static getSingerMv = (params: any) => request(FetchUrl.ArtistMv, { params })
  // 歌手专辑
  static getSingerAlbum = (params: any) => request(FetchUrl.ArtistAlbum, { params })
  // 歌手热门50首
  static getSingerTop = (params: any) => request(FetchUrl.ArtistToSong, { params })
  // 获取专辑内容
  static getAlbumContent = (params: any) => request(FetchUrl.AlbumContent, { params })
  // 收藏/取消收藏歌手
  static setArtistsSub = (params: any) => request(FetchUrl.ArtistSub, { params })
  // 是否喜欢该音乐
  static Like = (params: any) => request(FetchUrl.Like, { params })
}


export default API
