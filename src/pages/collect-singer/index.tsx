/** @format */

import {useVirtualListHeight} from "@/hooks"
import {Flex, Spin} from "antd"
import coverall from "@/assets/coverall.png"
import VirtualList from "rc-virtual-list"
import {useEffect, useRef, useState} from "react"
import {IArtistItem, artist} from "@/api/collect"
import empty from "@/assets/empty.png"
import {Image} from "@/components"
import {history} from "@umijs/max"
import classNames from "classnames"

export default function () {
  const [loading, setLoading] = useState(false)
  const virtualListHeight = useVirtualListHeight(70)

  const [singerCount, setSingerCount] = useState(0)

  const [data, setData] = useState<IArtistItem[]>([])

  const pageRef = useRef({limit: 30, offset: 0})

  const hasMoreRef = useRef(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await artist({...pageRef.current})
      setSingerCount(res.count)
      setData(res.data)
      hasMoreRef.current = res.hasMore
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
        <span className="w-[100px] text-center text-[#535454]">暂无收藏歌手</span>
      </Flex>
    )

  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex flex={1} vertical gap={16} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
        <Flex align="center" gap={2}>
          <span className="text-[#272728] font-bold">收藏的专辑</span>
          <span>（{singerCount}）</span>
        </Flex>

        <VirtualList
          fullHeight
          itemHeight={80}
          height={virtualListHeight}
          data={data!}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          onScroll={onScroll}
          itemKey="id">
          {(item: IArtistItem, index) => {
            const alias = item.alias?.join("")
            return (
              <Flex
                onClick={() => history.push(`/artists-detail?id=${item.id}&name=${item.name}`)}
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
                <span className="flex-1 text-[#888888]">专辑：{item.albumSize}</span>
                <span className="flex-1 text-[#888888]">MV：{item.mvSize}</span>
              </Flex>
            )
          }}
        </VirtualList>
      </Flex>
    </Spin>
  )
}
