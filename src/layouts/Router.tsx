/** @format */

import React from "react"
import {
  SmileOutlined,
  CustomerServiceOutlined,
  CrownOutlined,
  TabletOutlined,
  AntDesignOutlined,
  PlayCircleOutlined,
  WifiOutlined,
  TeamOutlined,
  StarOutlined,
  CloudOutlined
} from "@ant-design/icons"
import {Route, MenuDataItem} from "@ant-design/pro-layout/lib/typings"
import {IPlayListItem} from "umi"

export const defaultRoutes: Route = {
  path: "/",
  routes: [
    {
      path: "/personal-recommendation",
      name: "个性推荐",
      icon: <SmileOutlined />
    },
    {
      path: "/video",
      name: "视频",
      icon: <PlayCircleOutlined />
    },
    {
      path: "/mv",
      name: "MV",
      icon: <PlayCircleOutlined />
    },
    {
      path: "/exclusive-broadcast",
      name: "独家放送",
      icon: <PlayCircleOutlined />,
      hideInMenu: true,
      parentKeys: ["/personal-recommendation"]
    },
    {
      path: "/mv-detail",
      name: "MV详情",
      icon: <PlayCircleOutlined />,
      hideInMenu: true,
      parentKeys: ["/mv"]
    },
    {
      path: "/playList/:id",
      name: "歌单详情",
      icon: <PlayCircleOutlined />,
      hideInMenu: true,
      parentKeys: ["/find-music/song-list"]
    },
    {
      path: "/top-mv",
      name: "MV排行榜",
      icon: <SmileOutlined />
    },
    {
      path: "/fm",
      name: "私人FM",
      icon: <WifiOutlined />
    },
    {
      path: "/friend",
      name: "朋友",
      icon: <TeamOutlined />
    },
    {
      path: "find-music",
      name: "发现音乐",
      icon: <CustomerServiceOutlined />,
      routes: [
        {
          path: "/find-music/song-list",
          name: "歌单",
          icon: <CrownOutlined />
        },
        {
          path: "/find-music/top",
          name: "排行榜",
          icon: <CrownOutlined />
        },
        {
          path: "/find-music/singer",
          name: "歌手",
          icon: <CrownOutlined />
        },
        {
          path: "/find-music/latest-music",
          name: "最新音乐",
          icon: <CrownOutlined />
        }
      ]
    },
    {
      name: "我的音乐",
      icon: <TabletOutlined />,
      path: "my-music",
      routes: [
        {
          path: "/my-music/cloud",
          name: "音乐云盘",
          icon: <CloudOutlined />
        },
        {
          path: "/my-music/collect/album",
          name: "我的收藏",
          icon: <StarOutlined />,
          hideChildrenInMenu: true,
          routes: [
            {
              path: "/my-music/collect/singer",
              name: "歌手",
              icon: <StarOutlined />
            },
            {
              path: "/my-music/collect/video",
              name: "视频",
              icon: <StarOutlined />
            }
          ]
        }
      ]
    }
  ]
}

const mapPlayList = (source: IPlayListItem[], type: "creator" | "favorite") => {
  return source.map((item, index) => {
    return {
      index,
      type,
      menuItem: item,
      isDelete: !(type === "creator" && index === 0),
      path: `/playList/${item.id}?listId=${item.id}`,
      name: item.name,
      key: item.id,
      icon: <SmileOutlined />
    }
  })
}

const renderRouter = (
  source: MenuDataItem[],
  creator: IPlayListItem[],
  favorite: IPlayListItem[]
): Promise<MenuDataItem[]> => {
  if (creator?.length === 0 || favorite?.length === 0) return Promise.resolve(source)
  return Promise.resolve([
    ...source,
    {
      name: `创建的歌单(${creator?.length || 0})`,
      icon: <AntDesignOutlined />,
      routes: mapPlayList(creator, 'creator')
    },
    {
      name: `收藏的歌单(${favorite?.length || 0})`,
      icon: <AntDesignOutlined />,
      routes: mapPlayList(favorite,'favorite')
    }
  ])
}

export default renderRouter
