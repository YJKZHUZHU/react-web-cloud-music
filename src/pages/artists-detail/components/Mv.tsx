/** @format */

import {useEffect, useRef, useState} from "react"
import {Spin, Empty, Flex} from "antd"
import VirtualList from "rc-virtual-list"
import {Image} from "@/components"
import {history} from "@umijs/max"
import {artistMv, IMVItem} from "@/api/singer"
import empty from "@/assets/empty.png"
import Utils from "@/help"
import {Props} from "./index"
import {CaretRightOutlined} from "@ant-design/icons"

const SimilarSinger = (props: Props) => {
  const {id, virtualListHeight} = props

  const [list, setList] = useState<IMVItem[]>([])
  const [loading, setLoading] = useState(false)
  const hasMoreRef = useRef(false)
  const pageRef = useRef({limit: 30, offset: 0})

  const getData = async () => {
    try {
      setLoading(true)
      const res = await artistMv({id, ...pageRef.current})
      hasMoreRef.current = res.data.hasMore
      setList([...list, ...(res.data?.mvs || [])])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        160 &&
      !loading &&
      hasMoreRef.current
    ) {
      pageRef.current.offset += pageRef.current.limit
      getData()
    }
  }

  if (list.length === 0 && !loading) {
    return (
      <Empty
        imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
        style={{height: virtualListHeight}}
        image={empty}
        description="暂无MV"></Empty>
    )
  }

  const wrapList = Utils.chunkArray(list, 5)

  return (
    <Spin spinning={loading} tip="Loading...">
      <VirtualList
        onScroll={onScroll}
        itemKey="key"
        itemHeight={130}
        data={wrapList}
        styles={{verticalScrollBarThumb: {display: "none"}}}
        height={virtualListHeight}>
        {(source: {key: number; list: IMVItem[]}) => {
          return (
            <Flex gap={27} key={source.key} wrap className=" pb-[16px] ">
              {source.list.map((item) => {
                return (
                  <Flex
                    onClick={() => history.push(`/mv-detail?mvid=${item.id}`)}
                    vertical
                    gap={8}
                    className="cursor-pointer">
                    <div className=" relative w-[200px] h-[100px]">
                      <Image
                        src={item.imgurl}
                        size={[200, 100]}
                        width={200}
                        height={100}
                        className="w-[200px] h-[100px]"
                      />
                      <span className=" text-right text-[#ffffff] bottom-0 text-[12px] absolute w-full px-[8px]">
                        {Utils.formatSeconds(item.duration)}
                      </span>

                      <Flex
                        gap={2}
                        align="center"
                        justify="end"
                        className="text-[#ffffff] top-0 text-[12px] absolute w-full px-[8px]">
                        <CaretRightOutlined />
                        <span> {Utils.tranNumber(item.playCount, 0)}</span>
                      </Flex>
                    </div>
                    <span className=" w-[200px] line-clamp-1 text-[#282828] hover:text-[#010302]">
                      {item.name}
                    </span>
                  </Flex>
                )
              })}
            </Flex>
          )
        }}
      </VirtualList>
    </Spin>
  )
}

export default SimilarSinger
