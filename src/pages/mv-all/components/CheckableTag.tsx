/** @format */

import {Flex, Tag} from "antd"
import {useState} from "react"

interface IDataItem {
  id: string
  value: string
}
interface Props {
  data: IDataItem[]
  defauluTag: string
  loading?: boolean
  onTag?: (item: IDataItem) => void
}

const CheckableTag = (props: Props) => {
  const {data, defauluTag, onTag, loading} = props
  const [activeTag, setActiveTag] = useState(defauluTag)

  const onTagChange = (item: IDataItem) => {
    if (activeTag === item.id || loading) return
    setActiveTag(item.id)
    onTag && onTag(item)
  }
  return (
    <Flex flex={1}>
      {data?.map((item) => {
        return (
          <Flex key={item.id} className=" w-[80px]">
            <Tag.CheckableTag checked={item.id === activeTag} onChange={() => onTagChange(item)}>
              {item.value}
            </Tag.CheckableTag>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default CheckableTag
