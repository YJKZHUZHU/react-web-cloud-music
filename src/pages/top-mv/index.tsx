/** @format */

import {useState, useEffect} from "react"
import {Tooltip, Tag, Spin, Flex} from "antd"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {history} from "@umijs/max"
import {Artists, Image, PlayVideoIcon} from "@/components"
import {MV_AREA} from "@/constants/mv"
import {useQuery} from "@/hooks"
import heatIcon from "@/assets/heat.png"
import heatUp from "@/assets/heatUp.png"
import heatDown from "@/assets/heatDown.png"
import {useGetTopMvList, useTopMvList, useTopMvLoading, useTopMvUpdateTime} from "@/store/mv"

export interface ITagDataItem {
  id: string
  value: string
}
export default function () {
  const {area} = useQuery<{area: string}>()
  const [activeTag, setActiveTag] = useState(area || "内地")
  const getTopMvList = useGetTopMvList()
  const topMvList = useTopMvList()
  const topMvLoading = useTopMvLoading()
  const topMvUpdateTime = useTopMvUpdateTime()
  const onTagChange = (item: ITagDataItem) => {
    if (activeTag === item.id) return
    setActiveTag(item.id)
    getTopMvList(item.id)
  }

  useEffect(() => {
    getTopMvList(area || "内地")
  }, [area])

  return (
    <Flex flex={1} gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex gap={3} align="center">
        <span>MV排行榜</span>
        <span className=" ml-[16px] text-[#878888] text-[14px]">最近更新：{topMvUpdateTime}</span>
        <Tooltip
          placement="topLeft"
          title="选取云音乐中三个月内发布的热度最高的50支mv，每天更新，热度有由mv播放，收藏，分享数量综合计算">
          <QuestionCircleOutlined className="text-[#878888] text-[14px] cursor-pointer" />
        </Tooltip>
        <Flex flex={1} justify="end">
          {MV_AREA.filter((item) => item.id !== "全部")?.map((item) => {
            return (
              <Tag.CheckableTag
                checked={item.id === activeTag}
                onChange={() => onTagChange(item)}
                key={item.id}>
                {item.value}
              </Tag.CheckableTag>
            )
          })}
        </Flex>
      </Flex>
      <Spin spinning={topMvLoading} tip="Loading...">
        <Flex wrap gap={22}>
          {topMvList?.map((item, index) => {
            return (
              <Flex
                onClick={() => history.push(`/mv-detail/${item.id}`)}
                gap={18}
                key={item.id}
                className="w-[49%] cursor-pointer">
                <Flex vertical gap={4} className=" self-center">
                  <span className="text-[#878888] text-[20px] font-bold">{index + 1}</span>
                  {index + 1 === item.lastRank && (
                    <span className="text-[#878888] text-[20px]">-</span>
                  )}
                  {index + 1 < item?.lastRank && <img width={12} src={heatUp} alt="" />}

                  {index + 1 > item?.lastRank && <img width={12} src={heatDown} alt="" />}
                </Flex>
                <div className="relative rounded-[5px] w-[200px] h-[100px]">
                  <Image
                    width={200}
                    height={100}
                    size={[200, 100]}
                    multiple={2}
                    className="w-[200px] h-[100px]"
                    src={item.cover}
                  />
                  <PlayVideoIcon />
                  <Flex
                    justify="end"
                    gap={4}
                    className=" text-[#ffffff] text-[12px] w-full absolute top-[4px] px-[8px]">
                    <img
                      src={heatIcon}
                      width={12}
                      height={12}
                      className="w-[12px] h-[12px]"
                      alt=""
                    />
                    <span>{item.score}</span>
                  </Flex>
                </div>
                <Flex vertical gap={12} flex={1} className=" mt-[12px]">
                  <span className=" line-clamp-1 cursor-pointer text-[#262727] hover:text-[#101010]">
                    {item?.mv?.title}
                  </span>
                  <Artists color="#262727" hoverColor="#0B0B0B" data={item?.artists} />
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Spin>
    </Flex>
  )
}
