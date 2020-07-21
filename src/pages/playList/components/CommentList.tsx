/** @format */

import React, {useEffect, useState} from "react"
import {UserOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons"
import {Avatar, Divider, Pagination, Spin, message, Space} from "antd"
import {Link, history} from "umi"
import Utils from "@/help"
import API from "@/api"
import styles from "../index.scss"

interface ParamInterface {
  id: string | number
  limit?: number
  offset?: number
}

const CommentList = () => {
  const {listId} = history.location.query
  const [comments, setComments] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [loading, setLoadng] = useState(false)
  const initParam = {
    id: listId,
    limit: 10,
    offset: 0
  }
  const getComment = async (params: ParamInterface) => {
    setLoadng(true)
    try {
      const Ret = await API.comment(params)
      if (Ret.code !== 200) return message.info("评论获取失败，请稍后再试")
      setLoadng(false)
      setComments(Ret.comments)
      return setTotal(Ret.total)
    } catch (error) {
      setLoadng(false)
      return message.info("评论获取失败，请稍后再试")
    }
  }

  const onPage = (page: number) => {
    setCurrent(page)
    getComment({
      ...initParam,
      offset: (page - 1) * 10
    })
  }

  useEffect(() => {
    getComment(initParam)
  }, [])

  return (
    <Spin spinning={loading} tip="评论加载中...">
      <div className={styles.comment}>
        <h2>精彩评论</h2>
        <Divider style={{margin: "15px 0 10px 0"}} />
        <Space direction="vertical" style={{width: "100%"}}>
          {comments.map((item: any) => {
            return (
              <div key={item.commentId}>
                <div className={styles.content}>
                  <div className={styles.img}>
                    <Avatar src={item.user.avatarUrl} icon={<UserOutlined />} />
                  </div>
                  <div className={styles.right}>
                    <p className={styles.name}>
                      <Link to="/" className={styles.link}>
                        <span>{item.user.nickname}</span>:
                      </Link>
                      <span className={styles.title}>{item.content}</span>
                    </p>
                    <div className={styles.time}>
                      <span>{Utils.commentFormatTime(item.time)}</span>
                      <div className={styles.like}>
                        {item.liked ? (
                          <LikeFilled className={styles.likeIcon} />
                        ) : (
                          <LikeOutlined className={styles.likeIcon} />
                        )}
                        <i className={styles.number}>{item.likedCount}</i>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider style={{margin: "5px 0"}} />
              </div>
            )
          })}
          {comments.length !== 0 ? (
            <div className={styles.page}>
              <Pagination size="small" current={current} total={total} onChange={onPage} />
            </div>
          ) : null}
        </Space>
      </div>
    </Spin>
  )
}

export default CommentList
