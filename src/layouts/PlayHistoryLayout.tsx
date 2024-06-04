/** @format */

import {
  FileAddOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  RightSquareOutlined
} from "@ant-design/icons"
import {Divider, Flex, message} from "antd"
import Utils from "@/help/index"
import classnames from "classnames"
import {
  useGetSongInfo,
  usePlayHistory,
  useSetPlayHistory,
  useSetShowPlayRecord,
  useShowPlayRecord,
  useSongId
} from "@/store/player"
import classNames from "classnames"
import {useEffect} from "react"
import {history} from "@umijs/max"
import {Artists, Tag} from "@/components"

const PlayHistoryLayout = () => {
  const showPlayRecord = useShowPlayRecord()
  const playHistory = usePlayHistory()
  const songId = useSongId()
  const setShowPlayRecord = useSetShowPlayRecord()
  const setPlayHistory = useSetPlayHistory()
  const getSongInfo = useGetSongInfo()

  useEffect(() => {
    const targetElement = document.getElementById("_PlayHistoryLayout")!
    const ignoreElement = document.getElementById("_footer")!
    document.addEventListener("click", function (event: any) {
      // 检查点击的目标是否是'myElement'，或者是否是它的子元素
      if (
        ![targetElement, ignoreElement].includes(event.target!) &&
        !targetElement?.contains(event?.target!) &&
        !ignoreElement?.contains(event?.target!)
      ) {
        // 如果点击的不是'myElement'，也不是它的子元素，那么认为点击发生在外部
        console.log("Clicked outside of myElement!")
        setShowPlayRecord(false)
      }
    })
    return document.removeEventListener("click", () => {
      console.log("移除了")
    })
  }, [])

  console.log("playHistory", playHistory)

  return (
    <Flex
      id="_PlayHistoryLayout"
      vertical
      gap={16}
      className={classnames(
        " w-[640px] fixed top-[60px] bottom-[80px] left-[calc(100%)]  bg-[#ffffff] z-[1001] overflow-x-hidden overflow-y-scroll transition-transform ",
        !showPlayRecord ? "transform-none" : "translate-x-[-640px]"
      )}>
      <Flex vertical gap={18} className="px-[24px]">
        <span className="text-[#272728] text-[20px] font-[600]">当前播放</span>
        <Flex justify="space-between">
          <span className="text-[#AFB0B0]">共{playHistory.length}首</span>
          <Flex gap={12}>
            <Flex
              onClick={() => {
                message.info("正在努力开发中")
              }}
              gap={2}
              align="center"
              className="text-[#535354] cursor-pointer">
              <FileAddOutlined />
              <span>收藏全部</span>
            </Flex>
            <span
              className="text-[#416AA0] cursor-pointer hover:text-[#0E44A0]"
              onClick={() => setPlayHistory([])}>
              清空列表
            </span>
          </Flex>
        </Flex>
        <Divider className=" !my-0 " />
      </Flex>

      <Flex vertical flex={1}>
        {playHistory.length === 0 ? (
          <Flex flex={1} vertical gap={24} align="center" justify="center">
            <span className="text-[#878787]">你还没有添加任何歌曲！</span>
            <Flex gap={2} align="center" className="text-[#878787]">
              <span>去首页</span>
              <span
                onClick={() => {
                  setShowPlayRecord(false)
                  history.push("/personal-recommendation")
                }}
                className="text-[#272828] underline cursor-pointer">
                发现音乐
              </span>
            </Flex>
          </Flex>
        ) : (
          <>
            {playHistory.map((item, index) => {
              const isActive = item.id === songId
              return (
                <Flex
                  onDoubleClick={() => getSongInfo(item.id)}
                  gap={12}
                  align="center"
                  justify="space-between"
                  key={item.id}
                  className={classNames(
                    "px-[24px] py-[8px] cursor-default relative",
                    {
                      "bg-[#F7F9F9]": index % 2 !== 0
                    },
                    "hover:bg-[#F0F0F1]"
                  )}>
                  {isActive && (
                    <PauseOutlined className="text-[#C52727] text-[12px] absolute left-[10px] top-[12px]" />
                  )}
                  <Flex align="center" gap={4} className="w-[350px]">
                    <span
                      className={classNames(" line-clamp-1 text-[#292929] hover:text-[#080909]", {
                        "text-[#C52727]": isActive,
                        "hover:text-[#C52727]": isActive
                      })}>
                      {item.name}
                    </span>
                    {item.tns && item.tns.length !== 0 && (
                      <span className="text-[#ABABAC]">({item.tns.join()})</span>
                    )}
                    {item?.sq && (
                      <Tag color="#C52627" borderColor="#C52627">
                        SQ
                      </Tag>
                    )}
                    {item.mv !== 0 && (
                      <PlayCircleOutlined
                        onClick={() => history.push(`/mv-detail/${item.mv}`)}
                        className="text-[#C52626]"
                      />
                    )}
                  </Flex>

                  <Artists className="flex-1" max={2} data={item.ar} />

                  <span className="w-[50px] text-left text-[#A8A8A9] hover:text-[#232323]">
                    {Utils.formatSeconds(item.dt)}
                  </span>
                </Flex>
              )
            })}
          </>
        )}
      </Flex>
    </Flex>
  )
}
export default PlayHistoryLayout
