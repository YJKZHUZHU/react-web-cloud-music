/** @format */

import React, {FC} from "react"
import {PlaySquareOutlined} from "@ant-design/icons"
import {history} from "umi"

interface IVideoIconProps {
  id: string | number
  type: number
}

const VideoIcon: FC<IVideoIconProps> = ({id, type}) => {
  if (!id) return null
  return (
    <PlaySquareOutlined
      onClick={() => history.push(`/mv-detail?mvid=${id}&type=${type}`)}
    />
  )
}

export default VideoIcon
