/** @format */

import React, {FC, useEffect, useState} from "react"
import API from "@/api"
import {List, Avatar, Spin, message, Button, Divider} from "antd"
import {LikeOutlined, CommentOutlined, ShareAltOutlined, RightOutlined} from "@ant-design/icons"
import moment from "moment"
import classnames from "classnames"
import styles from "../index.scss"

interface IProps {
  id: number
}

interface IUser {
  locationInfo: any
  liveInfo: any
  anonym: number
  avatarUrl: string
  authStatus: number
  experts: any
  vipRights: any
  userId: number
  userType: number
  nickname: string
  vipType: number
  remarkName: any
  expertTags: any
}
interface IBeReplied {
  //追加评论
  user: IUser
  beRepliedCommentId: number
  content: string
  status: number
  expressionUrl: any
}
interface IHotComments {
  user: IUser
  beReplied: IBeReplied[]
  pendantData: any
  showFloorComment: any
  status: number
  commentId: number
  content: string
  time: number
  likedCount: number
  expressionUrl: null
  commentLocationType: number
  parentCommentId: number
  decoration: any
  repliedMark: any
  liked: boolean
}

const PAGE_SIZE = 20

const MvComment: FC<IProps> = ({id}) => {
  const [hotComments, setHotComments] = useState<IHotComments | any[]>([])
  const [comments, setComments] = useState<IHotComments[] | any[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const getData = () => {
    API.getMvComment({id, limit: PAGE_SIZE}).then((res) => {
      if (res.code === 200) {
        setComments(res.comments)
        setHotComments(res.hotComments)
        return setTotal(res.total)
      }
      return message.info("评论获取失败，稍后再试")
    })
  }
  const onPage = async (page: number) => {
    setCurrent(page)
    setLoading(true)
    //单独获取最新评论
    const Ret = await API.getMvComment({
      id,
      limit: PAGE_SIZE,
      before: comments[comments.length - 1].time
    })
    setLoading(false)
    if (Ret.code === 200) {
      setComments(Ret.comments)
      return setTotal(Ret.total)
    }
    return message.info("评论获取失败，稍后再试")
  }
  const renderItem = (item: IHotComments) => (
    <List.Item key={item.commentId}>
      <List.Item.Meta
        avatar={<Avatar src={item.user.avatarUrl} />}
        title={
          <p className={styles.content}>
            <i className={styles.nickname}>{item.user.nickname}:</i>
            {item.content}
          </p>
        }
        description={
          <>
            {item.beReplied.length !== 0 ? (
              <>
                {item.beReplied.map((items) => (
                  <p
                    className={classnames(styles.content, styles.otherContent)}
                    key={items.beRepliedCommentId}>
                    <i className={styles.nickname}>@{items.user.nickname}:</i>
                    {items.content}
                  </p>
                ))}
              </>
            ) : null}
            <p></p>
            <div className={styles.footer}>
              <p>{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</p>
              <div>
                <LikeOutlined />({item.likedCount})
                <Divider type="vertical" />
                <ShareAltOutlined />
                <Divider type="vertical" />
                <CommentOutlined />
              </div>
            </div>
          </>
        }
      />
    </List.Item>
  )

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <p>精彩评论</p>
      <List
        dataSource={hotComments as IHotComments[]}
        className={styles.commentList}
        footer={
          <div className={styles.more}>
            <Button shape="round">
              更多精彩评论
              <RightOutlined />
            </Button>
          </div>
        }
        renderItem={renderItem}
      />
      <p>最新评论({total})</p>
      <Spin spinning={loading} tip="加载中...">
        <List
          dataSource={comments as IHotComments[]}
          className={styles.commentList}
          pagination={{
            total,
            current,
            onChange: onPage,
            pageSize: PAGE_SIZE, // 一次显示20条
            showSizeChanger: false,
            size: "small",
            style: {textAlign: "center"}
          }}
          renderItem={renderItem}
        />
      </Spin>
    </>
  )
}

export default MvComment
