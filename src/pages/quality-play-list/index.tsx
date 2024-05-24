/** @format */

import {CaretRightOutlined, FilterOutlined} from "@ant-design/icons"
import {useParams} from "@umijs/max"
import {Button, Flex, Popover, Spin, Tag as AntTag, message, Row, Col} from "antd"
import {useEffect, useMemo, useRef, useState} from "react"
import VirtualList from "rc-virtual-list"
import {IHighqualityParams, highquality} from "@/api/songList"
import {
  IHighqualityTagsItem,
  IPlaylistItem,
  useGetHighqualityTags,
  useHighqualityTags
} from "@/store/songList"
import {Image, Tag} from "@/components"
import {history} from "@umijs/max"
import Utils from "@/help"
import style from "./index.scss"
import {useVirtualListHeight} from "@/hooks"

const {CheckableTag} = AntTag

const max = 60
const QualityPlayList = () => {
  const getHighqualityTags = useGetHighqualityTags()
  const highqualityTags = useHighqualityTags()
  const {id} = useParams() as unknown as {id: string}
  const [visible, setVisible] = useState(false)
  const [activeTag, setActiveTag] = useState("全部")
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<IPlaylistItem[]>([])
  const total = useRef(0)
  const before = useRef("")
  const hasMore = useRef(false)

  const virtualHeight = useVirtualListHeight(100)

  const getList = async (params: Partial<IHighqualityParams>, scroll: boolean = false) => {
    try {
      setLoading(true)

      const res = await highquality(params)
      total.current = res.data.total

      before.current = String(res.data.playlists.at(-1)?.updateTime)

      if (hasMore.current) {
        setList(list.concat(res.data.playlists))
      } else {
        setList(res.data.playlists)
      }
      hasMore.current = res.data.more

      scroll && !hasMore.current && message.info("到底了")

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 140 &&
      !loading &&
      hasMore.current
    ) {
      getList(
        {
          cat: activeTag,
          limit: max,
          before: Number(before.current)
        },
        true
      )
    }
  }

  const onlanguageTag = (item: IHighqualityTagsItem, close: boolean = false) => {
    close && setVisible(false)
    if (item.name === activeTag) return
    setActiveTag(item.name)
    hasMore.current = false
    getList({
      cat: item.name,
      limit: max
    })
  }

  const content = useMemo(() => {
    const data = Utils.chunkArray(highqualityTags, 5)
    return (
      <Flex vertical gap={12}>
        {data.map((item) => {
          return (
            <Flex key={item.key} wrap gap={4}>
              {item.list.map((item) => {
                return (
                  <CheckableTag
                    style={{marginInlineEnd: 0}}
                    className="line-clamp-1 basis-[19%]"
                    checked={activeTag === item.name}
                    onChange={() => onlanguageTag(item, true)}>
                    {item.name}
                  </CheckableTag>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    )
  }, [activeTag])

  const onAll = () => {
    setVisible(false)
    setActiveTag("全部")
    hasMore.current = false
    getList({
      cat: "全部",
      limit: max
    })
  }

  useEffect(() => {
    getHighqualityTags()
    getList({
      cat: activeTag,
      limit: max
    })
  }, [id])

  const wrapList = Utils.chunkArray(list, 3)

  console.log("virtualHeight", virtualHeight)

  return (
    <Flex vertical gap={20} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex align="center" justify="space-between">
        <span>精品歌单</span>
        <Popover
          open={visible}
          onOpenChange={setVisible}
          overlayClassName="w-[350px]"
          overlayInnerStyle={{width: 350}}
          content={content}
          title={
            <CheckableTag key="全部" checked={activeTag === "全部"} onChange={onAll}>
              全部歌单
            </CheckableTag>
          }
          trigger="click">
          <Button style={{width: 120}} icon={<FilterOutlined />} shape="round">
            筛选
          </Button>
        </Popover>
      </Flex>
      <Spin spinning={loading} delay={500} tip="Loading...">
        <VirtualList
          fullHeight
          itemHeight={140}
          height={virtualHeight}
          className={style.virtualList}
          data={wrapList}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          itemKey="key"
          onScroll={onScroll}>
          {(item: {key: number; list: IPlaylistItem[]}) => {
            return (
              <Flex wrap gap={12} key={item.key}>
                {item?.list.map((item) => (
                  <Flex key={item.name} className=" basis-[32%] h-[140px]" gap={12}>
                    <div
                      className="w-[140px] h-140px relative cursor-pointer"
                      onClick={() => history.push(`/playList/${item.id}`)}>
                      <Image
                        className="w-[140px] h-[140px]"
                        width={140}
                        height={140}
                        src={item.coverImgUrl}
                        size={[140, 140]}
                        multiple={2}
                      />
                      <Flex
                        gap={2}
                        align="center"
                        className="text-[#ffffff] absolute top-[6px] right-[6px]">
                        <CaretRightOutlined />
                        <span className="text-[14px]">{Utils.tranNumber(item.playCount)}</span>
                      </Flex>
                    </div>
                    <Flex justify="center" vertical gap={18} className="w-[200px]">
                      <span
                        onClick={() => history.push(`/playList/${item.id}`)}
                        className="line-clamp-1 text-[#262627] cursor-pointer">
                        {item.name}
                      </span>
                      <Flex
                        className="text-[#878788] text-[14px] w-[max-content] cursor-pointer hover:text-[#262627]"
                        align="center"
                        onClick={() => history.push(`/homepage/${item.creator.userId}`)}
                        gap={4}>
                        <span>by</span>
                        <span>{item.creator?.nickname}</span>
                        <img
                          alt=""
                          className=" h-[12px]"
                          src={`${item?.creator?.avatarDetail?.identityIconUrl}?param=12y12`}
                        />
                      </Flex>
                      <Flex align="center" gap={4}>
                        <Tag>{item.tag}</Tag>
                        <span className="flex-1 line-clamp-1 text-[#B2B2B2] text-[14px]">
                          {item.description}
                        </span>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )
          }}
        </VirtualList>
      </Spin>
    </Flex>
  )
}

QualityPlayList.title = "精品歌单"

export default QualityPlayList
