/** @format */

import {useEffect, useState} from "react"
import {Spin, Flex, Empty} from "antd"
import {IArtistDescRes, artistDesc} from "@/api/singer"
import empty from "@/assets/empty.png"
import {Props} from "./index"

const SingerDetail = (props: Props) => {
  const {id, virtualListHeight, name} = props

  const [detail, setDetail] = useState<IArtistDescRes | null>(null)
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await artistDesc({id})
      setDetail(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!detail && !loading) {
    return (
      <Empty
        imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
        style={{height: virtualListHeight}}
        image={empty}
        description="暂无歌手简介"></Empty>
    )
  }

  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex style={{minHeight: virtualListHeight}} className="" vertical gap={32}>
        <Flex vertical gap={18}>
          <span className="text-[#272728] font-bold">{name}简介</span>
          <div className="text-[#868787] text-[14px]">{detail?.briefDesc}</div>
        </Flex>
        {detail?.introduction?.map((item) => {
          return (
            <Flex vertical gap={18} key={item.ti}>
              <span className="text-[#272728] font-bold">{item.ti}</span>
              <div className="text-[#868787] text-[14px]">{item.txt}</div>
            </Flex>
          )
        })}
      </Flex>
    </Spin>
  )
}

export default SingerDetail
