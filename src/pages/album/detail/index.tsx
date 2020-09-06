/** @format */

import React, {FC} from "react"
import styles from "./index.scss"

interface IDetail {
  data: string
}

const Detail: FC<IDetail> = ({data}) => {
  return (
    <div className={styles.detail}>
      <p className={styles.title}>专辑介绍</p>
      <p className={styles.desc}>{data}</p>
    </div>
  )
}

export default Detail
