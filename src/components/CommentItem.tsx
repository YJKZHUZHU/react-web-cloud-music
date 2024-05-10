/** @format */

import {Avatar, Flex} from "antd"
import {FC} from "react"
import {ICommentItem} from "@/types/comment"
import {
  CommentOutlined,
  CustomerServiceOutlined,
  LikeOutlined,
  ShareAltOutlined
} from "@ant-design/icons"
import {history} from "@umijs/max"
import Utils from "@/help"
import {WithEmoji} from "@/components"
import classNames from "classnames"

interface Props {
  data: ICommentItem
  className?: string
}
const CommentItem: FC<Props> = (props) => {
  const {data, className} = props
  return (
    <Flex className={classNames("p-[12px]", className)} key={data.time} gap={12}>
      <Avatar
        icon={<CustomerServiceOutlined />}
        size={50}
        shape="circle"
        alt="资源加载异常"
        src={`${data.user.avatarUrl}?param=30y30`}
      />
      <Flex flex={1} vertical gap={8}>
        <Flex align="center" gap={4}>
          <span
            onClick={() => history.push(`/homepage/${data.user.userId}`)}
            className="text-[#4CA0DD] text-[14px] leading-normal  cursor-pointer line-clamp-1">
            {data.user.nickname}
          </span>
          {data.user.vipRights?.associator?.iconUrl && (
            <img className="h-[14px]" src={data.user.vipRights?.associator?.iconUrl} />
          )}
        </Flex>
        <WithEmoji className="text-[#363D62] leading-[20px] text-[14px] flex gap-[4px]" content={data.content} />
        {data.beReplied?.length !== 0 && (
          <Flex vertical gap={8}>
            {data.beReplied?.map((items) => (
              <div className="bg-[#F2F2F2] p-[10px] rounded-[12px]" key={items.beRepliedCommentId}>
                <i
                  onClick={() => history.push(`/homepage/${items.user.userId}`)}
                  className="text-[#4CA0DD] pr-[4px] cursor-pointer">
                  @{items.user.nickname}:
                </i>
                <WithEmoji
                  className="text-[#363D62] leading-[20px] text-[14px] inline"
                  content={items.content}
                />
              </div>
            ))}
          </Flex>
        )}

        <Flex align="center">
          <span className="text-[#BABABD] leading-[22px] text-[14px]">
            {Utils.commentFormatTime(data.time)}
          </span>
          <Flex flex={1} justify="flex-end" gap={24}>
            <Flex align="center" gap={4} className="cursor-pointer">
              <LikeOutlined style={{color: "#7D829E"}} />
              <span className="text-[#363D62]">{data.likedCount}</span>
            </Flex>
            <ShareAltOutlined className="cursor-pointer" style={{color: "#7D829E"}} />
            <CommentOutlined className="cursor-pointer" style={{color: "#7D829E"}} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CommentItem
