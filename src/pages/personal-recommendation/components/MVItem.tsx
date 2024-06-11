/** @format */

import {IMvItem} from "@/store/personalRecommendation"
import {Flex} from "antd"
import {history} from "@umijs/max"
import classNames from "classnames"
import {Artists, Image, PlayVideoIcon} from "@/components"
import Utils from "@/help"
import {PlayCircleOutlined} from "@ant-design/icons"
import {useHover} from "@/hooks"

interface Props {
  data: IMvItem
}
const MVItem = (props: Props) => {
  const {data} = props

  const [hoverRef, isHovering] = useHover()

  return (
    <Flex
      vertical
      gap={8}
      key={data.id}
      onClick={() => history.push(`/mv-detail/${data.id}`)}
      className={classNames("relative w-[300px]")}>
      <div
        ref={hoverRef}
        className={classNames(
          "relative w-[300px] h-[150px] rounded-[4px] cursor-pointer overflow-hidden"
        )}>
        <Image width={300} height={150} src={data.picUrl} size={[300, 150]} multiple={2} />
        <PlayVideoIcon className={classNames(isHovering ? "opacity-1" : "opacity-0")} />
        <Flex
          align="center"
          justify="end"
          gap={5}
          className=" pr-[10px] w-full absolute right-0 text-[#ffffff] top-0 leading-[32px]">
          <PlayCircleOutlined />
          <span>{Utils.tranNumber(data.playCount, 2)}</span>
        </Flex>
        <div
          style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
          className={classNames(
            isHovering && "translate-y-0",
            "w-full text-[12px] absolute leading-[16px] p-[4px] left-0 right-0 top-0 translate-y-[-100%] transition-all text-[#ffffff]"
          )}>
          {data.copywriter}
        </div>
      </div>
      <Flex vertical gap={4}>
        <span className="line-clamp-1 leading-[16px] cursor-pointer">{data.name}</span>
        <Artists data={data.artists} />
      </Flex>
    </Flex>
  )
}

export default MVItem
