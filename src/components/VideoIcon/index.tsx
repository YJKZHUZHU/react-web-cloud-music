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
      onClick={() => history.push(`/recommend/video/mvDetail?mvid=${id}&type=${type}`)}
    />
  )
}

export default VideoIcon
