/** @format */

import {useEffect, useRef, useState} from "react"
import {UserOutlined} from "@ant-design/icons"
import {Avatar, Pagination, message, Spin, Flex} from "antd"
import {history} from "@umijs/max"
import {Empty} from "@/components"
import {playlistSubscribers} from "@/api/playlistDetail"
import {ISubscriber} from "@/types/playlistDetails"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"

interface Props {
  id: number
}
const Collection = (props: Props) => {
  const {id} = props
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const pageRef = useRef({limit: 60, offset: 0})

  const [list, setList] = useState<ISubscriber[]>([])

  const getList = async () => {
    try {
      setLoading(true)
      const res = await playlistSubscribers({id, ...pageRef.current})
      setLoading(false)
      setList(res.data.subscribers)
      setTotal(res.data.total)
    } catch (error) {
      setLoading(false)
      return message.info("稍后再试...")
    }
  }

  const onPageChange = (page: number, size: number) => {
    setCurrent(page)
    pageRef.current.limit = size
    pageRef.current.offset = (page - 1) * size
    getList()
  }

  useEffect(() => {
    id && getList()
  }, [id])

  if (!loading && list.length === 0) {
    return <Empty desc="暂无收藏者" />
  }

  return (
    <Spin spinning={loading} tip="Loading..." delay={500}>
      <Flex vertical gap={24} className=" mt-[16px]">
        <Flex wrap="wrap" gap={16}>
          {list.map((item) => {
            return (
              <Flex flex="1 1 45%" gap={8} align="center" key={item.userId}>
                <Avatar
                  size={100}
                  className="bg-#D74D45"
                  icon={<UserOutlined />}
                  src={item.avatarUrl}
                />
                <Flex vertical gap={4}>
                  <Flex align="center" gap={4}>
                    <span
                      onClick={() => history.push(`/homepage/${item.userId}`)}
                      className="cursor-pointer text-[#262626] hover:text-[#000000] text-[16px]">
                      {item.nickname}
                    </span>
                    <img className="h-[16px]" src={item.gender === 1 ? man : woman} />
                  </Flex>
                  <span className="text-[#939393] text-[14px]">{item.signature || "无"}</span>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        <Pagination
          className="self-center"
          size="small"
          current={current}
          defaultCurrent={1}
          total={total}
          hideOnSinglePage
          showSizeChanger={false}
          showQuickJumper={false}
          onChange={onPageChange}
        />
      </Flex>
    </Spin>
  )
}

export default Collection
