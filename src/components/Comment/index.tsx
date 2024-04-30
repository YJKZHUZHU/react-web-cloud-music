/** @format */

import {Flex, Pagination, Spin} from "antd"
import {commentHot, commentNew} from "@/api/comment"
import {FC, useEffect, useRef, useState} from "react"
import {CommentSortTypeEnum, CommentTypeEnum, ICommentItem} from "@/types/comment"
import {history} from "@umijs/max"
import {CommentItem} from "@/components"
import {RightOutlined} from "@ant-design/icons"

interface Props {
  id: number
  type?: CommentTypeEnum
  sortType?: CommentSortTypeEnum
}

const Comment: FC<Props> = (props) => {
  const {id, type = CommentTypeEnum.playList, sortType = CommentSortTypeEnum.time} = props
  const [hotComment, setHotComment] = useState<ICommentItem[]>([])
  const [newCommment, setNewCommment] = useState<ICommentItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoadiing] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const pageRef = useRef({pageNo: 1, pageSize: 50})
  const cursor = useRef("")

  const getData = async () => {
    try {
      setLoadiing(true)
      await getHotComment()
      await getNewComment()
      setLoadiing(false)
    } catch (error) {
      setLoadiing(false)
      console.log("error", error)
    }
  }

  const getHotComment = async () => {
    try {
      const res = await commentHot({id, type, limit: 10})
      setHotComment(res.data.hotComments)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getNewComment = async () => {
    try {
      const res = await commentNew({
        ...pageRef.current,
        id,
        type,
        sortType,
        cursor:
          sortType === CommentSortTypeEnum.time && pageRef.current.pageNo !== 1
            ? cursor.current
            : ""
      })
      cursor.current = res.data.cursor
      setNewCommment(res.data.comments)
      setTotal(res.data.totalCount)
    } catch (error) {
      console.log("error", error)
    }
  }

  const onPageChange = async (page: number, size: number) => {
    try {
      setCurrent(page)
      setPageSize(size)
      pageRef.current.pageNo = page
      pageRef.current.pageSize = size
      setLoadiing(true)
      await getNewComment()
      setLoadiing(false)
    } catch (error) {
      setLoadiing(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  return (
    <Spin spinning={loading} tip="Loading..." delay={500}>
      <Flex vertical gap={20} className="mt-[20px]">
        {hotComment.length !== 0 && (
          <Flex vertical gap={20}>
            <span className="text-[#7D829E] text-[16px] font-[600]">精彩评论</span>
            <Flex vertical gap={12}>
              {hotComment.map((item, index) => (
                <CommentItem key={index} data={item} />
              ))}
            </Flex>

            <Flex align="center" justify="center">
              <Flex
                onClick={() => history.push(`/hot-comment-list/${id}/${type}`)}
                align="center"
                className="cursor-pointer"
                gap={4}>
                <span className="text-[#363D62]">更多精彩评论</span>
                <RightOutlined className="text-[#363D62]" />
              </Flex>
            </Flex>
          </Flex>
        )}
        {newCommment.length !== 0 && (
          <Flex vertical gap={20}>
            <span className="text-[#7D829E] text-[16px] font-[600]">最新评论({total})</span>
            <Flex vertical gap={12}>
              {newCommment.map((item, index) => (
                <CommentItem key={index} data={item} />
              ))}
            </Flex>

            <Pagination
              disabled={loading}
              className="self-center"
              size="small"
              total={total}
              current={current}
              pageSize={pageSize}
              defaultPageSize={50}
              hideOnSinglePage
              pageSizeOptions={[10, 20, 30, 40, 50, 60, 100]}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共 ${total} 条评论`}
              onChange={onPageChange}
            />
          </Flex>
        )}
      </Flex>
    </Spin>
  )
}

export default Comment
