/** @format */

import React, {useState, useEffect} from "react"
import {Tabs} from "antd"
import Album, {IAlbumData} from "./Album"
import Mv from "./Mv"
import Singer from "./Singer"
import {useHistory, useLocation} from "umi"
import {useRequest} from "ahooks"
import API from "@/api"
import styles from "./index.scss"

const {TabPane} = Tabs

interface IData {
  programCount: number
  djRadioCount: number
  mvCount: number
  artistCount: number
  newProgramCount: number
  createDjRadioCount: number
  createdPlaylistCount: number
  subPlaylistCount: number
  code: number
}

const INIT_DATA = {
  programCount: 0,
  djRadioCount: 0,
  mvCount: 0,
  artistCount: 0,
  newProgramCount: 0,
  createDjRadioCount: 0,
  createdPlaylistCount: 0,
  subPlaylistCount: 0,
  code: 200
}

const Collect = () => {
  const history = useHistory()
  const location = useLocation()
  const path =
    location.pathname.split("/").pop() === "collect" ? "album" : location.pathname.split("/").pop()
  const [key, setTabKey] = useState(path || "album")

  const {data, run} = useRequest<IData>(API.subCount, {
    manual: true,
    initialData: INIT_DATA
  })

  const {data: albumData, run: runAlbum, loading} = useRequest<IAlbumData>(API.albumSublist, {
    manual: true
  })

  const callback = (activeKey: string) => {
    setTabKey(activeKey)
    history.push(`/myMusic/collect/${activeKey}`)
  }

  useEffect(() => {
    run()
    runAlbum()
  }, [])

  return (
    <div className={styles._collect}>
      <Tabs activeKey={key} onChange={callback}>
        <TabPane tab={`专辑 ${albumData?.count || 0}`} key="album">
          <Album data={albumData as IAlbumData} loading={loading} />
        </TabPane>
        <TabPane tab={`歌手 ${data?.artistCount}`} key="singer">
          <Singer />
        </TabPane>
        <TabPane tab={`视频  ${data?.mvCount}`} key="mv">
          <Mv />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Collect
