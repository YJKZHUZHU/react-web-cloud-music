/** @format */

import React, { useEffect, useState } from "react"
import { Skeleton, Space } from "antd"
import { useLocation } from "@umijs/max"
import styles from "./index.scss"

const INIT_ROWS = Math.floor((document.body.clientHeight - 130) / 36)

const Loading = () => {
  const location = useLocation()
  const [rows, setRows] = useState(INIT_ROWS)
  useEffect(() => {
    const resetRows = () => {
      setRows(Math.floor((document.body.clientHeight - 130) / 36))
    }
    document.addEventListener("resize", resetRows)
    return document.removeEventListener("resize", resetRows)
  })


  if (location.pathname !== "/recommend/findmusic/personal-recommendation") {
    return "Loading..."
  }

  return (
    <div className={styles.loadingHome}>
      <header>
        <Skeleton.Input className={styles.left} active size="large" />
        <div className={styles.right}>
          <Skeleton.Input style={{ width: 100 }} active size="large" />
          <Skeleton.Input style={{ width: 300 }} active size="large" />
          <Space>
            <Skeleton.Avatar active size="large" />
            <Skeleton.Input style={{ width: 100 }} active size="large" />
          </Space>
          <Skeleton.Avatar active size="large" />
        </div>
      </header>
      <main>
        <aside>
          <Skeleton active paragraph={{ rows }} />
        </aside>
        <article>
          <Skeleton active paragraph={{ rows }} />
        </article>
      </main>
      <footer>
        <Skeleton.Input className={styles.left} active size="large" />
        <div className={styles.right}>
          <Space size={20}>
            <Skeleton.Avatar active size="large" />
            <Skeleton.Avatar active size="large" />
            <Skeleton.Avatar active size="large" />
          </Space>
          <Skeleton.Input style={{ width: 200 }} active size="large" />
          <Space>
            <Skeleton.Input style={{ width: 200 }} active size="large" />
            <Skeleton.Avatar active size="large" />
          </Space>
        </div>
      </footer>
    </div>
  )
}

export default Loading
