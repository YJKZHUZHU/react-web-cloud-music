/** @format */

import { Flex, Tag } from "antd"
import { useEffect, useState } from "react"
import { useLocation, history,useRouteProps } from "@umijs/max"
import { ITagItem, MAP_TAGS_VIEWS } from "@/constants/layout"

const TagsView = () => {
  const location = useLocation()
  const routeProps = useRouteProps()
  // routeProps.parentKey
  const [tagsData, setTagsData] = useState<ITagItem[]>(MAP_TAGS_VIEWS.get(routeProps.parentKey) || [])

  const [selectedTag, setSelectedTag] = useState<string>(location.pathname)
  const handleChange = (tag: ITagItem) => {
    if (tag.key === selectedTag) return
    setSelectedTag(tag.path)
    history.push(tag.path)
  }
  useEffect(() => {
    console.log("useLocation",tagsData, location)
    if (tagsData.length !== 0 && selectedTag.includes(location.pathname)) {
      return
    }
    // if (MAP_TAGS_VIEWS.has(location.pathname)) {
    //   console.log('ssss', location.pathname)
    //   setTagsData(MAP_TAGS_VIEWS.get(location.pathname))
    //   setSelectedTag(location.pathname)
    // } else {
    //   setTagsData([])
    //   setSelectedTag('')
    // }
  }, [location])
  if (tagsData.length === 0) return <></>
  return (
    <div className="h-[60px] flex">
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
