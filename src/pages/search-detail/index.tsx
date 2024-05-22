/** @format */

import {useState, useEffect, FC, createContext, memo, useRef, useMemo} from "react"
import {Flex, Spin, Tabs} from "antd"
import {useParams} from "@umijs/max"
import {useQuery, useVirtualListHeight} from "@/hooks"
import {SEARCH_TYPE_ENUM} from "@/store/search"
import {cloudSearch} from "@/api/search"
import {Single, Singer, Album, Playlist, User, Video} from "./components"

interface ICountContext {
  getCount: (type: number | string, count: number) => void
  countInfo?: Record<any, any>
}

export const CountContext = createContext<ICountContext>({
  getCount: () => {},
  countInfo: {}
})

type ListType = "songs" | "albums" | "playlists" | "artists" | "mvs" | "userprofiles" | "videos"

type CountType =
  | "songCount"
  | "albumCount"
  | "playlistCount"
  | "artistCount"
  | "mvCount"
  | "userprofileCount"
  | "videoCount"

const MapKey = new Map<SEARCH_TYPE_ENUM, [ListType, CountType, (total: number) => string]>()
  .set(SEARCH_TYPE_ENUM.single, ["songs", "songCount", (total: number) => `找到${total}首单曲`])
  .set(SEARCH_TYPE_ENUM.album, ["albums", "albumCount", (total: number) => `找到${total}张专辑`])
  .set(SEARCH_TYPE_ENUM.lyric, ["songs", "songCount", (total: number) => `找到${total}首歌词`])
  .set(SEARCH_TYPE_ENUM.playlist, [
    "playlists",
    "playlistCount",
    (total: number) => `找到${total}个歌单`
  ])
  .set(SEARCH_TYPE_ENUM.singer, ["artists", "artistCount", (total: number) => `找到${total}位歌手`])
  .set(SEARCH_TYPE_ENUM.mv, ["mvs", "mvCount", (total: number) => `找到${total}个MV`])
  .set(SEARCH_TYPE_ENUM.user, [
    "userprofiles",
    "userprofileCount",
    (total: number) => `找到${total}位用户`
  ])
  .set(SEARCH_TYPE_ENUM.video, ["videos", "videoCount", (total: number) => `找到${total}个视频`])

const LIMIT = 100

const SearchDetail: FC = () => {
  const query = useQuery()

  const {keywords} = query
  const {type} = useParams() as unknown as {type: SEARCH_TYPE_ENUM}
  const [loading, setLoading] = useState(false)
  const [activeKey, setActiveKey] = useState(type)
  const [topTitle, setTopTitle] = useState("")
  const [list, setList] = useState<any[]>([])
  const virtualHeight = useVirtualListHeight(0)
  const hasMoreRef = useRef(false)
  const offsetRef = useRef(0)

  const onTab = (value: string) => {
    setList([])
    setActiveKey(value as SEARCH_TYPE_ENUM)
    getCloudsearch(value as SEARCH_TYPE_ENUM, true)
  }

  const {singleHeight, height, videoHeight} = useMemo(() => {
    if (virtualHeight !== 0) {
      return {
        height: virtualHeight - 123,
        singleHeight: virtualHeight - 163,
        videoHeight: virtualHeight - 123
      }
    }
    return {
      height: 0,
      singleHeight: 0,
      videoHeight: 0
    }
  }, [virtualHeight])

  const getCloudsearch = async (type: SEARCH_TYPE_ENUM, init: boolean = false) => {
    try {
      setLoading(true)
      init && setTopTitle("")
      const res = await cloudSearch({
        keywords,
        type,
        limit: LIMIT,
        offset: offsetRef.current
      })
      const [listKey, countKey, cb] = MapKey.get(type)!
      const result = res.data.result[listKey]
      const count = res.data.result[countKey] as number
      setTopTitle(cb(count))
      const mergeList = [...list, ...(result as any)]
      hasMoreRef.current = mergeList.length < count
      setList(init ? (result as any) : mergeList)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>, height: number, max: number) => {
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - height) <= max &&
      !loading &&
      hasMoreRef.current
    ) {
      console.log("到底了啊")
      offsetRef.current += LIMIT
      getCloudsearch(activeKey)
    }
  }

  const init = () => {
    hasMoreRef.current = false
    offsetRef.current = 0
    setList([])
    getCloudsearch(activeKey, true)
  }

  const commomProps = {
    keywords,
    data: list
  }

  useEffect(() => {
    setActiveKey(type)
  }, [type])

  useEffect(() => {
    init()
  }, [keywords])

  const items = [
    {
      key: SEARCH_TYPE_ENUM.single,
      tabKey: SEARCH_TYPE_ENUM.single,
      label: "单曲",
      children: activeKey === SEARCH_TYPE_ENUM.single && (
        <Spin spinning={loading} tip="Loading...">
          <Single
            {...commomProps}
            height={singleHeight}
            onScroll={(e) => onScroll(e, singleHeight, 40)}
          />
        </Spin>
      )
    },
    {
      key: SEARCH_TYPE_ENUM.singer,
      tabKey: SEARCH_TYPE_ENUM.singer,
      label: "歌手",
      children: activeKey === SEARCH_TYPE_ENUM.singer && (
        <Spin spinning={loading} tip="Loading...">
          <Singer {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        </Spin>
      )
    },
    {
      key: SEARCH_TYPE_ENUM.album,
      tabKey: SEARCH_TYPE_ENUM.album,
      label: "专辑",
      children: activeKey === SEARCH_TYPE_ENUM.album && (
        <Spin spinning={loading} tip="Loading...">
          <Album {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        </Spin>
      )
    },
    {
      key: SEARCH_TYPE_ENUM.video,
      tabKey: SEARCH_TYPE_ENUM.video,
      label: "视频",
      children: activeKey === SEARCH_TYPE_ENUM.video && (
        <Spin spinning={loading} tip="Loading...">
          <Video
            {...commomProps}
            height={videoHeight}
            onScroll={(e) => onScroll(e, videoHeight, 100)}
          />
        </Spin>
      )
    },
    {
      key: SEARCH_TYPE_ENUM.playlist,
      tabKey: SEARCH_TYPE_ENUM.playlist,
      label: "歌单",
      children: activeKey === SEARCH_TYPE_ENUM.playlist && (
        <Spin spinning={loading} tip="Loading...">
          <Playlist {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        </Spin>
      )
    },
    {
      key: SEARCH_TYPE_ENUM.user,
      tabKey: SEARCH_TYPE_ENUM.user,
      label: "用户",
      children: activeKey === SEARCH_TYPE_ENUM.user && (
        <Spin spinning={loading} tip="Loading...">
          <User {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 80)} />
        </Spin>
      )
    }
  ]

  return (
    <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex align="center" gap={8}>
        <span className="text-[#262626] font-bold text-[24px]">{keywords}</span>
        {topTitle && <span className="text-[#585858] self-end">{topTitle}</span>}
      </Flex>
      <Tabs activeKey={activeKey} onChange={onTab} items={items}></Tabs>
    </Flex>
  )
}

export default SearchDetail
