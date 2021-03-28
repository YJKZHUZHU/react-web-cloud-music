import {IRoute} from 'umi'

const routes:IRoute[] = [
  {
    path:'/',
    redirect:'/personal-recommendation'
  },
  {
    path: '/',
    component: '@/layouts',
    routes:[
      {
        path:'/personal-recommendation',
        component:'personal-recommendation',
        title:'个性化推荐'
      },
      {
        path: '/video',
        component: 'video',
        title: '视频'
      },
      {
        path: '/mv',
        component: 'mv',
        title: 'MV'
      },
      {
        path: '/top-mv',
        component: 'top-mv',
        title: 'MV排行榜'
      },
      {
        path: '/fm',
        component: 'fm',
        title: '私人FM'
      },
      {
        path: '/friend',
        component: 'friend',
        title: '朋友'
      },
      {
        path: '/my-music/cloud',
        component: 'cloud',
        title: '我的音乐云盘'
      },
      {
        path: '/my-music/collect',
        component: 'collect',
        title: '收藏的专辑',
        routes:[
          {
            path: '/my-music/collect/singer',
            component: 'collect/singer',
            title: '收藏的歌手',
          },
          {
            path: '/my-music/collect/video',
            component: 'collect/video',
            title: '收藏的视频',
          }
        ]
      },
      {
        path: '/find-music/song-list',
        component: 'song-list',
        title: '歌单',
      },
      {
        path: '/find-music/top',
        component: 'top',
        title: '排行榜',
      },
      {
        path: '/find-music/singer',
        component: 'singer',
        title: '歌手',
      },
      {
        path: '/find-music/latest-music',
        component: 'latest-music',
        title: '最新音乐',
      },
      {
        path: '/playList/:id',
        component: 'playList',
        title: '歌单详情',
      },
      {
        path: '/find-music/top',
        component: 'top'
      },
    ]
  }
]

export default routes

