/** @format */

import {Flex} from "antd"
import empty from "@/assets/empty.png"

interface Props {
  desc?: string
}
const Empty = (props: Props) => {
  const {desc = "暂无数据"} = props
  return (
    <Flex flex={1} vertical gap={8} align="center" justify="center">
      <img src={empty} width={100} />
      <span className="min-w-[100px] text-center text-[#535454]">{desc}</span>
    </Flex>
  )
}

export default Empty
