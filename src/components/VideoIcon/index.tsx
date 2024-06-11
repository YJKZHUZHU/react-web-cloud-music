/** @format */

import {CaretRightOutlined} from "@ant-design/icons"
import {history} from "@umijs/max"
import {Tag} from "@/components"
import {MouseEventHandler} from "react"

interface Props {
  id: string | number
  type?: "mv" | "video"
}

const VideoIcon = (props: Props) => {
  const {id, type = "mv"} = props
  if (!id) return null

  const onLink: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (type === "mv") {
      return history.push(`/mv-detail/${id}`)
    }
    return history.push(`/video-detail/${id}`)
  }
  return (
    <Tag className="cursor-pointer" onClick={onLink} borderColor="#C82D2D" color="#C62526">
      <CaretRightOutlined />
    </Tag>
  )
}

export default VideoIcon
