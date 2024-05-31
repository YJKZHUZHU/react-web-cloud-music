/** @format */

import {useEffect} from "react"
import {Flex, Spin} from "antd"
import {history} from "@umijs/max"
import {Artists, Image, PlayVideoIcon} from "@/components"
import {MV_AREA} from "@/constants/mv"
import {
  useGetNewMvList,
  useNewMvList,
  useNewMvLoading,
  useGetHotMvList,
  useHotMvList,
  useHotMvLoading,
  useGetRcmdMvList,
  useRcmdMvList,
  useRcmdMvLoading,
  useGetTopMvList,
  useTopMvList,
  useTopMvLoading
} from "@/store/mv"
import heatIcon from "@/assets/heat.png"
import heatUp from "@/assets/heatUp.png"
import heatDown from "@/assets/heatDown.png"
import {Top, ITagDataItem, List} from "./components"

export default function () {
  const getNewMvList = useGetNewMvList()
  const newMvList = useNewMvList()
  const newMvLoading = useNewMvLoading()
  const getHotMvList = useGetHotMvList()
  const hotMvList = useHotMvList()
  const hotMvLoading = useHotMvLoading()
  const getRcmdMvList = useGetRcmdMvList()
  const rcmdMvList = useRcmdMvList()
  const rcmdMvLoading = useRcmdMvLoading()
  const getTopMvList = useGetTopMvList()
  const topMvList = useTopMvList()
  const topMvLoading = useTopMvLoading()

  useEffect(() => {
    getNewMvList("内地")
    getHotMvList()
    getRcmdMvList()
    getTopMvList("内地")
  }, [])

  const onTagChange = (item: ITagDataItem, type: "new" | "top") => {
    type === "new" && getNewMvList(item.id)
    type === "top" && getTopMvList(item.id)
  }

  return (
    <Flex vertical gap={12} flex={1}>
      <Flex gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px] min-h-[442px]">
        <Top
          title="最新MV"
          defauluTag="内地"
          tagData={MV_AREA?.filter((item) => item.id !== "全部")}
          onTag={(item) => onTagChange(item, "new")}
        />
        <List data={newMvList} loading={newMvLoading} />
      </Flex>
      <Flex gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px] min-h-[442px]">
        <Top title="热播MV" />
        <List data={hotMvList} loading={hotMvLoading} />
      </Flex>
      <Flex gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px] min-h-[442px]">
        <Top title="网易出品" />
        <List data={rcmdMvList} loading={rcmdMvLoading} />
      </Flex>

      <Flex gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px] min-h-[442px]">
        <Top
          onLink={(activeTag) => history.push(`/top-mv?area=${activeTag}`)}
          title="MV排行榜"
          defauluTag="内地"
          tagData={MV_AREA?.filter((item) => item.id !== "全部")}
          onTag={(item) => onTagChange(item, "top")}
        />
        <Spin spinning={topMvLoading} tip="Loading...">
          <Flex wrap gap={22}>
            {topMvList?.slice(0, 8)?.map((item, index) => {
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
    </Flex>
  )
}
