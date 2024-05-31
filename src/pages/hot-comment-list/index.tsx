/** @format */
import {commentHot} from "@/api/comment"
import {CommentTypeEnum, ICommentItem} from "@/types/comment"
import {useParams} from "@umijs/max"
import {Empty, Flex, message, Spin} from "antd"
import {useEffect, useRef, useState} from "react"
import {CommentItem} from "@/components"
import VirtualList from "rc-virtual-list"
import empty from "@/assets/empty.png"
import {useVirtualListHeight} from "@/hooks"

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
  const virtualHeight = useVirtualListHeight(50)

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
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 80 &&
      !loading &&
      hasMore.current
    ) {
      pageRef.current.offset += max
      getHotComment()
    }
  }

  useEffect(() => {
    getHotComment()
  }, [])

  return (
    <Flex vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]" flex={1}>
      <span className="text-[#0f0f11] text-[16px] font-[600]">精彩评论</span>
      {list?.length === 0 && !loading ? (
        <Empty
          imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
          style={{height: virtualHeight}}
          image={empty}
          description="暂无热门评论"
        />
      ) : (
        <Spin spinning={loading} delay={500} tip="Loading...">
          <VirtualList
            fullHeight
            height={virtualHeight}
            itemHeight={80}
            data={list}
            styles={{verticalScrollBarThumb: {display: "none"}}}
            itemKey="commentId"
            onScroll={onScroll}>
            {(item: ICommentItem) => (
              <CommentItem
                key={item?.commentId}
                data={item}
              />
            )}
          </VirtualList>
        </Spin>
      )}
    </Flex>
  )
}

export default PagehotCommentList
