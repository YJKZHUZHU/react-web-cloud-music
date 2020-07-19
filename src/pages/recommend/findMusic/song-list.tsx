/** @format */

import React, {useState} from "react"
import classnames from "classnames"
import {Row, Col} from "antd"
import API from "@/api"
import SongListChoose from "./components/SongListChoose.tsx"
import CatCard from "./components/CatCard"
import styles from "./index.scss"

const classes = classnames(styles.songList, "catPopoverTag")

const SongList = () => {
  const [data, setData] = useState<any[]>([])
  const getHighquality = async (cat: string) => {
    try {
      const Ret = await API.getHighQuality({limit: 30, cat})
      setData([])
      if (Ret.code !== 200 || Ret.playlists.length === 0) return
      return setData(Ret.playlists)
    } catch (error) {
      return error
    }
  }
  const onTag = (value: string) => {
    getHighquality(value)
  }

  return (
    <div className={classes}>
      <SongListChoose getTag={onTag} />
      <Row gutter={24} className={styles.catItem}>
        {data.map((item) => (
          <Col key={item.id} xxl={{span: 4}} xl={{span: 6}}>
            <CatCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SongList
