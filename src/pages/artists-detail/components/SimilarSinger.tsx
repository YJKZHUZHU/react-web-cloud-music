/** @format */

import {useEffect, useState} from "react"
import {Spin, Empty, Flex} from "antd"
import VirtualList from "rc-virtual-list"
import {Image} from "@/components"
import {ISimiArtistItem, simiArtist} from "@/api/singer"
import empty from "@/assets/empty.png"
import Utils from "@/help"
import {history} from "@umijs/max"
import {Props} from "./index"

const SimilarSinger = (props: Props) => {
  const {id, virtualListHeight} = props

  const [list, setList] = useState<ISimiArtistItem[]>([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await simiArtist({id})
      setList(res.data?.artists || [])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (list.length === 0 && !loading) {
    return (
      <Empty
        imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
        style={{height: virtualListHeight}}
        image={empty}
        description="暂无相似歌手"></Empty>
    )
  }

  const wrapList = Utils.chunkArray(list, 6)

  return (
    <Spin spinning={loading} tip="Loading...">
      <VirtualList
        styles={{verticalScrollBarThumb: {display: "none"}}}
        itemKey="key"
        data={wrapList}
        height={virtualListHeight}
        itemHeight={160}>
        {(source: {key: number; list: ISimiArtistItem[]}) => {
          return (
            <Flex gap={29} key={source.key} wrap className="pb-[16px]">
              {source.list.map((item) => {
                return (
                  <Flex
                    className="cursor-pointer"
                    vertical
                    onClick={() => history.push(`/artists-detail?id=${item.id}&name=${item.name}`)}
                    gap={8}>
                    <Image
                      src={item.picUrl}
                      size={[160, 160]}
                      width={160}
                      height={160}
                      className="w-[160px] h-[160px]"
                    />
                    <span>{item.name}</span>
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
