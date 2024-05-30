/** @format */

import {Flex, Spin} from "antd"

export default function () {
  return (
    <Spin spinning tip="Loading...">
      <Flex vertical className="" justify="center" align="center">
        <img alt="" src="/loading.png" width={500} />
        {/* <span>Loading....</span> */}
      </Flex>
    </Spin>
  )
}
