import React, {FC, useState, useEffect} from 'react'
import API from '@/api'
import {Tabs} from 'antd'

type Props = {
  location: any
}
const {TabPane} = Tabs

const SearchDetail: FC<Props> = (props) => {
  const {keywords, type} = props.location.query
  const [activeKey, setActiveKey] = useState('1')
  useEffect(() => {
    setActiveKey(String(+type))
    API.getSearchByType({
      keywords,
      type,
      limit: 30,
      offset: 0,
      loading: true
    }).then((res: any) => {
      console.log(res)
    })
  }, [keywords, type])

  const onTab = () => {

  }
  //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={onTab}>
        <TabPane tab="单曲" key="1">
          1
        </TabPane>
        <TabPane tab="歌手" key="100">
          100
        </TabPane>
        <TabPane tab="专辑" key="10">
          10
        </TabPane>
        <TabPane tab="视频" key="1014">
          1014
        </TabPane>
        <TabPane tab="歌单" key="1000">
          100
        </TabPane>
        {/*<TabPane tab="歌词" key="3">*/}
        {/*  Content of Tab Pane 3*/}
        {/*</TabPane>*/}
        {/*<TabPane tab="主播电台" key="3">*/}
        {/*  Content of Tab Pane 3*/}
        {/*</TabPane>*/}
        <TabPane tab="用户" key="1002">
          1002
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SearchDetail
