/** @format */

import {VideoCameraOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {Flex} from "antd"
import {history} from "@umijs/max"
import {Artists, HighlightText, Image, Tag} from "@/components"
import VirtualList from "rc-virtual-list"
import {IVideoItem} from "@/api/search"
import classNames from "classnames"
import {ComponentProps} from "./index"
import styles from "../index.scss"

const Video = (props: ComponentProps<IVideoItem>) => {
  const {keywords, height, data, onScroll} = props

  const wrapData = Utils.chunkArray(data || [], 5)

  return (
    <VirtualList
      fullHeight
      itemHeight={180}
      height={height}
      data={wrapData!}
      className={classNames(styles.virtualList)}
      styles={{verticalScrollBarThumb: {display: "none"}}}
      onScroll={onScroll}
      itemKey="key">
      {(item: {key: number; list: IVideoItem[]}, index) => {
        return (
          <Flex key={index} wrap gap={24} className={classNames("h-[180px]")}>
            {item?.list?.map((item) => {
              const artists = item?.creator?.map((item) => ({name: item.userName, id: item.userId}))
              return (
                <Flex
                  className=" basis-[18%]"
                  onClick={() => history.push(`/mv-detail/${item?.vid}`)}
                  key={item.vid}
                  vertical
                  gap={4}>
                  <div className=" relative">
                    <Image
                      className="cursor-pointer rounded-[5px] h-[126px] w-full"
                      height={126}
                      width="100%"
                      src={item.coverUrl}
                    />
                    <span className=" absolute right-[8px] bottom-[8px] text-[#ffffff] text-[12px]">
                      {Utils.formatSeconds(item?.durationms)}
                    </span>
                    <Flex className=" absolute top-[4px] right-[8px]" gap={4} align="center">
                      <VideoCameraOutlined className="text-[#ffffff]" />
                      <span className="text-[#ffffff] text-[12px]">
                        {Utils.tranNumber(item.playTime, 2)}
                      </span>
                    </Flex>
                  </div>
                  <Flex align="center" gap={4}>
                    <Tag color="red">MV</Tag>
                    <HighlightText
                      className=" line-clamp-1"
                      content={item.title}
                      pattern={new RegExp(keywords, "g")}
                    />
                  </Flex>
                  <Artists data={artists} />
                </Flex>
              )
            })}
          </Flex>
        )
      }}
    </VirtualList>
  )
}

export default Video
