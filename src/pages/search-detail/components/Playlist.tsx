/** @format */

import {Flex} from "antd"
import {history} from "@umijs/max"
import {HighlightText, Image} from "@/components"
import VirtualList from "rc-virtual-list"
import {MusicPlaylist} from "@/api/search"
import classNames from "classnames"
import {ComponentProps} from "./index"

const SongList = (props: ComponentProps<MusicPlaylist>) => {
  const {keywords, height, data, onScroll} = props

  return (
    <VirtualList
      fullHeight
      itemHeight={100}
      height={height}
      data={data!}
      styles={{verticalScrollBarThumb: {display: "none"}}}
      onScroll={onScroll}
      itemKey="id">
      {(item: MusicPlaylist, index) => {
        return (
          <Flex
            onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
            key={item.id}
            align="center"
            gap={12}
            justify="space-between"
            className={classNames(
              {"bg-[#F9F9F9]": index % 2 === 0},
              "h-[100px] px-[12px]",
              "hover:bg-[#EEEFF0] hover:cursor-pointer"
            )}>
            <Image
              src={item.coverImgUrl}
              size={[80, 80]}
              className=" rounded-[5px] h-[80px] w-[80px]"
              multiple={2}
              height={80}
              width={80}
            />

            <HighlightText
              className="flex-1"
              content={item.name}
              pattern={new RegExp(keywords!, "g")}
            />

            <span className="text-[#B0B2B2] mr-[24px]">{item.trackCount}首</span>

            <Flex align="center" className="text-[#B0B2B2] mr-[12px] w-[150px]" gap={4}>
              <span>by</span>
              <span className=" line-clamp-1">{item?.creator?.nickname}</span>
            </Flex>
          </Flex>
        )
      }}
    </VirtualList>
  )
}

export default SongList
