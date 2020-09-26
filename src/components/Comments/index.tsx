/** @format */

import React, {FC} from "react"
import {List, Button, Avatar, Divider, Space} from "antd"
import {PaginationProps} from "antd/lib/pagination"
import {RightOutlined, ShareAltOutlined, CommentOutlined, LikeOutlined} from "@ant-design/icons"
import classnames from "classnames"
import moment from "moment"
import styles from "./index.scss"

export interface Iparams {
  type:number
  id: number
  pageSize: number
  current: number
  before: number
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
export interface IHotComments {
  user: {
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
  beReplied: IBeReplied[]
  pendantData: {
    id: number
    imageUrl: string
  }
  showFloorComment: null
  status: number
  commentId: number
  content: string
  time: number
  likedCount: number
  expressionUrl: any
  commentLocationType: number
  parentCommentId: number
  decoration: any
  repliedMark: any
  liked: boolean
}

export interface IData {
  total: number
  isMusician: boolean
  cnum: number
  userId: number
  topComments: any[]
  moreHot: false
  hotComments: IHotComments[]
  commentBanner: any
  comments: IHotComments[]
}

interface IComments {
  type: number
  data: IData
  pagination?: PaginationProps
}

const Comments: FC<IComments> = ({data, pagination, type}) => {
  const renderItem = (item: IHotComments) => (
    <List.Item key={item.commentId}>
      <List.Item.Meta
        avatar={<Avatar src={item.user.avatarUrl} />}
        title={
          <div className={styles.content}>
            <i className={styles.nickname}>{item.user.nickname}:</i>
            <span>{item.content}</span>
          </div>
        }
        description={
          <>
            {item.beReplied.length !== 0 ? (
              <>
                {item.beReplied.map((items) => (
                  <div
                    className={classnames(styles.content, styles.otherContent)}
                    key={items.beRepliedCommentId}>
                    <i className={styles.nickname}>@{items.user.nickname}:</i>
                    <span>{items.content}</span>
                  </div>
                ))}
              </>
            ) : null}
            <div className={styles.footer}>
              <p className={styles.time}>{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</p>
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
  const showMore = type === 0 && data?.moreHot
  return (
    <List
      dataSource={type === 0 ? data?.hotComments : data?.comments}
      className={styles.commentList}
      pagination={pagination}
      footer={
        showMore ? (
          <div className={styles.more}>
            <Button shape="round">
              更多精彩评论
              <RightOutlined />
            </Button>
          </div>
        ) : null
      }
      renderItem={renderItem}
    />
  )
}
Comments.defaultProps = {
  type: 0
}

export default Comments
