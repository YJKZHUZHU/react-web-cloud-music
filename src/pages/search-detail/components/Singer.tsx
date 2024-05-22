/** @format */

import React from "react"
import {Flex} from "antd"
import {history} from "@umijs/max"
import {UserOutlined} from "@ant-design/icons"
import VirtualList from "rc-virtual-list"
import {MusicArtist} from "@/api/search"
import classNames from "classnames"
import {HighlightText, Image} from "@/components"
import {ComponentProps} from "./index"

const Singer = (props: ComponentProps<MusicArtist>) => {
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
      {(item: MusicArtist, index) => {
        const alias = item.alias?.join("")
        return (
          <Flex
            onClick={() => history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)}
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
              src={item.picUrl}
              size={[80, 80]}
              className=" rounded-[5px] h-[80px] w-[80px]"
              multiple={2}
              height={80}
              width={80}
            />
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

            {item.accountId && <UserOutlined className="text-[#EF3633] mr-[12px] cursor-pointer" />}
          </Flex>
        )
      }}
    </VirtualList>
  )
}

export default Singer
