/** @format */

import {RightOutlined} from "@ant-design/icons"
import {Flex, Tag} from "antd"
import {useState} from "react"
import {history} from "@umijs/max"
import {ITagDataItem} from "./index"

interface Props {
  title: string
  tagData?: ITagDataItem[]
  defauluTag?: string
  onTag?: (item: ITagDataItem) => void
  onLink?: (tag: string) => void
}

const Top = (props: Props) => {
  const {title, tagData, defauluTag, onTag, onLink} = props

  const [activeTag, setActiveTag] = useState(defauluTag)

  const onTagChange = (item: ITagDataItem) => {
    if (activeTag === item.id) return
    setActiveTag(item.id)
    onTag && onTag(item)
  }

  const onTop = () => {
    if (onLink) return onLink(activeTag!)
    // history.push(`/mv-all?area=${activeTag}`)
  }

  return (
    <Flex align="center">
      <Flex
        onClick={onTop}
        align="center"
        gap={12}
        className="text-[#262626] font-bold hover:cursor-pointer hover:text-[#010102]">
        <span>{title}</span>
        <RightOutlined />
      </Flex>
      <Flex flex={1} justify="end">
        {tagData?.map((item) => {
          return (
            <Tag.CheckableTag
              checked={item.id === activeTag}
              onChange={() => onTagChange(item)}
              key={item.id}>
              {item.value}
            </Tag.CheckableTag>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default Top
