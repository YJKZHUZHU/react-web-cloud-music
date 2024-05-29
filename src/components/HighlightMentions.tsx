/** @format */

import classNames from "classnames"
import React, {useState, useEffect} from "react"

const HighlightMentions = ({text, className}: {text: string; className?: string}) => {
  const [highlightedText, setHighlightedText] = useState("")

  useEffect(() => {
    const regex = /@[\w\u4e00-\u9fa5]+/g
    const highlightedText = text.replace(regex, (match) => {
      return `<span class="text-[#406A9F] cursor-pointer hover:text-[#0E43A1]">${match}</span>`
    })
    setHighlightedText(highlightedText)
  }, [text])

  return (
    <div
      className={classNames("text-[#262626] leading-[18px] text-[14px]", className)}
      dangerouslySetInnerHTML={{__html: highlightedText}}
    />
  )
}

export default HighlightMentions
