/** @format */

import {history} from "@umijs/max"
import {Flex} from "antd"
import {HighlightText, Image} from "@/components"
import VirtualList from "rc-virtual-list"
import {IUserItem} from "@/api/search"
import classNames from "classnames"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"
import {ComponentProps} from "./index"

const User = (props: ComponentProps<IUserItem>) => {
  const {keywords, height, data, onScroll} = props

  const renderIdentity = (item: IUserItem) => {
    if (item?.avatarDetail) {
      return <span className="text-[#919191]">网易音乐人</span>
    }
    if (item.signature) {
      return <HighlightText content={item.signature} pattern={new RegExp(keywords!, "g")} />
    }
    return null
  }

  return (
    <VirtualList
      fullHeight
      itemHeight={100}
      height={height}
      data={data!}
      styles={{verticalScrollBarThumb: {display: "none"}}}
      onScroll={onScroll}
      itemKey="id">
      {(item: IUserItem, index) => {
        const isMan = item.gender === 1
        return (
          <Flex
            onClick={() => history.push(`/homePage/${item.userId}`)}
            key={item.userId}
            align="center"
            gap={12}
            justify="space-between"
            className={classNames(
              {"bg-[#F9F9F9]": index % 2 === 0},
              "h-[80px] px-[12px]",
              "hover:bg-[#EEEFF0] hover:cursor-pointer"
            )}>
            <div className=" relative">
              <Image
                src={item.avatarUrl}
                size={[60, 60]}
                className=" rounded-[50%] h-[60px] w-[60px]"
                multiple={2}
                height={60}
                width={60}
              />
              {item?.avatarDetail && (
                <img
                  className=" absolute bottom-[10px] right-0"
                  src={item?.avatarDetail?.identityIconUrl}
                  width={12}
                  height={12}
                />
              )}
            </div>

            <Flex align="center" gap={8} flex={1}>
              <HighlightText content={item.nickname} pattern={new RegExp(keywords!, "g")} />
              <img src={isMan ? man : woman} className="w-[12px] h-[12px]" alt="" />
            </Flex>
            {renderIdentity(item)}
          </Flex>
        )
      }}
    </VirtualList>
  )
}

export default User
