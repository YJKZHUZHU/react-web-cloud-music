/** @format */

import {Flex, message} from "antd"
import classNames from "classnames"
import {history} from "@umijs/max"
import {Image, PlayVideoIcon} from "@/components"
import {CustomerServiceOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {useHover} from "@/hooks"
import {IRecommendItem} from "@/store/personalRecommendation"

interface Props {
  data: Partial<IRecommendItem>
}

const PlayListItem = (props: Props) => {
  const {data} = props
  const [hoverRef, isHovering] = useHover()

  const onLink = () => {
    if (data.id) {
      return history.push(`/playList/${data.id}`)
    }
    return message.info("开发中...")
  }
  return (
    <Flex
      onClick={onLink}
      key={data.id}
      gap={12}
      vertical
      style={{boxShadow: "0px 4px 28px 0px rgba(35, 29, 106, 0.1)"}}
      className={classNames(
        " pb-[12px] cursor-pointer relative bg-white rounded-[12px] w-[200px]"
      )}>
      <div ref={hoverRef} className="relative overflow-hidden  w-[200px] h-[200px]">
        <Image
          className=" h-[200px] w-[200px]"
          src={data.picUrl}
          size={[200, 200]}
          multiple={2}
          width={200}
          height={200}
        />
        {data.playcount && (
          <Flex
            align="center"
            style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
            className={classNames(
              {"translate-y-0": isHovering},
              "text-[14px] w-full h-[24px] absolute bottom-0 text-white pl-[15px]   translate-y-full transition-all rounded-[5px]"
            )}
            gap={4}>
            <CustomerServiceOutlined />
            <span>{Utils.tranNumber(data.playcount, 2)}</span>
          </Flex>
        )}

        {data.copywriter && (
          <div
            style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
            className={classNames(
              {"translate-y-0": isHovering},
              " rounded-[5px] text-[12px] min-h-[20px] w-full leading-[20px] text-[#ffffff] line-clamp-2 px-[6px] py-[4px]  absolute left-0 right-0 top-0 translate-y-[-100%] transition-all"
            )}>
            {data.copywriter}
          </div>
        )}

        <PlayVideoIcon className={classNames(isHovering ? "opacity-1" : "opacity-0")} />
      </div>

      <span className="text-[#7D829E] px-[8px] line-clamp-2  text-[14px] leading-[16px] h-[32px]">
        {data.name}
      </span>
    </Flex>
  )
}

export default PlayListItem
