/** @format */

import {RightOutlined} from "@ant-design/icons"
import {FC} from "react"
import {Link} from "@umijs/max"
import classNames from "classnames"
import {Flex} from "antd"
import {history} from "@umijs/max"

interface IProps {
  title: string
  link: string
  className?: string
  titleClassName?: string
}
const Card: FC<IProps> = (props) => {
  const {children, title, link, className, titleClassName} = props
  const onLink = () => {
    history.push(link)
  }
  return (
    <Flex
      gap={16}
      vertical
      className={classNames("bg-[#ffffff] rounded-[20px] p-[16px]", className)}>
      <Flex justify="space-between" align="center" className={titleClassName}>
        <span className="text-[#7D829E] flex-1">{title}</span>
        <Flex
          onClick={onLink}
          align="center"
          gap={4}
          className="text-[#7D829E] hover:text-[#000000] text-[14px] cursor-pointer">
          <span>更多</span>
          <RightOutlined />
        </Flex>
      </Flex>
      {children}
    </Flex>
  )
}

export default Card
