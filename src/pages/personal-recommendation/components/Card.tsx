/** @format */

import {RightOutlined} from "@ant-design/icons"
import {FC} from "react"
import {Link} from "@umijs/max"
import classNames from "classnames"

interface IProps {
  title: string
  link: string
  className?: string
}
const Card: FC<IProps> = (props) => {
  const {children, title, link, className} = props
  return (
    <div className={classNames("bg-[#ffffff] rounded-[20px] p-[16px]", className)}>
      <div className="flex justify-between items-center mb-[16px]">
        <span className="text-[#7D829E]">{title}</span>
        <Link to={link} className=" text-[#7D829E] text-[14px] ">
          <div className="flex items-center gap-[4px]">
            <span>更多</span>
            <RightOutlined />
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Card
