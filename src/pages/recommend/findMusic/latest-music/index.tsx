/** @format */

import React, {useState} from "react"
import {Radio} from "antd"
import NewSongs from "./components/NewSongs"
import NewDisc from "./components/NewDisc"
import styles from "./index.scss"

const LatestMusic = () => {
  const [radioKey, setRadioKey] = useState<"new-songs" | "new-disc">("new-songs")

  return (
    <div className={styles._latestMusic}>
      <div className={styles.radioGroup}>
        <Radio.Group onChange={(e) => setRadioKey(e.target.value)} value={radioKey}>
          <Radio.Button value="new-songs">新歌速递</Radio.Button>
          <Radio.Button value="new-disc">新碟上架</Radio.Button>
        </Radio.Group>
      </div>
      {radioKey === "new-songs" ? <NewSongs /> : <NewDisc />}
    </div>
  )
}

export default LatestMusic
