/** @format */

import {Button, Flex} from "antd"
import {FC, useEffect, useState} from "react"
import {useLocation, history} from "@umijs/max"
import {ITagItem, MAP_TAGS_VIEWS, MenuKeyEnum, TAG_LIST} from "@/constants/layout"
import classNames from "classnames"
import {useActiveMenu} from "@/store/app"
import {EditOutlined} from "@ant-design/icons"

const TagsView: FC = () => {
  const location = useLocation()
  const [tagsData, setTagsData] = useState<ITagItem[]>([])
  const activeMenu = useActiveMenu()

  const [selectedTag, setSelectedTag] = useState<string>(location.pathname)

  const handleChange = (tag: ITagItem) => {
    if (tag.key === selectedTag) return
    setSelectedTag(tag.path)
    history.push(tag.path)
  }

  useEffect(() => {
    const result = TAG_LIST.filter((item) => item.parentKey === activeMenu)
    setTagsData(result)
    if (result.length !== 0) {
      if (location.pathname === result.at(0)?.path) {
        setSelectedTag(result.at(0)?.path!)
      } else {
        setSelectedTag(location.pathname)
      }
    }
  }, [activeMenu])

  // if (tagsData.length === 0) return <></>

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
      {selectedTag === "/attention" && (
        <Button type="primary" shape="round" icon={<EditOutlined />}>
          发动态
        </Button>
      )}
    </Flex>
  )
}

export default TagsView
