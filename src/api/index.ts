import { request } from '@umijs/max'
import { ILoginByPhone, IBanner, IUser, FetchUrl } from './type'

const POST: any = {
  method: 'POST',
  requestType: 'form'
}

export class API {
  //轮播图
  static banner = (data: IBanner) => request(FetchUrl.Banner, { data, method: 'POST' })
  //推荐歌单
  static personalized = (data: object) => request(FetchUrl.Personalized, { data, method: 'POST' })
  //推荐新音乐
  static newSong = (data: object) => request(FetchUrl.newsong, { data, method: 'POST' })
  //歌单详情部分
  static playList = (data: any) => request(FetchUrl.PlaylistDetail, { data, method: 'POST' })
  //歌单收藏者
  static playlistCollection = (data: object) => request(FetchUrl.PlaylistSubscribers, { data, method: 'POST' })
  //歌单评论
  static comment = (data: object) => request(FetchUrl.CommentPlaylist, { data, method: 'POST' })
  //获取歌单音乐
  static song = (data: object) => request(FetchUrl.SongDetail, { data, method: 'POST' })
  //获取音乐url
  static playSong = (data: object) => request(FetchUrl.SongUrl, { data, method: 'POST' })
  //获取歌词
  static getLyric = (data: object) => request(FetchUrl.Lyric, { data, method: 'POST' })
  //排行榜
  static getTopList = (data: object) => request(FetchUrl.TopList, { data, method: 'POST' })
  //所有榜单
  static getAllTopList = (data?: object) => request(FetchUrl.Toplist, { data, method: 'POST' })
  //全部歌单
  static getAllCatList = (data: object) => request(FetchUrl.PlaylistCatlist, { data, method: 'POST' })
  //新歌速递
  static getLatestMusic = (data: object) => request(FetchUrl.TopSong, { data, method: 'POST' })
  //新碟上架
  static getTopAlbum = (data: object) => request(FetchUrl.TopAlbum, { data, method: 'POST' })
  //获取用户播放记录
  static getUserPlayList = (data: object) => request(FetchUrl.UserRecord, { data, method: 'POST' })
  //热搜详细
  static getHotList = (data?: object) => request(FetchUrl.SearchHotDetail, { data, method: 'POST' })
  //搜索建议
  static getSearchSuggest = (data: object) => request(FetchUrl.SearchSuggest, { data, method: 'POST' })
  //搜索指定
  static getSearchByType = (data: object) => request(FetchUrl.Search, { data, method: 'POST' })
  //获取用户详情
  static useInfo = (data: IUser) => request(FetchUrl.UserDetail, { data, method: 'POST' })
  //登录状态
  static status = (data?: object) => request(FetchUrl.LoginStatus, { data, ...POST })
  //检测手机号是否注册过网易云音乐
  static check = (data: object) => request(FetchUrl.CheckCellPhone, { data, ...POST })
  //手机号登录
  static loginByPhone = (data: ILoginByPhone) => request(FetchUrl.LoginCellphone, { data, ...POST })
  //邮箱登录
  static loginByEmail = (data: object) => request(FetchUrl.Login, { data, ...POST })
  //退出登录
  static logout = (data?: object) => request(FetchUrl.Logout, { data, ...POST })
  //签到
  static dailySignIn = (data?: object) => request(FetchUrl.DailySignin, { data, method: 'POST' })
  //获取用户关注列表
  static follows = (data: any) => request(FetchUrl.UserFollows, { data, method: 'POST' })
  //获取用户粉丝列表
  static followeds = (data: any) => request(FetchUrl.UserFolloweds, { data, method: 'POST' })
  //关注取消用户
  static follow = (data: any) => request(FetchUrl.Follow, { data, method: 'POST' })
  //获取用户动态
  static event = (data: any) => request(FetchUrl.UserEvent, { data, method: 'POST' })
  //给评论点赞
  static commentLike = (data: any) => request(FetchUrl.CommentLike, { data, method: 'POST' })
  //删除用户动态
  static del = (data: any) => request(FetchUrl.EventDel, { data, method: 'POST' })
  //收藏的歌手列表
  static artistSublist = (data?: any) => request(FetchUrl.ArtistSublist, { data, method: 'POST' })
  //收藏的专辑列表
  static albumSublist = (data?: any) => request(FetchUrl.AlbumSublist, { data, method: 'POST' })
  //收藏的mv列表
  static mvSublist = (data?: any) => request(FetchUrl.MvSublist, { data, method: 'POST' })
  //获取用户订阅信息
  static subCount = (data?: any) => request(FetchUrl.UserSubcount, { data, method: 'POST' })
  //获取用户歌单
  static userPlaylist = (data: any) => request(FetchUrl.UserPlaylist, { data, method: 'POST' })
  //新建歌单
  static playlistCreate = (data: any) => request(FetchUrl.PlaylistCreate, { data, method: 'POST' })
  //删除歌单
  static playlistDelete = (data: any) => request(FetchUrl.PlaylistDelete, { data, method: 'POST' })
  //更新歌单
  static playlistUpdate = (data: any) => request(FetchUrl.PlaylistUpdate, { data, method: 'POST' })
  //获取播放列表
  static getPlayRecord = (data: any) => request(FetchUrl.UserList, { data, method: 'POST' })
  // 获取MV数据
  static getMvDetail = (data: any) => request(FetchUrl.MvDetail, { data, method: 'POST' })
  // mv地址
  static getMvUrl = (data: any) => request(FetchUrl.MvUrl, { data, method: 'POST' })
  // 相似MV
  static getSimi = (data: any) => request(FetchUrl.SimiMv, { data, method: 'POST' })
  // mv评论
  static getMvComment = (data: any) => request(FetchUrl.CommentMv, { data, method: 'POST' })
  // 收藏/取消MV
  static setMvSub = (data: any) => request(FetchUrl.MvSub, { data, method: 'POST' })
  // 资源点赞
  static setResourceLike = (data: any) => request(FetchUrl.ResourceLike, { data, method: 'POST' })
  // 分享歌曲、歌单、mv、电台、电台节目到动态
  static shareResource = (data: any) => request(FetchUrl.ShareResource, { data, method: 'POST' })
  // 歌手分类列表
  static getArtistList = (data: any) => request(FetchUrl.ArtistList, { data, method: 'POST' })
  // 歌单分类
  static getCatlist = (data?: any) => request(FetchUrl.PlayListCatlist, { data, method: 'POST' })
  // 热门歌单分类
  static getCatlistHot = (data?: any) => request(FetchUrl.PlaylistHot, { data, method: 'POST' })
  // 获取精品歌单
  static getHighQuality = (data?: any) => request(FetchUrl.TopPlayListHighquality, { data, method: 'POST' })
  // 获取网友精选歌单
  static topPlaylist = (data?: any) => request(FetchUrl.TopPlaylist, { data, method: 'POST' })
  // 歌手描述
  static getArtistDesc = (data: any) => request(FetchUrl.ArtistDesc, { data, method: 'POST' })
  // 相似歌手
  static getSimilarSinger = (data: any) => request(FetchUrl.SimiArtist, { data, method: 'POST' })
  // 歌手MV
  static getSingerMv = (data: any) => request(FetchUrl.ArtistMv, { data, method: 'POST' })
  // 歌手专辑
  static getSingerAlbum = (data: any) => request(FetchUrl.ArtistAlbum, { data, method: 'POST' })
  // 歌手热门50首
  static getSingerTop = (data: any) => request(FetchUrl.ArtistToSong, { data, method: 'POST' })
  // 获取专辑内容
  static getAlbumContent = (data: any) => request(FetchUrl.AlbumContent, { data, method: 'POST' })
  // 收藏/取消收藏歌手
  static setArtistsSub = (data: any) => request(FetchUrl.ArtistSub, { data, method: 'POST' })
  // 是否喜欢该音乐
  static Like = (data: any) => request(FetchUrl.Like, { data, method: 'POST' })
  // 专辑评论
  static getCommentAlbum = (data: any) => request(FetchUrl.CommentAlbum, { data, method: 'POST' })
  // 专辑动态消息
  static getAlbumDetailDynamic = (data: any) => request(FetchUrl.AlbumDetailDynamic, { data, method: 'POST' })
  // 专辑收藏取消收藏
  static setAlbumSub = (data: any) => request(FetchUrl.AlbumSub, { data, method: 'POST' })
  // 获取 mv 点赞转发评论数数据
  static getMvDetailInfo = (data: any) => request(FetchUrl.MvDetailInfo, { data, method: 'POST' })
  // 推荐MV
  static getRecommentMv = () => request(FetchUrl.RecommendMv, { method: 'POST' })
  //  独家放送（入口列表）
  static getExclusiveBroadcast = () => request(FetchUrl.ExclusiveBroadcast, { method: 'POST' })
  // 歌手榜单
  static getSingerTopList = (data?: any) => request(FetchUrl.SingerTopList, { data, method: 'POST' })
  // 独家放送列表
  static getExclusiveBroadcastList = (data: any) => request(FetchUrl.ExclusiveBroadcastList, { data, method: 'POST' })
  // 视频评论
  static getVedioComment = (data: any) => request(FetchUrl.VedioComment, { data, method: 'POST' })
  // 视频详情
  static getVedioDetail = (data: any) => request(FetchUrl.VedioDetail, { data, method: 'POST' })
  // 相关视频
  static getRelateVedio = (data: any) => request(FetchUrl.RelatedVedio, { data, method: 'POST' })
  // 获取视频点赞转发评论数数据
  static getVedioDetailInfo = (data: any) => request(FetchUrl.VedioDetailInfo, { data, method: 'POST' })
  // 获取视频播放地址
  static getVedioUrl = (data: any) => request(FetchUrl.VedioUrl, { data, method: 'POST' })
  // 发送验证码
  static sentCaptcha = (data: any) => request(FetchUrl.SentCaptcha, { data, method: 'POST' })
  // 验证验证码
  static checkCaptcha = (data: any) => request(FetchUrl.CheckCaptcha, { data, method: 'POST' })
  // 歌曲评论
  static getMusicComment = (data: any) => request(FetchUrl.MusicComment, { data, method: 'POST' })
  // 相似歌曲
  static getSimiSong = (data: any) => request(FetchUrl.SimiSong, { data, method: 'POST' })
  // 相似歌单
  static getSimiSongList = (data: any) => request(FetchUrl.SimiSongList, { data, method: 'POST' })
  // 获取视频标签列表
  static getVedioGroupList = () => request(FetchUrl.VedioGroupList, { method: 'POST' })
  // 获取视频分类列表
  static getVedioCategoryList = () => request(FetchUrl.VedioCategoryList, { method: 'POST' })
  // 获取全部视频列表
  static getAllVedioList = (data: any) => request(FetchUrl.ALLVedioList, { data, method: 'POST' })
  // 获取视频标签/分类下的视频
  static getVedioGroup = (data: any) => request(FetchUrl.VedioGroup, { data, method: 'POST' })
  // 全部mv
  static getAllMv = (data: any) => request(FetchUrl.AllMv, { data, method: 'POST' })
  // mv 排行榜
  static getTopMv = (data: any) => request(FetchUrl.TopMv, { data, method: 'POST' })
  // 获取动态
  static getEvent = (data: { pageSize: number, lasttime: number }) => request(FetchUrl.Event, { data, method: 'POST' })
  // 热门话题
  static getHotTopic = (data: { limit?: number, offset?: number }) => request(FetchUrl.HotTopic, { data, method: 'POST' })
  // 热门评论
  static getHotComment = (data: any) => request(FetchUrl.hotComment, { data, method: 'POST' })
  // 新版评论接口
  static getNewComment = (data: any) => request(FetchUrl.newComment, { data, method: 'POST' })
  // 二维码key生成接口
  static getQrKey = () => request(FetchUrl.QrKey, { method: "POST" })
  // 二维码生成接口
  static CreateQr = (data: any) => request(FetchUrl.QrCreate, { data, method: 'POST' })
  // 二维码检测扫码状态接口
  static CheckQr = (data: any) => request(FetchUrl.QrCheck, { data, method: 'POST' })
}


export default API
