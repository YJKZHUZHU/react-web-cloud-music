import request from './config'

import { ILoginByPhone, IBanner, IUser } from './type'

class API {
  // 轮播图
  static banner = (params: IBanner) => request.get('/banner', { params })
  static personalized = (params: object) => request.get('/personalized', { params })
  //推荐新音乐
  static newSong = (params: object) => request.get('/personalized/newsong', { params })
  //歌单详情部分
  static playList = (params: any) => request.get('/playlist/detail', { params })
  //歌单收藏者
  static playlistCollection = (params: object) => request.get('/playlist/subscribers', { params })
  //歌单评论
  static comment = (params: object) => request.get('/comment/playlist', { params })
  //获取歌单音乐
  static song = (params: object) => request.get('/song/detail', { params })
  //获取音乐url
  static playSong = (params: object) => request.get('/song/url', { params })
  //获取歌词
  static getLyric = (params: object) => request.get('/lyric', { params })
  //排行榜
  static getTopList = (params: object) => request.get('/top/list', { params })
  //所有榜单
  static getAllTopList = (params?: object) => request.get('/toplist', { params })
  //全部歌单
  static getAllCatList = (params: object) => request.get('/playlist/catlist', { params })
  //新歌速递
  static getLatestMusic = (params: object) => request.get('/top/song', { params })
  //新碟上架
  static getTopAlbum = (params: object) => request.get('/top/album', { params })
  //获取用户播放记录
  static getUserPlayList = (params: object) => request.get('/user/record', { params })
  //热搜详细
  static getHotList = (params?: object) => request.get('/search/hot/detail', { params })
  //搜索建议
  static getSearchSuggest = (params: object) => request.get('/search/suggest', { params })
  //搜索指定
  static getSearchByType = (params: object) => request.get('/search', { params })
  //获取用户详情
  static useInfo = (params: IUser) => request.get('/user/detail', { params })
  //登录状态
  static status = (params?: object) => request.post('/login/status', { params })
  //检测手机号是否注册过网易云音乐
  static check = (params: object) => request.post('/cellphone/existence/check', { params })
  //手机号登录
  static loginByPhone = (params: ILoginByPhone) => request.post('/login/cellphone', { params })
  //邮箱登录
  static loginByEmail = (params: object) => request.post('/login', { params })
  //退出登录
  static logout = (params?: object) => request.post('/logout', { params })
  //签到
  static dailySignIn = (params?: object) => request.get('/daily_signin', { params })
  //获取用户关注列表
  static follows = (params: any) => request.get('/user/follows', { params })
  //获取用户粉丝列表
  static followeds = (params: any) => request.get('/user/followeds', { params })
  //关注取消用户
  static follow = (params: any) => request.get('/follow', { params })
  //获取用户动态
  static event = (params: any) => request.get('/user/event', { params })
  //给评论点赞
  static commentLike = (params: any) => request.get('/comment/like', { params })
  //删除用户动态
  static del = (params: any) => request.get('/event/del', { params })
  //收藏的歌手列表
  static artistSublist = (params?: any) => request.get('/artist/sublist', { params })
  //收藏的专辑列表
  static albumSublist = (params?: any) => request.get('/album/sublist', { params })
  //收藏的mv列表
  static mvSublist = (params?: any) => request.get('/mv/sublist', { params })
  //获取用户订阅信息
  static subCount = (params?: any) => request.get('/user/subcount', { params })
  //获取用户歌单
  static userPlaylist = (params: any) => request.get('/user/playlist', { params })
  //新建歌单
  static playlistCreate = (params: any) => request.get('/playlist/create', { params })
  //删除歌单
  static playlistDelete = (params: any) => request.get('/playlist/delete', { params })
  //更新歌单
  static playlistUpdate = (params: any) => request.get('/playlist/update', { params })
  //获取播放列表
  static getPlayRecord = (params: any) => request.get('/user/record', { params })
  // 获取MV数据
  static getMvDetail = (params: any) => request.get('/mv/detail', { params })
  //mv 地址
  static getMvUrl = (params: any) => request.get('/mv/url', { params })
  // 相似MV
  static getSimi = (params: any) => request.get('/simi/mv', { params })
  // mv评论
  static getMvComment = (params: any) => request.get('/comment/mv', { params })
  // 收藏/取消MV
  static setMvSub = (params: any) => request.get('/mv/sub', { params })
  // 资源点赞
  static setResourceLike = (params: any) => request.get('/resource/like', { params })
  //分享歌曲、歌单、mv、电台、电台节目到动态
  static shareResource = (params: any) => request.get('/resource/like', { params })
  // 歌手分类列表
  static getArtistList = (params: any) => request.get('/artist/list', { params })
  // 歌单分类
  static getCatlist = (params?: any) => request.get('/playlist/catlist', { params })
  // 热门歌单分类
  static getCatlistHot = (params?: any) => request.get('/playlist/hot', { params })
  // 获取精品歌单
  static getHighQuality = (params?: any) => request.get('/top/playlist/highquality', { params })
}


export default API
