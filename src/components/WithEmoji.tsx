/** @format */

import {useMemo} from "react"
import {getEmojiUrl} from "@/help/emoji"
import classNames from "classnames"

interface Props {
  content: string
  className?: string
}
const WithEmoji = (props: Props) => {
  const {content, className} = props
  const emojiText = useMemo(() => {
    const regex = /\[([^\]]+)\]/g

    return content.replace(regex, (match, capturedGroup, ...rest) => {
      const src = getEmojiUrl(capturedGroup)
      if (!src) return match
      return `<img alt="${src}" class="h-[16px] w-[16px] inline-block align-middle self-center"  src="${src}"></img>`
    })
  }, [content])

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{__html: emojiText}}></span>
  )
}

export default WithEmoji
