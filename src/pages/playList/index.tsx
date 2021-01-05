/** @format */

import React, {useState} from "react"
import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined
} from "@ant-design/icons"
import {Divider, Button, Tabs, Input, Space} from "antd"
import {Link, history} from "umi"
import moment from "moment"
import {HotComment, NewComment} from "@/components"
import {ListTable, Collection} from "./components"
import usePlayList from "./hooks/usePlayList"
import Utils from "@/help"
import styles from "./index.scss"

const {TabPane} = Tabs
const {Search} = Input

const PlayList = () => {
  const {listId: id} = history.location.query
  const {
    isSearch,
    toggle,
    data,
    tableList,
    loading,
    onPlayAll,
    label,
    commentTabContent
  } = usePlayList(id)
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className={styles._playList}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src={data?.creator.backgroundUrl} alt={data?.creator.backgroundUrl} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <div className={styles.markTitle}>
              <span className={styles.colorLabel}>歌单</span>
              <h2 className={styles.markTitle}>{data?.name}</h2>
            </div>
            <div className={styles.songIntroduction}>
              <p>
                <span>歌曲数</span>
                <span className={styles.number}>{data?.trackCount}</span>
              </p>
              <Divider type="vertical" className={styles.divider} />
              <p>
                <span>播放数</span>
                <span className={styles.number}>{Utils.tranNumber(+data?.playCount, 0)}</span>
              </p>
            </div>
          </div>
          <div className={styles.creator}>
            <div className={styles.link}>
              <img src={data?.creator.avatarUrl} alt={data?.creator.avatarUrl} />
            </div>
            <span className={styles.name}>{data?.creator.nickname}</span>
            <span className={styles.time}>
              {moment(data?.createTime).format("YYYY-MM-DD")}
              <i style={{paddingLeft: 5}}>创建</i>
            </span>
          </div>
          <Space className={styles.btnGroup}>
            <Button onClick={onPlayAll} type="primary">
              <PlayCircleOutlined />
              播放全部
              <PlusOutlined />
            </Button>
            <Button type="primary">
              {data?.subscribed ? <CheckOutlined /> : <FolderAddOutlined />}
              {data?.subscribed ? "已收藏" : "收藏"}({Utils.tranNumber(data?.subscribedCount, 0)})
            </Button>
            <Button type="primary">
              <ShareAltOutlined />
              分享({Utils.tranNumber(data?.shareCount, 0)})
            </Button>
          </Space>
          {label && (
            <div className={styles.label}>
              <p>标签：</p>
              <div>
                {label.map((item: any, index: number) => {
                  return (
                    <span key={item}>
                      <Link to="/" className={styles.link}>
                        {item}
                        {index + 1 === label.length ? null : "/"}
                      </Link>
                    </span>
                  )
                })}
              </div>
            </div>
          )}
          <p className={styles.introduction}>
            <b>简介：</b>
            {data?.description}
          </p>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          isSearch && (
            <Search placeholder="搜索歌单音乐" onChange={(e) => setSearchValue(e.target.value)} />
          )
        }
        className={styles.tabs}
        tabBarStyle={{margin: 0}}
        onChange={(key) => toggle(+key === 1)}>
        <TabPane tab="歌曲列表" key="1">
          <ListTable data={tableList} loading={loading} searchValue={searchValue} />
        </TabPane>
        <TabPane tab={commentTabContent} key="2">
          <HotComment type={2} id={id} />
          <NewComment type={2} id={id} />
        </TabPane>
        <TabPane tab="收藏者" key="3">
          <Collection subscribedCount={data?.subscribedCount} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PlayList
