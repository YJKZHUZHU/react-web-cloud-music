/** @format */

import {FC} from "react"
import classNames from "classnames"

interface IProps {
  title: string
  className?: string
}
const Card: FC<IProps> = (props) => {
  const {children, title, className} = props
  return (
    <div className={classNames("bg-[#ffffff] rounded-[20px] p-[16px]", className)}>
      <div className="text-[32px] font-[600]  mb-[20px] text-[#363D62]">{title}</div>
      {children}
    </div>
  )
}

export default Card
