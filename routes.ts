
interface IRoue {
  component?: (string | undefined);
  layout?: (false | undefined);
  path?: (string | undefined);
  redirect?: (string | undefined);
  routes?: IRoue[];
  title?: string
  wrappers?: (Array<string> | undefined);
}

const routes: IRoue[] = [
  {
    path: '/',
    redirect: '/personal-recommendation',
  },
  {
    path: '/',
    component: '@/layouts',
    layout: false,// 关闭 layout
    routes: [
      {
        path: '/personal-recommendation',
        component: '@/pages/personal-recommendation',
        title: '个性化推荐',
      },
      {
        path: '/video',
        component: '@/pages/video',
        title: '视频',
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/mv',
        component: 'mv',
        title: 'MV',
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/top-mv',
        component: 'top-mv',
        title: 'MV排行榜'
      },
      {
        path: '/fm',
        component: 'fm',
        title: '私人FM',
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/friend',
        component: 'friend',
        title: '朋友',
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/my-music/cloud',
        component: 'cloud',
        title: '我的音乐云盘',
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/my-music/collect',
        component: 'collect',
        title: '收藏的专辑',
        wrappers: [
          '@/wrappers/Auth',
        ],
        routes: [
          {
            path: '/my-music/collect/singer',
            component: 'collect/singer',
            title: '收藏的歌手',
            wrappers: [
              '@/wrappers/Auth',
            ]
          },
          {
            path: '/my-music/collect/video',
            component: 'collect/video',
            title: '收藏的视频',
            wrappers: [
              '@/wrappers/Auth',
            ]
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
        path: '/mv-detail',
        component: 'mv-detail'
      },
      {
        path: '/search-detail',
        component: 'search-detail',
        routes: [
          {
            path: '/search-detail/single',
            component: 'search-detail/single',
            title: '单曲'
          },
          {
            path: '/search-detail/singer',
            component: 'search-detail/singer',
            title: '歌手',
          },
          {
            path: '/search-detail/album',
            component: 'search-detail/album',
            title: '专辑',
          },
          {
            path: '/search-detail/video',
            component: 'search-detail/video',
            title: '视频',
          },
          {
            path: '/search-detail/song-list',
            component: 'search-detail/song-list',
            title: '歌单',
          },
          {
            path: '/search-detail/user',
            component: 'search-detail/user',
            title: '用户',
          },
        ]
      },
      {
        path: '/artists-detail',
        component: 'artists-detail',
        title: "专辑",
        routes: [
          {
            path: '/artists-detail/mv',
            component: 'artists-detail/mv',
            title: 'MV'
          },
          {
            path: '/artists-detail/singer-detail',
            component: 'artists-detail/singer-detail',
            title: '歌手详情'
          },
          {
            path: '/artists-detail/similar-singer',
            component: 'artists-detail/similar-singer',
            title: '相似歌手'
          }
        ]
      },
      {
        path: '/album',
        component: 'album',
        title: "专辑",
        routes: [
          {
            path: '/album/song-list',
            component: 'album/song-list',
            title: '歌曲列表'
          },
          {
            path: '/album/comment',
            component: 'album/comment',
            title: '专辑评论'
          },
          {
            path: '/album/detail',
            component: 'album/detail',
            title: '专辑详情'
          }
        ]
      },
      {
        path: '/care/dynamic',
        component: 'care/dynamic',
        title: "动态",
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/care/follows',
        component: 'care/follows',
        title: "关注",
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/care/fan',
        component: 'care/fan',
        title: "粉丝",
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/exclusive-broadcast',
        component: 'exclusive-broadcast',
        title: "独家放送"
      },
      {
        path: '/homepage',
        component: 'homepage',
        title: "个人主页",
        wrappers: [
          '@/wrappers/Auth',
        ]
      },
      {
        path: '/singer-list',
        component: 'singer-list',
        title: "歌手榜单"
      },
      {
        path: '/login',
        component: 'login',
        title: "登录",
        // wrappers: [
        //   '@/wrappers/Success'
        // ]
      },
      {
        path: '/edit-song-list',
        component: 'edit-song-list',
        title: "编辑歌单"
      },
      {
        path: '/test',
        component: 'test',
        title: "测试页面"
      }
    ]
  }
]

export default routes

