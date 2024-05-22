/** @format */

import {Flex, Tag} from "antd"
import {history} from "@umijs/max"
import {HeartOutlined, PlayCircleOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {Artists, HighlightText, PlayStatus} from "@/components"
import {useGetSongInfo} from "@/store/player"
import VirtualList from "rc-virtual-list"
import {ISearchSongItem} from "@/api/search"
import classNames from "classnames"
import {ComponentProps} from "./index"

const Single = (props: ComponentProps<ISearchSongItem>) => {
  const {data, height = 0, onScroll, keywords} = props

  console.log("heoght", height)

  const getSongInfo = useGetSongInfo()

  return (
    <Flex vertical gap={12}>
      <Flex align="center" gap={12}>
        <div className="w-[6%]"></div>
        <div className=" w-[49%]">音乐标题</div>
        <div className="w-[20%]">歌手</div>
        <div className=" w-[20%]">专辑</div>
        <div className=" w-[5%] ">时长</div>
      </Flex>
      <VirtualList
        fullHeight
        itemHeight={40}
        height={height}
        data={data!}
        styles={{verticalScrollBarThumb: {display: "none"}}}
        onScroll={onScroll}
        itemKey="id">
        {(item: ISearchSongItem, index) => {
          return (
            <Flex
              key={item.id}
              onClick={() => getSongInfo(item.id)}
              align="center"
              gap={12}
              className={classNames(
                {"bg-[#F9F9F9]": index % 2 === 0},
                "h-[40px]",
                "hover:bg-[#EEEFF0]"
              )}>
              <Flex justify="space-between" className="w-[6%]" gap={8}>
                <PlayStatus id={item.id} className=" pl-[12px]">
                  <span className="pl-[12px] flex-1 text-right">{Utils.generateIndex(index)}</span>
                </PlayStatus>
                <HeartOutlined />
              </Flex>
              <Flex gap={4} align="center" className=" w-[49%]">
                <HighlightText content={item.name} pattern={new RegExp(keywords, "g")} />
                <Flex flex={1} align="center">
                  {item.alia?.length !== 0 && (
                    <span className="text-[#878888]  line-clamp-1">{`(${item?.alia?.join()})`}</span>
                  )}
                  {item?.sq && (
                    <Tag
                      className="!px-[2px] !leading-[14px] !text-[12px]"
                      color="red"
                      bordered={false}>
                      SQ
                    </Tag>
                  )}
                  {!!item?.mv && (
                    <PlayCircleOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        history.push(`/mv-detail?mvid=${item.mv}&type=0`)
                      }}
                      className="text-[#C82D2D]"
                    />
                  )}
                </Flex>
              </Flex>
              <div className="w-[20%]">
                <Artists data={item?.ar} />
              </div>
              <div className=" w-[20%] text-[#525353] hover:text-[#252526] cursor-pointer">
                {item?.al?.name}
              </div>
              <div className="w-[5%] text-[#ADADAE]">{Utils.formatSeconds(item?.dt)}</div>
            </Flex>
          )
        }}
      </VirtualList>
    </Flex>
  )
}

export default Single
