/** @format */

import React, {FC} from "react"
import {List, Button, Avatar, Divider} from "antd"
import {RightOutlined, ShareAltOutlined, CommentOutlined, LikeOutlined} from "@ant-design/icons"
import classnames from "classnames"
import {useRequest} from "ahooks"
import Utils from "@/help"
import API from "@/api"
import {IComments, ICommentsProps} from "@/components"
import styles from "./index.scss"

const HotComments: FC<ICommentsProps> = (props) => {
  const {type, id} = props

  const {data, loading} = useRequest<any, any[], IComments[], IComments[]>(
    () => API.getHotComment({id, type, limit: 10}),
    {
      formatResult: (response) => response?.hotComments || [],
      refreshDeps: [type, id]
    }
  )

  if (data?.length === 0) return null

  return (
    <List
      loading={loading}
      locale={{emptyText: "暂无评论"}}
      header={<span className={styles.title}>精彩评论</span>}
      dataSource={data}
      className={styles.hotComments}
      footer={
        <div className={styles.more}>
          <Button shape="round">
            更多精彩评论
            <RightOutlined />
          </Button>
        </div>
      }
      renderItem={(item) => (
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
                  <p className={styles.time}>{Utils.commentFormatTime(item.time)}</p>
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
      )}
    />
  )
}

export default HotComments
