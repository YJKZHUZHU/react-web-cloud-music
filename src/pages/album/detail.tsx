/** @format */

import React, {useContext} from "react"
import {AlbumContext} from "./index"
import styles from "./index.scss"

const AlbumDetail = () => {
  const {data} = useContext(AlbumContext)
  return (
    <div className={styles.detail}>
      <p className={styles.title}>专辑介绍</p>
      <p className={styles.desc}>{data?.album?.description}</p>
    </div>
  )
}

export default AlbumDetail
