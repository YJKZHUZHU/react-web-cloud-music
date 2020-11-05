/** @format */

import React, {useState} from "react"
import {Tabs} from "antd"
import List from "./components/List"

const {TabPane} = Tabs

const SingerList = () => {
  const [key, setKey] = useState("china")
  return (
    <Tabs activeKey={key} onChange={(key) => setKey(key)}>
      <TabPane tab="中国" key="china">
        <List type={1} />
      </TabPane>
      <TabPane tab="欧美" key="europeAndAmerica">
        <List type={2} />
      </TabPane>
      <TabPane tab="韩国" key="Korea">
        <List type={3} />
      </TabPane>
      <TabPane tab="日本" key="Japan">
        <List type={4} />
      </TabPane>
    </Tabs>
  )
}

export default SingerList
