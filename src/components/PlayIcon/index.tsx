/** @format */

import React, {HtmlHTMLAttributes, HTMLAttributes, FC} from "react"
import {PlaySquareOutlined} from "@ant-design/icons"
import classnames from "classnames"
import styles from "./index.scss"

interface PlayIconProps {
  iconStyle?: React.StyleHTMLAttributes<HTMLElement>
  iconClassName: string
}

type Props = PlayIconProps & React.HTMLAttributes<HTMLElement>

const PlayIcon: FC<Props> = (props) => {
  const {iconStyle, iconClassName, ...rest} = props
  const classes = classnames(styles.playIcon, iconClassName)

  return (
    <span className={classes} style={iconStyle}>
      <PlaySquareOutlined {...rest} />
    </span>
  )
}

export default PlayIcon
