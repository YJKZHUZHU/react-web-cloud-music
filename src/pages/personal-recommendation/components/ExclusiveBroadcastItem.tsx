/** @format */

import {IPrivateContentItem} from "@/store/personalRecommendation"
import {Flex} from "antd"
import {Image, PlayVideoIcon} from "@/components"
import {history} from "@umijs/max"
import {useHover} from "@/hooks"
import classNames from "classnames"

interface Props {
  data: IPrivateContentItem
}
const ExclusiveBroadcastItem = (props: Props) => {
  const {data} = props

  const [hoverRef, isHovering] = useHover()

  const onLink = () => {
    let result = ""
    if (+data.type === 5) {
      result = `/mv-detail/${data.id}`
    }
    if (+data.type === 24) {
      result = `/video-detail/${data.videoId}`
    }
    return history.push(result)
  }

  return (
    <Flex gap={16} key={data.id} onClick={onLink}>
      <div ref={hoverRef} className="rounded-[5px] relative cursor-pointer">
        <Image width={300} src={data.picUrl} size={[300, 300]} multiple={2} />
        <PlayVideoIcon className={classNames(isHovering ? "opacity-1" : "opacity-0")} />
      </div>
      <span className="flex-1 line-clamp-2 leading-[20px]">{data.name}</span>
    </Flex>
  )
}

export default ExclusiveBroadcastItem
