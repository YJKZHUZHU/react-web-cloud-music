/** @format */

import {useEffect, useRef, useState} from "react"
import {Spin, Empty, Flex} from "antd"
import VirtualList from "rc-virtual-list"
import {Image} from "@/components"
import {history} from "@umijs/max"
import coverall from "@/assets/coverall.png"
import {artistAlbum, ArtistAlbum} from "@/api/singer"
import empty from "@/assets/empty.png"
import classNames from "classnames"
import dayjs from "dayjs"
import {Props} from "./index"

const Album = (props: Props) => {
  const {id, virtualListHeight} = props

  const [list, setList] = useState<ArtistAlbum[]>([])
  const [loading, setLoading] = useState(false)
  const hasMoreRef = useRef(false)
  const pageRef = useRef({limit: 30, offset: 0})

  const getData = async () => {
    try {
      setLoading(true)
      const res = await artistAlbum({id, ...pageRef.current})
      hasMoreRef.current = res.data.more
      setList([...list, ...(res.data?.hotAlbums || [])])
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
        80 &&
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
        description="暂无专辑"></Empty>
    )
  }

  // const wrapList = Utils.chunkArray(list, 5)

  return (
    <Spin spinning={loading} tip="Loading...">
      <VirtualList
        onScroll={onScroll}
        itemKey="id"
        itemHeight={80}
        data={list}
        styles={{verticalScrollBarThumb: {display: "none"}}}
        height={virtualListHeight}>
        {(item: ArtistAlbum, index) => {
          return (
            <Flex
              key={item.id}
              align="center"
              onClick={() => history.push(`/album/${item.id}`)}
              gap={16}
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
                <span className=" line-clamp-1 text-[#282828] hover:text-[#010302]">
                  {item.name}
                </span>
                {item?.transNames && item?.transNames.length !== 0 && (
                  <span className="text-[#B0B0B2] line-clamp-1">({item.transNames.join()})</span>
                )}
              </Flex>

              <span className="w-[50px] text-[#B0B0B2]">{item.size}首</span>
              <span className="w-[150px] text-[#B0B0B2]">
                发行时间{dayjs(item?.publishTime).format("YYYY-MM-DD")}
              </span>
            </Flex>
          )
        }}
      </VirtualList>
    </Spin>
  )
}

export default Album
