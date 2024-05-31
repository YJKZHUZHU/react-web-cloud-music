/** @format */

import {Flex} from "antd"
import {MV_AREA, MV_SORT, MV_TYPE} from "@/constants/mv"

const tagList = [
  {
    title: "地区",
    list: MV_AREA,
    key: "地区"
  },
  {
    title: "类型",
    list: MV_TYPE,
    key: "类型"
  },
  {
    title: "排序",
    list: MV_SORT,
    key: "排序"
  }
]

export default function () {
  return (
    <Flex flex={1} gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      开发中
    </Flex>
  )
}
