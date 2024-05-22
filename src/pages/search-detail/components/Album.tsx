/** @format */

import {Flex} from "antd"
import {history} from "@umijs/max"
import {Artists, HighlightText, Image} from "@/components"
import VirtualList from "rc-virtual-list"
import coverall from "@/assets/coverall.png"
import {AlbumItem} from "@/api/search"
import classNames from "classnames"
import {ComponentProps} from "./index"

const Album = (props: ComponentProps<AlbumItem>) => {
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
      {(item: AlbumItem, index) => {
        const alias = item.alias?.join("")
        return (
          <Flex
            onClick={() => history.push(`/album/${item.id}`)}
            key={item.id}
            align="center"
            gap={12}
            justify="space-between"
            className={classNames(
              {"bg-[#F9F9F9]": index % 2 === 0},
              "h-[100px] px-[12px]",
              "hover:bg-[#EEEFF0] hover:cursor-pointer"
            )}>
            <div
              style={{
                backgroundRepeat: "no-repeat",
                background: `url(${coverall})`,
                backgroundPosition: "-240px -248px"
              }}
              className=" rounded-[5px] w-[76px] h-[60px]">
              <Image
                className="cursor-pointer rounded-[5px] w-[60px] h-[60px]"
                height={60}
                width={60}
                size={[60, 60]}
                multiple={2}
                src={item.picUrl}
              />
            </div>

            <Flex align="center" gap={4} flex={1}>
              <HighlightText content={item.name} pattern={new RegExp(keywords!, "g")} />

              {alias && (
                <HighlightText
                  className="text-[#888888]"
                  content={`(${alias})`}
                  pattern={new RegExp(keywords!, "g")}
                />
              )}
            </Flex>
            <Artists className=" flex-1" data={item.artists} />
          </Flex>
        )
      }}
    </VirtualList>
  )
}
export default Album
