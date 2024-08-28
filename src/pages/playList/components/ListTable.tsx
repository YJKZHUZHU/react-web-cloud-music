/** @format */

import {FC} from "react"
import {Flex, Spin} from "antd"
import {Artists, Empty, PlayStatus, Tag, VideoIcon, Like} from "@/components"
import Utils from "@/help"
import {history} from "@umijs/max"
import {useGetSongInfo} from "@/store/player"
import {Track} from "@/types/playlistDetails"
import classNames from "classnames"

interface TableListProps {
  data: Track[]
  loading: boolean
}

const TableList: FC<TableListProps> = (props) => {
  const {data = [], loading} = props
  const getSongInfo = useGetSongInfo()

  return (
    <Flex vertical>
      <Flex
        gap={8}
        className="text-[#757575] h-[38px] bg-[#FFFFFF] hover:bg-[#EFEFF0]"
        align="center">
        <div className="w-[50px] pl-[8px]"></div>
        <div className="flex-1">音乐标题</div>
        <div className="w-[150px]">歌手</div>
        <div className="w-[200px]">专辑</div>
        <div className="w-[80px]">时长</div>
      </Flex>

      {!loading && data?.length === 0 && <Empty />}

      <Spin spinning={loading && data.length === 0} tip="Loading...">
        {data?.map((item, index) => {
          return (
            <Flex
              onClick={() => getSongInfo(item?.id)}
              gap={8}
              align="center"
              key={item.id}
              className={classNames("h-[38px] hover:bg-[#EFEFF0]", {
                "bg-[#FFFFFF]": index % 2 === 0,
                "bg-[#F9F9F9]": index % 2 !== 0
              })}>
              <Flex className="w-[50px] pl-[8px]" gap={8}>
                <div className="flex-1">
                  <PlayStatus id={item.id}>
                    <span className="flex-1">{Utils.generateIndex(index)}</span>
                  </PlayStatus>
                </div>
                <Like id={item.id} />
              </Flex>
              <Flex className="flex-1 line-clamp-1" gap={4} align="center">
                <span>{item.name}</span>
                {item?.alia && item?.alia.length !== 0 && (
                  <span className="text-[#888888]">({item?.alia?.join()})</span>
                )}
                {item.hr && (
                  <Tag color="#FB5024" borderColor="#FA906D">
                    Hi-Res
                  </Tag>
                )}
                {item.sq && (
                  <Tag color="#FB5024" borderColor="#FA906D">
                    SQ
                  </Tag>
                )}

                <VideoIcon type="mv" id={item.mv} />
              </Flex>
              <div className="w-[150px]">
                <Artists color="#515151" hoverColor="#242425" data={item.ar} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  history.push(`/album/${item?.al?.id}`)
                }}
                className="w-[200px] text-[#515151] hover:text-[#242425] cursor-pointer line-clamp-1">
                {item?.al?.name}
              </div>
              <div className="w-[80px] text-[#B6B6B6]">{Utils.formatSeconds(item?.dt)}</div>
            </Flex>
          )
        })}
      </Spin>
    </Flex>
  )
}

export default TableList
