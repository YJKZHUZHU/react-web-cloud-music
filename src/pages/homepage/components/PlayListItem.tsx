/** @format */

import {ISongListItem} from "@/store/user"
import {Flex} from "antd"
import {history} from "@umijs/max"
import {Image, PlayVideoIcon} from "@/components"
import {CaretRightOutlined, UserOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {useHover} from "@/hooks"
import classNames from "classnames"

interface Props {
  data: ISongListItem
}

const PlayListItem = (props: Props) => {
  const {data} = props
  const [hoverRef, isHovering] = useHover()

  return (
    <Flex
      ref={hoverRef}
      className="w-[170px]"
      key={data.id}
      onClick={() => history.push(`/playList/${data.id}?listId=${data.id}`)}
      vertical
      gap={8}>
      <div className=" relative cursor-pointer ">
        <Image
          height={170}
          width={170}
          className="w-[170px] h-[170px]"
          src={data.coverImgUrl}
          size={[170, 170]}
          multiple={2}
        />
        {data.playCount !== 0 && (
          <Flex
            gap={2}
            align="center"
            justify="end"
            className="text-[#ffffff] text-[14px] absolute w-full left-0  top-[8px] pr-[8px]">
            <CaretRightOutlined />
            <span>{Utils.tranNumber(data.playCount)}</span>
          </Flex>
        )}
        <PlayVideoIcon className={classNames(isHovering ? "opacity-1" : "opacity-0")} />
        <Flex
          gap={4}
          align="center"
          className="text-[#ffffff] absolute bottom-[10px] w-full px-[8px]">
          <UserOutlined className="text-[14px]" />
          <span className=" text-[14px] line-clamp-1">{data?.creator?.nickname}</span>
          <img
            alt=""
            className=" h-[12px]"
            src={`${data?.creator?.avatarDetail?.identityIconUrl}?param=12y12`}
          />
        </Flex>
      </div>
      <span className=" cursor-pointer text-[14px] line-clamp-2 text-[#333333] leading-[20px] hover:text-[#000000]">
        {data.name}
      </span>
    </Flex>
  )
}

export default PlayListItem
