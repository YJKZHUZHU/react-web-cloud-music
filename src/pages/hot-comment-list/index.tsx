/** @format */
import {commentHot} from "@/api/comment"
import {CommentTypeEnum, ICommentItem} from "@/types/comment"
import {useParams} from "@umijs/max"
import {Flex, message, Spin} from "antd"
import {useEffect, useRef, useState} from "react"
import {CommentItem} from "@/components"
import VirtualList from "rc-virtual-list"
import style from "./index.scss"

interface IParams {
  id: number
  type: CommentTypeEnum
}
const max = 60
const PagehotCommentList = () => {
  const {id, type} = useParams() as unknown as IParams
  const [list, setList] = useState<ICommentItem[]>([])
  const [loading, setLoading] = useState(false)
  const pageRef = useRef({limit: max, offset: 0})
  const total = useRef(0)
  const before = useRef("")
  const hasMore = useRef(false)
  const [virtualHeight, setVirtualHeight] = useState(0)

  const getHotComment = async () => {
    try {
      setLoading(true)
      const res = await commentHot({
        id,
        type,
        before: before.current,
        ...pageRef.current
      })
      total.current = res.data.total

      hasMore.current = res.data.hasMore

      if (total.current >= 5000) {
        before.current = String(res.data.hotComments.at(-1)?.time)
      }

      if (hasMore.current) {
        setList(list.concat(res.data.hotComments))
      } else {
        message.info("到底了")
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 50 &&
      !loading &&
      hasMore.current
    ) {
      pageRef.current.offset += max
      getHotComment()
    }
  }

  useEffect(() => {
    getHotComment()
    const ele = document.querySelector<HTMLDivElement>("#_contentContainer")
    if (ele) {
      setVirtualHeight(ele?.offsetHeight!)
    }
  }, [id])

  return (
    <Flex vertical gap={24} className="" flex={1}>
      <span className="text-[#0f0f11] text-[16px] font-[600]">精彩评论</span>
      <Spin spinning={loading} delay={500} tip="Loading...">
        <VirtualList
          height={virtualHeight}
          className={style.virtualList}
          data={list}
          styles={{verticalScrollBarThumb: {}}}
          itemKey="time"
          onScroll={onScroll}>
          {(item: ICommentItem, index: number) => (
            <CommentItem className="bg-[#ffffff] rounded-[12px]" key={index} data={item} />
          )}
        </VirtualList>
      </Spin>
    </Flex>
  )
}

export default PagehotCommentList
