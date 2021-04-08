/** @format */

import React, {FC, useRef} from "react"
import {Button, Divider, Spin} from "antd"
import {EditOutlined, ReloadOutlined, LoadingOutlined, SyncOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import classnames from "classnames"
import API from "@/api"
import HotTopic from "./components/HotTopic"
import Dynamic from "./components/Dynamic"
import styles from "./index.scss"

const Friend: FC = (props) => {
  const dynamicRef = useRef(null)

  const {data, loading, reload, loadingMore} = useRequest(
    (params) => {
      return API.getEvent({pageSize: 30, lasttime: params?.lasttime || -1})
    },
    {
      loadMore: true,
      isNoMore: (d: any) => {
        return !d?.more
      },
      ref: dynamicRef,
      formatResult: (response) => {
        return {
          list: response.event || [],
          more: response.more,
          lasttime: response.lasttime
        }
      }
    }
  )
  return (
    <div className={styles.friend}>
      <div className={styles.top}>
        <span onClick={reload} className={styles.reload}>
          动态
          <SyncOutlined spin={loading} />
        </span>
        <Button type="primary" shape="round" icon={<EditOutlined />}>
          发表动态
        </Button>
      </div>
      <Divider />
      <div className={styles.container}>
        <div ref={dynamicRef} className={classnames("_dynamic", styles.left)}>
          <Spin spinning={loadingMore} tip="动态加载中。。。" className={styles.loading}>
            <Dynamic data={data?.list as any[]} loading={loadingMore} />
          </Spin>
        </div>
        <div className={styles.right}>
          <Divider type="vertical" className={styles.divider} />
          <HotTopic />
        </div>
      </div>
    </div>
  )
}

export default Friend
