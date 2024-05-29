/** @format */

enum MenuKeyEnum {
  FIND_MUSIC = "findMusic",
  VIDEO = "video",
  MY_MUSIC = "myMusic",
  MY_SONG_LIST = "songList"
}
interface IRoue {
  component?: string | undefined
  layout?: false | undefined
  path?: string | undefined
  redirect?: string | undefined
  routes?: IRoue[]
  title?: string
  wrappers?: Array<string> | undefined
  parentKey?: MenuKeyEnum
}

const routes: IRoue[] = [
  // {
  //   path: '/',
  //   redirect: '/personal-recommendation',
  // },
  {
    path: "/login",
    component: "login",
    title: "登录",
    layout: false // 关闭 layout

    // wrappers: [
    //   '@/wrappers/Success'
    // ]
  },
  {
    path: "/",
    component: "@/layouts",
    layout: false, // 关闭 layout
    routes: [
      {
        path: "/personal-recommendation",
        component: "@/pages/personal-recommendation",
        title: "个性化推荐",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/video",
        component: "@/pages/video",
        title: "视频",
        parentKey: MenuKeyEnum.VIDEO,
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/mv",
        component: "@/pages/mv",
        title: "MV",
        wrappers: ["@/wrappers/Auth"]
      },
      // {
      //   path: '/login',
      //   component: 'login',
      //   title: "登录",
      //   // layout: false,// 关闭 layout
      //   // wrappers: [
      //   //   '@/wrappers/Success'
      //   // ]
      // },
      {
        path: "/top-mv",
        component: "@/pages/top-mv",
        title: "MV排行榜",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/fm",
        component: "@/pages/fm",
        title: "私人FM",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/friend",
        component: "@/pages/friend",
        title: "朋友",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/cloud",
        component: "@/pages/cloud",
        title: "我的音乐云盘",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/collect",
        component: "collect",
        title: "我的收藏",
        parentKey: MenuKeyEnum.MY_MUSIC
      },
      {
        path: "/find-music/song-list",
        component: "song-list",
        title: "歌单",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/find-music/quality-play-list/:id",
        component: "quality-play-list",
        title: "精品歌单",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/find-music/top",
        component: "top",
        title: "排行榜",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/find-music/singer",
        component: "singer",
        title: "歌手",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/find-music/latest-music",
        component: "latest-music",
        title: "最新音乐",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/playList/:id",
        component: "playList",
        title: "歌单详情"
      },
      {
        path: "/mv-detail/:mvid",
        component: "mv-detail",
        title: "MV详情"
      },
      {
        path: "/video-detail/:vid",
        component: "video-detail",
        title: "视频详情"
      },
      {
        path: "/search-detail/:type",
        component: "search-detail",
        title: "搜索详情"
      },
      {
        path: "/artists-detail",
        component: "artists-detail",
        title: "歌手详情"
      },
      {
        path: "/album/:id",
        component: "album",
        title: "专辑"
      },
      {
        path: "/care/dynamic",
        component: "care/dynamic",
        title: "动态",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/care/follows",
        component: "care/follows",
        title: "关注",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/care/fan",
        component: "care/fan",
        title: "粉丝",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/exclusive-broadcast",
        component: "exclusive-broadcast",
        title: "独家放送",
        parentKey: MenuKeyEnum.FIND_MUSIC
      },
      {
        path: "/homepage/:uid",
        component: "homepage",
        title: "个人主页",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/hot-comment-list/:id/:type",
        component: "hot-comment-list",
        title: "热门评论",
        wrappers: ["@/wrappers/Auth"]
      },
      {
        path: "/singer-list",
        component: "singer-list",
        title: "歌手榜单"
      },

      {
        path: "/edit-song-list",
        component: "edit-song-list",
        title: "编辑歌单"
      },
      {
        path: "/my-playlist",
        component: "my-playlist",
        title: "我的歌单",
        parentKey: MenuKeyEnum.MY_MUSIC
      },

      {
        path: "/test",
        component: "test",
        title: "测试页面"
      }
    ]
  }
]

export default routes
