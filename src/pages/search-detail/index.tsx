/** @format */

import {useState, useEffect, FC, useRef, useMemo} from "react"
import {Flex, Spin, Tabs} from "antd"
import {useParams} from "@umijs/max"
import {useQuery, useVirtualListHeight} from "@/hooks"
import {SEARCH_TYPE_ENUM} from "@/store/search"
import {cloudSearch} from "@/api/search"
import {Single, Singer, Album, Playlist, User, Video} from "./components"
import {MapKey, MapTabLabel} from "@/constants/search-detail"

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
      init && setList([])
      const res = await cloudSearch({
        keywords,
        type,
        limit: LIMIT,
        offset: offsetRef.current
      })
      const [listKey, countKey, cb] = MapKey.get(type)!
      const result = res.data.result[listKey] || []
      const count = (res.data.result[countKey] as number) || 0
      setTopTitle(!!!count ? "" : cb(count))
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

  const renderChildren = (children: JSX.Element | false) => {
    if (list.length === 0 && !loading) {
      return (
        <Flex align="center" gap={2} justify="center" className="text-[#2D2D2E] mt-[50px]">
          <span>很抱歉，未能找到与</span>
          <span className="text-[#416BA0]">“{keywords}”</span>
          <span>相关的任何{MapTabLabel.get(activeKey)}</span>
        </Flex>
      )
    }
    return (
      <Spin spinning={loading} tip="Loading...">
        {children}
      </Spin>
    )
  }

  const init = () => {
    hasMoreRef.current = false
    offsetRef.current = 0
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
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.single),
      children:
        activeKey === SEARCH_TYPE_ENUM.single &&
        renderChildren(
          <Single
            {...commomProps}
            height={singleHeight}
            onScroll={(e) => onScroll(e, singleHeight, 40)}
          />
        )
    },
    {
      key: SEARCH_TYPE_ENUM.singer,
      tabKey: SEARCH_TYPE_ENUM.singer,
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.singer),
      children:
        activeKey === SEARCH_TYPE_ENUM.singer &&
        renderChildren(
          <Singer {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        )
    },
    {
      key: SEARCH_TYPE_ENUM.album,
      tabKey: SEARCH_TYPE_ENUM.album,
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.album),
      children:
        activeKey === SEARCH_TYPE_ENUM.album &&
        renderChildren(
          <Album {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        )
    },
    {
      key: SEARCH_TYPE_ENUM.video,
      tabKey: SEARCH_TYPE_ENUM.video,
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.video),
      children:
        activeKey === SEARCH_TYPE_ENUM.video &&
        renderChildren(
          <Video
            {...commomProps}
            height={videoHeight}
            onScroll={(e) => onScroll(e, videoHeight, 100)}
          />
        )
    },
    {
      key: SEARCH_TYPE_ENUM.playlist,
      tabKey: SEARCH_TYPE_ENUM.playlist,
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.playlist),
      children:
        activeKey === SEARCH_TYPE_ENUM.playlist &&
        renderChildren(
          <Playlist {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 100)} />
        )
    },
    {
      key: SEARCH_TYPE_ENUM.user,
      tabKey: SEARCH_TYPE_ENUM.user,
      label: MapTabLabel.get(SEARCH_TYPE_ENUM.user),
      children:
        activeKey === SEARCH_TYPE_ENUM.user &&
        renderChildren(
          <User {...commomProps} height={height} onScroll={(e) => onScroll(e, height, 80)} />
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
