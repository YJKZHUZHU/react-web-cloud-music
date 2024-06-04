/** @format */

import classNames from "classnames"
import {FC} from "react"

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: string
  borderColor?: string
}
const Tag: FC<Props> = (props) => {
  const {color = "#FA5025", borderColor = "#FA906D", children, className, ...rest} = props

  return (
    <div
      {...rest}
      style={{border: `1px solid ${borderColor}`, color}}
      className={classNames(
        className,
        " w-max h-[16px] px-[2px] py-[2px] text-[12px] leading-[12px]  rounded-[4px] bg-transparent"
      )}>
      {children}
    </div>
  )
}

export default Tag
