/** @format */

import {CaretRightOutlined, FilterOutlined} from "@ant-design/icons"
import {useParams} from "@umijs/max"
import {Button, Flex, Popover, Spin, Tag, message, Image, Row, Col} from "antd"
import {useEffect, useMemo, useRef, useState} from "react"
import VirtualList from "rc-virtual-list"
import {IHighqualityParams, highquality} from "@/api/songList"
import {
  IHighqualityTagsItem,
  IPlaylistItem,
  useGetHighqualityTags,
  useHighqualityTags
} from "@/store/songList"
import {history} from "@umijs/max"
import Skeleton from "react-loading-skeleton"
import Utils from "@/help"
import style from "./index.scss"

const {CheckableTag} = Tag

const max = 60
const QualityPlayList = () => {
  const getHighqualityTags = useGetHighqualityTags()
  const highqualityTags = useHighqualityTags()
  const {id} = useParams() as unknown as {id: string}
  const [visible, setVisible] = useState(false)
  const [activeTag, setActiveTag] = useState("全部")
  const [loading, setLoading] = useState(false)
  const [virtualHeight, setVirtualHeight] = useState(0)
  const [list, setList] = useState<IPlaylistItem[]>([])
  const total = useRef(0)
  const before = useRef("")
  const hasMore = useRef(false)

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
    return (
      <Row gutter={[6, 6]} wrap>
        {highqualityTags.map((item) => {
          return (
            <Col key={item.name} span={4}>
              <CheckableTag
                className="line-clamp-1"
                checked={activeTag === item.name}
                onChange={() => onlanguageTag(item, true)}>
                {item.name}
              </CheckableTag>
            </Col>
          )
        })}
      </Row>
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
    const ele = document.querySelector<HTMLDivElement>("#_contentContainer")
    if (ele) {
      setVirtualHeight(ele?.offsetHeight!)
    }
  }, [id])

  return (
    <Flex vertical gap={20} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex align="center" justify="space-between">
        <span>精品歌单</span>
        <Popover
          open={visible}
          onOpenChange={setVisible}
          overlayClassName="w-[350px]"
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
          height={virtualHeight}
          className={style.virtualList}
          data={list}
          styles={{verticalScrollBarThumb: {}}}
          itemKey="name"
          onScroll={onScroll}>
          {(item: IPlaylistItem) => (
            <Flex key={item.name} className=" basis-[20%]" gap={12}>
              <div
                className="w-[140px] h-140px relative cursor-pointer"
                onClick={() => history.push(`/playList/${item.id}`)}>
                <Image
                  preview={false}
                  width={140}
                  height={140}
                  src={`${item.coverImgUrl}?param=140y140`}
                  fallback="data:image/png;base64,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"
                  placeholder={<Skeleton height={140} />}
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
                  <Tag color="red" bordered={false}>
                    {item.tag}
                  </Tag>
                  <span className="line-clamp-1 text-[#B2B2B2] text-[14px]">
                    {item.description}
                  </span>
                </Flex>
              </Flex>
            </Flex>
          )}
        </VirtualList>
      </Spin>
    </Flex>
  )
}

QualityPlayList.title = "精品歌单"

export default QualityPlayList
