/** @format */

import React, {FC} from "react"
import {List, Avatar, Divider} from "antd"
import {ShareAltOutlined, CommentOutlined, LikeOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import classnames from "classnames"
import moment from "moment"
import API from "@/api"
import {IComments, ICommentsProps} from "@/components"
import styles from "./index.scss"

const NewComment: FC<ICommentsProps> = (props) => {
  const {type, id} = props
  // sortType:99 推荐排序 2 热度排序 3 时间排序
  const {data, pagination, loading} = useRequest(
    ({current, pageSize}) =>
      API.getNewComment({
        type,
        id,
        pageNo: current,
        pageSize,
        sortType: 2
      }),
    {
      paginated: true,
      refreshDeps: [type, id],
      formatResult: (response) => {
        return {
          list: response.code === 200 ? response?.data?.comments : [],
          total: response.code === 200 ? response?.data?.totalCount : 0
        }
      }
    }
  )

  return (
    <List
      loading={loading}
      locale={{emptyText: "暂无评论"}}
      header={<span className={styles.title}>最新评论({pagination?.total})</span>}
      dataSource={data?.list}
      className={styles.newComment}
      pagination={{...(pagination as any), size: "small"}}
      renderItem={(item: IComments) => (
        <List.Item key={item.commentId}>
          <List.Item.Meta
            avatar={<Avatar src={item?.user?.avatarUrl} />}
            title={
              <div className={styles.content}>
                <i className={styles?.nickname}>{item?.user?.nickname}:</i>
                <span>{item.content}</span>
              </div>
            }
            description={
              <>
                {item?.beReplied && (
                  <>
                    {item?.beReplied?.map((items) => (
                      <div
                        className={classnames(styles.content, styles.otherContent)}
                        key={items.beRepliedCommentId}>
                        <i className={styles.nickname}>@{items.user.nickname}:</i>
                        <span>{items.content}</span>
                      </div>
                    ))}
                  </>
                )}
                <div className={styles.footer}>
                  <p className={styles.time}>{moment(item?.time).format("YYYY-MM-DD HH:mm:ss")}</p>
                  <div>
                    <LikeOutlined />({item?.likedCount})
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
NewComment.defaultProps = {
  type: 0
}

export default NewComment
