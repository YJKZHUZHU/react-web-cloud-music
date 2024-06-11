/** @format */

import {Flex, FlexProps, Spin} from "antd"
import {FC} from "react"
import {Empty} from "@/components"
import {useVirtualListHeight} from "@/hooks"

interface Props extends FlexProps {
  loading?: boolean
  empty?: boolean
  desc?: string
}
const Layout: FC<Props> = (props) => {
  const {children, loading, empty, desc, ...rest} = props
  const virtualListHeight = useVirtualListHeight()

  return (
    <Spin delay={200} className=" flex-1" spinning={loading} tip="Loading...">
      <Flex
        style={{minHeight: virtualListHeight}}
        flex={1}
        vertical
        className=" bg-[#ffffff] rounded-[20px] p-[16px]"
        {...rest}>
        {empty ? <Empty desc={desc} /> : <>{children}</>}
      </Flex>
    </Spin>
  )
}

export default Layout
