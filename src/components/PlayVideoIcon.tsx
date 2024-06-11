/** @format */

import {CaretRightOutlined} from "@ant-design/icons"
import {AntdIconProps} from "@ant-design/icons/lib/components/AntdIcon"
import classNames from "classnames"
import {FC} from "react"

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  iconProps?: AntdIconProps
}
const PlayVideoIcon: FC<Props> = (props) => {
  const {className, iconProps, children, ...rest} = props
  const {className: iconClassName, ...iconRest} = iconProps || {}
  return (
    <div
      {...rest}
      className={classNames(
        className,
        " transition-all flex cursor-pointer justify-center align-middle absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] w-[40px] h-[40px] bg-[#A89A91]"
      )}>
      {children || (
        <CaretRightOutlined
          className={classNames(iconClassName, "text-[#C62627] text-[24px] ml-[5px]")}
          {...(iconRest as any)}
        />
      )}
    </div>
  )
}

export default PlayVideoIcon
