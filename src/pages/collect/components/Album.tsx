/** @format */

import {Flex} from "antd"
import {history} from "@umijs/max"
import {Artists, Image} from "@/components"
import VirtualList from "rc-virtual-list"
import coverall from "@/assets/coverall.png"
import classNames from "classnames"
import {useEffect, useRef, useState} from "react"
import {SubscriptionData, album} from "@/api/collect"
import empty from "@/assets/empty.png"
import {Props} from "./index"

const Album = (props: Props) => {
  const {virtualListHeight, loading, getCount, setLoading} = props

  const [data, setData] = useState<SubscriptionData[]>([])

  const pageRef = useRef({limit: 30, offset: 0})

  const hasMoreRef = useRef(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await album({...pageRef.current})
      setData(res.data)
      hasMoreRef.current = res.hasMore
      getCount && getCount(res.count)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight) <=
        80 &&
      !loading &&
      hasMoreRef.current
    ) {
      pageRef.current.offset += pageRef.current.limit
      getData()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (data.length === 0 && !loading)
    return (
      <Flex vertical gap={8} align="center" justify="center" style={{height: virtualListHeight}}>
        <img src={empty} width={100} />
        <span className="w-[100px] text-center text-[#535454]">暂无收藏专辑</span>
      </Flex>
    )

  return (
    <VirtualList
      fullHeight
      itemHeight={80}
      height={virtualListHeight}
      data={data!}
      styles={{verticalScrollBarThumb: {display: "none"}}}
      onScroll={onScroll}
      itemKey="id">
      {(item: SubscriptionData, index) => {
        const alias = item.alias?.join("")
        return (
          <Flex
            onClick={() => history.push(`/album/${item.id}`)}
            key={item.id}
            align="center"
            gap={12}
            justify="space-between"
            className={classNames(
              {"bg-[#F9F9F9]": index % 2 === 0},
              "h-[80px] px-[12px]",
              "hover:bg-[#EEEFF0] hover:cursor-pointer"
            )}>
            <div
              style={{
                backgroundRepeat: "no-repeat",
                background: `url(${coverall})`,
                backgroundPosition: "-240px -248px"
              }}
              className=" rounded-[5px] w-[76px] h-[60px]">
              <Image
                className="cursor-pointer rounded-[5px] w-[60px] h-[60px]"
                height={60}
                width={60}
                size={[60, 60]}
                multiple={2}
                src={item.picUrl}
              />
            </div>

            <Flex align="center" gap={4} flex={1}>
              <span>{item.name}</span>

              {alias && <span className="text-[#888888]">{`(${alias})`}</span>}
            </Flex>
            <Artists className=" flex-1" data={item.artists} />
            <span>{item.size}首</span>
          </Flex>
        )
      }}
    </VirtualList>
  )
}
export default Album
