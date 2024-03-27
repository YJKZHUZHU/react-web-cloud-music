/** @format */

import React, {FC, useState} from "react"
import {Popover, Tag, Button, Space, Divider} from "antd"
import {useBoolean, useRequest} from "ahooks"
import {PopoverContent, Card} from "./components"
import {RightOutlined} from "@ant-design/icons"
import API from "@/api"
import useVedio from "./hooks/useVedio"
import styles from "./index.scss"

const {CheckableTag} = Tag

const Video = () => {
  const {
    visible,
    toggle,
    selectTag,
    setSelectTag,
    vedioGroupListRequest,
    vedioCategoryListRequest,
    allVedioListRequest,
    onChecked,
    onAllVedio,
    vedioGroupRequset,
    loadMore,
    vedioListRequest
  } = useVedio()

  return (
    <div className={styles.vedioGroupList}>
      <div className={styles.top}>
        <Popover
          open={visible}
          onOpenChange={toggle}
          overlayClassName={styles.vedioGroupListPopover}
          content={
            <PopoverContent
              data={vedioGroupListRequest?.data}
              tag={selectTag}
              callback={onChecked}
            />
          }
          title={
            <CheckableTag onChange={onAllVedio} checked={selectTag === "全部视频"} key="全部视频">
              全部视频
            </CheckableTag>
          }
          placement="bottom"
          trigger="click">
          <Button shape="round" className={styles.chooseBtn}>
            {selectTag}
            <RightOutlined />
          </Button>
        </Popover>
        <div className={styles.rightContent}>
          <PopoverContent
            data={vedioCategoryListRequest?.data || []}
            tag={selectTag}
            callback={onChecked}
          />
        </div>
      </div>
      <Card loading={vedioListRequest?.loading} data={vedioListRequest?.data?.list} />
      <div className={styles.loadMore}>
        {!vedioListRequest?.loading && (
          <Button onClick={loadMore} loading={vedioListRequest?.loadingMore}>
            加载更多
          </Button>
        )}
      </div>
    </div>
  )
}

export default Video
