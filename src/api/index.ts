import Axios from 'axios'
import {appState} from '@/models/gloable'
import qs from 'qs'


const axios = Axios.create({
  withCredentials: true,
  timeout: 60 * 1000,
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token',
  headers: {}
})
const queryMethods = ['get', 'delete', 'head']
const isQueryLike = (method: any) => queryMethods.includes(method.toLowerCase())
const filterParamConfig = {
  blackListKey: ['loading'],
  blackListVal: [null, undefined],
  isNotEmpty: false
}

const filterParam = (params: any) => {
  const ret = Object.create(null)
  for (const key in params) if (params.hasOwnProperty(key)) {
    const val = params[key]
    if (filterParamConfig.blackListKey.includes(key)) {
      continue
    }
    if (filterParamConfig.blackListVal.some(item => item === val)) {
      continue
    }
    if (filterParamConfig.isNotEmpty && val === '') {
      continue
    }
    ret[key] = val
  }
  return ret
}
//拦截请求
axios.interceptors.request.use(config => {
  let {url, method} = config
  const isQueryLikeTYpe = isQueryLike(method)
  // @ts-ignore
  const urlParamStr = url.slice(url.indexOf('?') === -1 ? url.length : url.indexOf('?') + 1)
  const urlParamObj = urlParamStr.trim() !== '' ? qs.parse(urlParamStr) : null
  let params = {
    ...urlParamObj,
    ...(typeof config.data === 'string' ? qs.parse(config.data) : config.data),
    ...config.params
  }
  if (urlParamStr !== '') {
    // @ts-ignore
    url = url.slice(0, url.indexOf('?') + 1)
  }

  config.data = null
  config.params = null
  if (params.loading === true) {
    appState.setLoading(true)
  }
  params = filterParam(params)

  if (!isQueryLikeTYpe && typeof params === 'object') {
    params = qs.stringify(params)
  }
  return {
    ...config,
    url,
    [isQueryLikeTYpe ? 'params' : 'data']: params
  }
}, error => Promise.reject(error))


//拦截响应
axios.interceptors.response.use(res => {
  appState.setLoading(false)
  if (res.data.code === 302) {
    return new Promise(() => {
    })
  }
  return res.data
}, error =>{
  const code = [301,400,404,405,302]
  //此时表示未登录
  if(code.includes(+error.response.status)){
    return error.response.data
  }
  return Promise.reject(error)
})

// @ts-ignore
axios.get = function(url, params = {}, config = {}) {
  return axios({
    url,
    method: 'get',
    params,
    ...config
  })
}
// @ts-ignore
axios.post = function(url, data = {}, config = {}) {
  return axios({
    url,
    method: 'post',
    data,
    ...config
  })
}



class API {
  static login = (params: object) => axios.get('/api/login/cellphone', params)
  static banner = (params: object) => axios.get('/api/banner', params) //0代表pc
  static personalized = (params: object) => axios.get('/api/personalized', params)
  //推荐新音乐
  static newSong = (params: object) => axios.get('/api/personalized/newsong', params)
  //歌单详情部分
  static playList = (params: any) => axios.get('/api/playlist/detail', params)
  //歌单收藏者
  static playlistCollection = (params: object) => axios.get('/api/playlist/subscribers', params)
  //歌单评论
  static comment = (params: object) => axios.get('/api/comment/playlist', params)
  //获取歌单音乐
  static song = (params: object) => axios.get('/api/song/detail', params)
  //获取音乐url
  static playSong = (params: object) => axios.get('/api/song/url', params)
  //获取歌词
  static getLyric = (params: object) => axios.get('/api/lyric', params)
  //排行榜
  static getTopList = (params: object) => axios.get('/api/top/list', params)
  //所有榜单
  static getAllTopList = (params: object) => axios.get('/api/toplist', params)
  //全部歌单
  static getAllCatList = (params: object) => axios.get('/api/playlist/catlist', params)
  //新歌速递
  static getLatestMusic = (params: object) => axios.get('/api/top/song', params)
  //新碟上架
  static getTopAlbum = (params: object) => axios.get('/api/top/album', params)
  //获取用户播放记录
  static getUserPlayList = (params: object) => axios.get('/api/user/record', params)
  //热搜详细
  static getHotList = (params?: object) => axios.get('/api/search/hot/detail', params)
  //搜索建议
  static getSearchSuggest = (params: object) => axios.get('/api/search/suggest', params)
  //搜索指定
  static getSearchByType = (params: object) => axios.get('/api/search', params)
  //获取用户详情
  static useInfo = (params: object) => axios.get('/api/user/detail',params)
  //登录状态
  static status = (params?: object) => axios.post('/api/login/status',params)

  //检测手机号是否注册过网易云音乐
  static check = (params: object) => axios.post('/api/cellphone/existence/check', params)
  //手机号登录
  static loginByPhone = (params: object) => axios.post('/api/login/cellphone', params)
  //邮箱登录
  static loginByEmail = (params: object) => axios.post('/api/login', params)
  //退出登录
  static logout = (params?: object) => axios.post('/api/logout', params)
  //签到
  static dailySignIn = (params?: object) => axios.get('/api/daily_signin', params)
  //获取用户关注列表
  static follows = (params:any) => axios.get('/api/user/follows', params)
  //获取用户粉丝列表
  static followeds = (params:any) => axios.get('/api/user/followeds', params)
  //关注取消用户
  static follow = (params:any) => axios.get('/api/follow', params)
  //获取用户动态
  static event = (params:any) => axios.get('/api/user/event', params)
  //给评论点赞
  static commentLike = (params:any) => axios.get('/api/comment/like', params)
  //删除用户动态
  static del = (params:any) => axios.get('/api/event/del', params)
  //收藏的歌手列表
  static artistSublist = (params?:any) => axios.get('/api/artist/sublist', params)
  //收藏的专辑列表
  static albumSublist = (params?:any) => axios.get('/api/album/sublist', params)
  //收藏的mv列表
  static mvSublist = (params?:any) => axios.get('/api/mv/sublist', params)
  //获取用户订阅信息
  static subCount = (params?:any) => axios.get('/api/user/subcount', params)
  //获取用户歌单
  static userPlaylist = (params:any) => axios.get('/api/user/playlist', params)
  //新建歌单
  static playlistCreate = (params:any) => axios.get('/api/playlist/create', params)
  //删除歌单
  static playlistDelete = (params:any) => axios.get('/api/playlist/delete', params)
  //更新歌单
  static playlistUpdate= (params:any) => axios.get('/api/playlist/update', params)

}

export default API
