// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/personal-recommendation","parentId":"@@/global-layout","id":"1"},"2":{"path":"/","layout":false,"id":"2"},"3":{"path":"/personal-recommendation","title":"个性化推荐","parentId":"2","id":"3"},"4":{"path":"","title":"视频","parentId":"5","id":"4","originPath":"/video"},"5":{"path":"/video","isWrapper":true,"parentId":"2","id":"5"},"6":{"path":"/mv","title":"MV","parentId":"2","id":"6"},"7":{"path":"/top-mv","title":"MV排行榜","parentId":"2","id":"7"},"8":{"path":"","title":"私人FM","parentId":"9","id":"8","originPath":"/fm"},"9":{"path":"/fm","isWrapper":true,"parentId":"2","id":"9"},"10":{"path":"","title":"朋友","parentId":"11","id":"10","originPath":"/friend"},"11":{"path":"/friend","isWrapper":true,"parentId":"2","id":"11"},"12":{"path":"","title":"我的音乐云盘","parentId":"13","id":"12","originPath":"/my-music/cloud"},"13":{"path":"/my-music/cloud","isWrapper":true,"parentId":"2","id":"13"},"14":{"path":"","title":"收藏的专辑","parentId":"15","id":"14","originPath":"/my-music/collect"},"15":{"path":"/my-music/collect","isWrapper":true,"parentId":"2","id":"15"},"16":{"path":"","title":"收藏的歌手","parentId":"17","id":"16","originPath":"/my-music/collect/singer"},"17":{"path":"/my-music/collect/singer","isWrapper":true,"parentId":"14","id":"17"},"18":{"path":"","title":"收藏的视频","parentId":"19","id":"18","originPath":"/my-music/collect/video"},"19":{"path":"/my-music/collect/video","isWrapper":true,"parentId":"14","id":"19"},"20":{"path":"/find-music/song-list","title":"歌单","parentId":"2","id":"20"},"21":{"path":"/find-music/top","title":"排行榜","parentId":"2","id":"21"},"22":{"path":"/find-music/singer","title":"歌手","parentId":"2","id":"22"},"23":{"path":"/find-music/latest-music","title":"最新音乐","parentId":"2","id":"23"},"24":{"path":"/playList/:id","title":"歌单详情","parentId":"2","id":"24"},"25":{"path":"/mv-detail","parentId":"2","id":"25"},"26":{"path":"/search-detail","parentId":"2","id":"26"},"27":{"path":"/search-detail/single","title":"单曲","parentId":"26","id":"27"},"28":{"path":"/search-detail/singer","title":"歌手","parentId":"26","id":"28"},"29":{"path":"/search-detail/album","title":"专辑","parentId":"26","id":"29"},"30":{"path":"/search-detail/video","title":"视频","parentId":"26","id":"30"},"31":{"path":"/search-detail/song-list","title":"歌单","parentId":"26","id":"31"},"32":{"path":"/search-detail/user","title":"用户","parentId":"26","id":"32"},"33":{"path":"/artists-detail","title":"专辑","parentId":"2","id":"33"},"34":{"path":"/artists-detail/mv","title":"MV","parentId":"33","id":"34"},"35":{"path":"/artists-detail/singer-detail","title":"歌手详情","parentId":"33","id":"35"},"36":{"path":"/artists-detail/similar-singer","title":"相似歌手","parentId":"33","id":"36"},"37":{"path":"/album","title":"专辑","parentId":"2","id":"37"},"38":{"path":"/album/song-list","title":"歌曲列表","parentId":"37","id":"38"},"39":{"path":"/album/comment","title":"专辑评论","parentId":"37","id":"39"},"40":{"path":"/album/detail","title":"专辑详情","parentId":"37","id":"40"},"41":{"path":"","title":"动态","parentId":"42","id":"41","originPath":"/care/dynamic"},"42":{"path":"/care/dynamic","isWrapper":true,"parentId":"2","id":"42"},"43":{"path":"","title":"关注","parentId":"44","id":"43","originPath":"/care/follows"},"44":{"path":"/care/follows","isWrapper":true,"parentId":"2","id":"44"},"45":{"path":"","title":"粉丝","parentId":"46","id":"45","originPath":"/care/fan"},"46":{"path":"/care/fan","isWrapper":true,"parentId":"2","id":"46"},"47":{"path":"/exclusive-broadcast","title":"独家放送","parentId":"2","id":"47"},"48":{"path":"","title":"个人主页","parentId":"49","id":"48","originPath":"/homepage"},"49":{"path":"/homepage","isWrapper":true,"parentId":"2","id":"49"},"50":{"path":"/singer-list","title":"歌手榜单","parentId":"2","id":"50"},"51":{"path":"","title":"登录","parentId":"52","id":"51","originPath":"/login"},"52":{"path":"/login","isWrapper":true,"parentId":"2","id":"52"},"53":{"path":"/edit-song-list","title":"编辑歌单","parentId":"2","id":"53"},"54":{"path":"/test","title":"测试页面","parentId":"2","id":"54"},"@@/global-layout":{"id":"@@/global-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__personal-recommendation__index" */'@/pages/personal-recommendation/index.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__video__index" */'@/pages/video/index.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__mv__index" */'@/pages/mv/index.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__top-mv__index" */'@/pages/top-mv/index.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "p__fm__index" */'@/pages/fm/index.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "p__friend__index" */'@/pages/friend/index.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'12': React.lazy(() => import(/* webpackChunkName: "p__cloud__index" */'@/pages/cloud/index.tsx')),
'13': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'14': React.lazy(() => import(/* webpackChunkName: "p__collect__index" */'@/pages/collect/index.tsx')),
'15': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'16': React.lazy(() => import(/* webpackChunkName: "p__collect__singer" */'@/pages/collect/singer.tsx')),
'17': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'18': React.lazy(() => import(/* webpackChunkName: "p__collect__video" */'@/pages/collect/video.tsx')),
'19': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'20': React.lazy(() => import(/* webpackChunkName: "p__song-list__index" */'@/pages/song-list/index.tsx')),
'21': React.lazy(() => import(/* webpackChunkName: "p__top__index" */'@/pages/top/index.tsx')),
'22': React.lazy(() => import(/* webpackChunkName: "p__singer__index" */'@/pages/singer/index.tsx')),
'23': React.lazy(() => import(/* webpackChunkName: "p__latest-music__index" */'@/pages/latest-music/index.tsx')),
'24': React.lazy(() => import(/* webpackChunkName: "p__playList__index" */'@/pages/playList/index.tsx')),
'25': React.lazy(() => import(/* webpackChunkName: "p__mv-detail__index" */'@/pages/mv-detail/index.tsx')),
'26': React.lazy(() => import(/* webpackChunkName: "p__search-detail__index" */'@/pages/search-detail/index.tsx')),
'27': React.lazy(() => import(/* webpackChunkName: "p__search-detail__single" */'@/pages/search-detail/single.tsx')),
'28': React.lazy(() => import(/* webpackChunkName: "p__search-detail__singer" */'@/pages/search-detail/singer.tsx')),
'29': React.lazy(() => import(/* webpackChunkName: "p__search-detail__album" */'@/pages/search-detail/album.tsx')),
'30': React.lazy(() => import(/* webpackChunkName: "p__search-detail__video" */'@/pages/search-detail/video.tsx')),
'31': React.lazy(() => import(/* webpackChunkName: "p__search-detail__song-list" */'@/pages/search-detail/song-list.tsx')),
'32': React.lazy(() => import(/* webpackChunkName: "p__search-detail__user" */'@/pages/search-detail/user.tsx')),
'33': React.lazy(() => import(/* webpackChunkName: "p__artists-detail__index" */'@/pages/artists-detail/index.tsx')),
'34': React.lazy(() => import(/* webpackChunkName: "p__artists-detail__mv__index" */'@/pages/artists-detail/mv/index.tsx')),
'35': React.lazy(() => import(/* webpackChunkName: "p__artists-detail__singer-detail__index" */'@/pages/artists-detail/singer-detail/index.tsx')),
'36': React.lazy(() => import(/* webpackChunkName: "p__artists-detail__similar-singer__index" */'@/pages/artists-detail/similar-singer/index.tsx')),
'37': React.lazy(() => import(/* webpackChunkName: "p__album__index" */'@/pages/album/index.tsx')),
'38': React.lazy(() => import(/* webpackChunkName: "p__album__song-list" */'@/pages/album/song-list.tsx')),
'39': React.lazy(() => import(/* webpackChunkName: "p__album__comment" */'@/pages/album/comment.tsx')),
'40': React.lazy(() => import(/* webpackChunkName: "p__album__detail" */'@/pages/album/detail.tsx')),
'41': React.lazy(() => import(/* webpackChunkName: "p__care__dynamic" */'@/pages/care/dynamic.tsx')),
'42': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'43': React.lazy(() => import(/* webpackChunkName: "p__care__follows" */'@/pages/care/follows.tsx')),
'44': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'45': React.lazy(() => import(/* webpackChunkName: "p__care__fan" */'@/pages/care/fan.tsx')),
'46': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'47': React.lazy(() => import(/* webpackChunkName: "p__exclusive-broadcast__index" */'@/pages/exclusive-broadcast/index.tsx')),
'48': React.lazy(() => import(/* webpackChunkName: "p__homepage__index" */'@/pages/homepage/index.tsx')),
'49': React.lazy(() => import(/* webpackChunkName: "wrappers__Auth" */'@/wrappers/Auth.tsx')),
'50': React.lazy(() => import(/* webpackChunkName: "p__singer-list__index" */'@/pages/singer-list/index.tsx')),
'51': React.lazy(() => import(/* webpackChunkName: "p__login__index" */'@/pages/login/index.tsx')),
'52': React.lazy(() => import(/* webpackChunkName: "wrappers__Success" */'@/wrappers/Success.tsx')),
'53': React.lazy(() => import(/* webpackChunkName: "p__edit-song-list__index" */'@/pages/edit-song-list/index.tsx')),
'54': React.lazy(() => import(/* webpackChunkName: "p__test__index" */'@/pages/test/index.tsx')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/01429034/douya/react-web-cloud-music/src/layouts/index.tsx')),
},
  };
}