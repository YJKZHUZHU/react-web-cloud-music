/** @format */

import {useState, FC} from "react"
import {Tabs, Spin, Flex, TabsProps} from "antd"
import {useVirtualListHeight} from "@/hooks"
import {TabEnum, MapTab} from "@/constants/collect"
import {Album, Singer, Video} from "./components"

const Collect: FC = () => {
  const [activeTab, setTabKey] = useState(TabEnum.album)

  const virtualListHeight = useVirtualListHeight(80)

  const [albumCount, setAlbumCount] = useState(0)
  const [singerCount, setSingerCount] = useState(0)
  const [videoCount, setVideoCount] = useState(0)

  const [loading, setLoading] = useState(false)

  const callback = (activeKey: string) => {
    setTabKey(activeKey as TabEnum)
  }

  const commonProps = {
    loading,
    setLoading,
    virtualListHeight
  }

  const items: TabsProps["items"] = [
    {
      key: MapTab.get(TabEnum.album)!.key,
      label: !!albumCount ? `专辑(${albumCount})` : MapTab.get(TabEnum.album)!.label,
      children: <Album {...commonProps} getCount={setAlbumCount} />,
      disabled: loading
    },
    {
      key: MapTab.get(TabEnum.singer)!.key,
      label: !!singerCount ? `歌手(${singerCount || 0})` : MapTab.get(TabEnum.singer)!.label,
      children: <Singer {...commonProps} getCount={setSingerCount} />,
      disabled: loading
    },
    {
      key: MapTab.get(TabEnum.video)!.key,
      label: !!videoCount ? `视频(${videoCount || 0})` : MapTab.get(TabEnum.video)!.label,
      children: <Video {...commonProps} getCount={setVideoCount} />,
      disabled: loading
    }
  ]

  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex flex={1} vertical gap={24} className=" bg-[#ffffff] rounded-[20px] px-[16px] pb-[16px]">
        <Tabs activeKey={activeTab} onChange={callback} items={items}></Tabs>
      </Flex>
    </Spin>
  )
}

export default Collect
