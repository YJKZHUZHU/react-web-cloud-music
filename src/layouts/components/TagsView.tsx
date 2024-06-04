/** @format */

import {Flex, Tag} from "antd"
import {FC, useEffect, useState} from "react"
import {useLocation, history} from "@umijs/max"
import {ITagItem, MAP_TAGS_VIEWS, MenuKeyEnum} from "@/constants/layout"
import classNames from "classnames"

interface IProps {
  selectKeys: MenuKeyEnum[]
}
const TagsView: FC<IProps> = ({selectKeys}) => {
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
    console.log("location", location.pathname)
    // if (tagsData.find((item) => item.path === location.pathname) === undefined) {
    //   setTagsData([])
    // } else {
    //   setSelectedTag(location.pathname)
    // }
    setSelectedTag(location.pathname)
  }, [location.pathname])
  if (tagsData.length === 0) return <></>
  return (
    <Flex className="h-[60px] ml-[24px]" flex={1} gap={20} wrap="nowrap" align="center">
      {tagsData?.map((item) => {
        const selected = item.path === selectedTag
        return (
          <div
            className={classNames(
              "cursor-pointer hover:text-[#000001] hover:font-bold",

              selected ? "text-[#000001] font-bold" : "text-[#515151] "
            )}
            onClick={() => handleChange(item)}
            key={item.path}>
            {item.label}
          </div>
        )
      })}
      {/* {tagsData.map<React.ReactNode>((tag) => (
        <Tag.CheckableTag
          className="w-[100px] !h-[34px] !rounded-[1000px] !leading-[34px] !text-center"
          key={tag.path}
          checked={tag.path === selectedTag}
          onChange={() => handleChange(tag)}>
          {tag.label}
        </Tag.CheckableTag>
      ))} */}
    </Flex>
  )
}

export default TagsView
