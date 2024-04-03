/** @format */

import React, {FC, useState, useEffect} from "react"
import {Space, Tag} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import classnames from "classnames"
import {useBoolean, useRequest} from "ahooks"
import {useToSearchDetail} from "@/hooks"
import store from "@/help/localStorage"
import API from "@/api"
import styles from "../index.scss"

interface IHistoryProps {
  onDelete: () => void
  onHistory: (keywords: string) => void
}

const History: FC<IHistoryProps> = (props) => {
  const {onDelete, onHistory} = props
  const toDetail = useToSearchDetail()
  const [visible, {toggle}] = useBoolean(false)
  const [historyList, setHistoryList] = useState(store.getValue("searchHistory") || [])

  const {data} = useRequest<any, any[], any[], any[]>(API.getHotList, {
    formatResult: (response) => {
      if (response.code === 200) {
        return response.data
      }
      return []
    }
  })

  const onClose = (items: any) => {
    const newHistory = historyList.filter((item: any) => item.id !== items.id)
    setHistoryList(newHistory)
    store.setValue("searchHistory", newHistory)
  }

  useEffect(() => {
    setHistoryList(store.getValue("searchHistory"))
  }, [store.getValue("searchHistory")?.length])

  return (
    (<div className={styles._searchContent}>
      <div className={styles.history}>
        <div className={styles.top}>
          <Space>
            <span>搜索历史</span>
            <DeleteOutlined onClick={onDelete} />
          </Space>
          {historyList?.length && (
            <span className={styles.all} onClick={() => toggle()}>
              {visible ? "收起" : "查看全部"}
            </span>
          )}
        </div>
        <div className={styles.tag}>
          {historyList?.map((item: any, index: number) => {
            return (index < 9 ? true : visible) ? (<Tag
              closable
              key={item.id}
              onClick={() => onHistory(item.keywords)}
              onClose={() => onClose(item)}
              className={styles.item}>
              {item.keywords}
            </Tag>) : null;
          })}
        </div>
      </div>
      <div className={styles.hot}>
        <p className={styles.title}>热搜榜</p>
        <ul>
          {data?.map((item, index) => {
            return (
              <li
                className={styles.item}
                key={item?.score * index}
                onClick={() => toDetail(1, item.searchWord)}>
                <div className={classnames(styles.number, {[styles.diff]: index < 3})}>{index}</div>
                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.song}>{item.searchWord}</span>
                    <span>{item.score}</span>
                    {item.iconUrl && (
                      <div className={styles.img}>
                        <img src={item.iconUrl} alt={item.iconUrl} />
                      </div>
                    )}
                  </div>
                  <span className={styles.bottom}>{item.content}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>)
  );
}

export default History
