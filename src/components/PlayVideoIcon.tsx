/** @format */

import {CaretRightOutlined} from "@ant-design/icons"
import {AntdIconProps} from "@ant-design/icons/lib/components/AntdIcon"
import classNames from "classnames"
import {FC} from "react"

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  iconProps?: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >
}
const PlayVideoIcon: FC<Props> = (props) => {
  const {className, iconProps, children, ...rest} = props

  return (
    <div
      {...rest}
      className={classNames(
        "flex cursor-pointer justify-center align-middle absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] w-[40px] h-[40px] bg-[#A89A91]",
        className
      )}>
      {children || <CaretRightOutlined {...iconProps} className="text-[#C62627] text-[24px] ml-[5px]" />}
    </div>
  )
}

export default PlayVideoIcon
