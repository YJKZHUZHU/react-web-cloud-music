/** @format */

import {FileAddOutlined} from "@ant-design/icons"
import {Divider, Flex} from "antd"
import Utils from "@/help/index"
import classnames from "classnames"
import {useSetAllPlayRecord} from "@/store/user"
import {
  useGetSongInfo,
  usePlayHistory,
  useSetPlayHistory,
  useSetShowPlayRecord,
  useShowPlayRecord
} from "@/store/player"
import classNames from "classnames"
import {useEffect} from "react"
import {history} from "@umijs/max"

const PlayRecord = () => {
  const showPlayRecord = useShowPlayRecord()
  const setShowPlayRecord = useSetShowPlayRecord()
  const setPlayHistory = useSetPlayHistory()
  const playHistory = usePlayHistory()
  const getSongInfo = useGetSongInfo()

  const setAllPlayRecord = useSetAllPlayRecord()

  useEffect(() => {
    setAllPlayRecord()
  }, [])

  return (
    <Flex
      vertical
      gap={16}
      className={classnames(
        " w-[640px] fixed top-[60px] bottom-[80px] left-[calc(100%)]  bg-[#EFEDF4] z-[1001] overflow-x-hidden overflow-y-scroll transition-transform ",
        !showPlayRecord ? "transform-none" : "translate-x-[-640px]"
      )}>
      <Flex vertical gap={18} className="px-[24px]">
        <span className="text-[#272728] text-[20px] font-[600] pt-[20px]">当前播放</span>
        <Flex justify="space-between">
          <span className="text-[#AFB0B0]">共{playHistory.length}首</span>
          <Flex gap={12}>
            <Flex gap={2} align="center" className="text-[#535354] cursor-pointer">
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
        <Divider className=" my-0 " />
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
              return (
                <Flex
                  onDoubleClick={() => getSongInfo(item.id)}
                  gap={12}
                  justify="space-between"
                  key={item.id}
                  className={classNames(
                    "px-[24px] py-[8px] cursor-default",
                    {
                      "bg-[#FDFEFE]": index % 2 !== 0
                    },
                    "hover:bg-[#F0F0F1]"
                  )}>
                  <span className="flex-1 text-[#292929] hover:text-[#080909]">{item.name}</span>
                  <Flex
                    align="center"
                    gap={2}
                    className="w-[200px] text-[#515252] hover:text-[#232323] line-clamp-1">
                    {item.ar.map((d, i) => {
                      return (
                        <span
                          onClick={() => {
                            setShowPlayRecord(false)
                            history.push(`/artists-detail?id=${d.id}&name=${d.name}`)
                          }}
                          className="text-[#515252] cursor-pointer">
                          {d.name}
                          {i + 1 === item.ar.length ? "" : "/"}
                        </span>
                      )
                    })}
                  </Flex>
                  <span className="text-[#A8A8A9] hover:text-[#232323]">
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
export default PlayRecord
