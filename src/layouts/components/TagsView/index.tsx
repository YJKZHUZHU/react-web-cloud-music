/** @format */

import { Flex, Tag } from "antd"
import { FC, useEffect, useState } from "react"
import { useLocation, history, useRouteProps } from "@umijs/max"
import { ITagItem, MAP_TAGS_VIEWS, MenuKeyEnum } from "@/constants/layout"

interface IProps {
  selectKeys: MenuKeyEnum[]
}
const TagsView: FC<IProps> = ({ selectKeys }) => {
  const selectKey = selectKeys[0] || ""
  const location = useLocation()
  const [tagsData, setTagsData] = useState<ITagItem[]>([])

  const [selectedTag, setSelectedTag] = useState<string>(location.pathname)
  const handleChange = (tag: ITagItem) => {
    if (tag.key === selectedTag) return
    setSelectedTag(tag.path)
    history.push(tag.path)
  }
  useEffect(() => {
    setTagsData(MAP_TAGS_VIEWS.get(selectKey) || [])

  }, [selectKey])
  useEffect(() => {
    setSelectedTag(location.pathname)
  }, [location.pathname])
  if (tagsData.length === 0) return <></>
  return (
    <div className="h-[60px] flex ml-[24px]">
      <Flex gap={4} wrap="nowrap" align="center">
        {tagsData.map<React.ReactNode>((tag) => (
          <Tag.CheckableTag
            className="w-[100px] !h-[34px] !rounded-[1000px] !leading-[34px] !text-center"
            key={tag.path}
            checked={tag.path === selectedTag}
            onChange={() => handleChange(tag)}>
            {tag.label}
          </Tag.CheckableTag>
        ))}
      </Flex>
    </div>
  )
}

export default TagsView
