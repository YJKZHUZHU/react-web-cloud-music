import React, {FC, useEffect, useState} from 'react'
import {Avatar, Icon, Divider, Pagination} from 'antd'
import Link from 'umi/link'
import styles from '../index.scss'
import moment from 'moment'
import API from '@/api'

type Props = {
  location: any,
  subscribedCount?: number
}

interface ItemInterface {
  userId: string | number,
  avatarUrl: string,
  nickname: string | number
}

interface ParamInterface {
  id: string | number,
  limit?: number,
  offset?: number
}

const CommentList: FC<Props> = props => {
  const {listId} = props.location.query
  const [comments, setComments] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const initParam = {
    id: listId,
    limit: 60,
    offset: 1
  }
  const getComment = (params: ParamInterface) => {
    API.comment(Object.assign(params, {loading: true})).then((res: any) => {
      if (res.code === 200) {
        setComments(res.comments)
        setTotal(res.total)
      }
    })
  }

  const onPage = (page: number) => {
    setCurrent(page)
    getComment({
      id: listId,
      limit: 60,
      offset: page
    })
  }

  useEffect(() => getComment(initParam), [])

  return (
    <div className={styles.comment}>
      <h2>精彩评论</h2>
      <Divider style={{margin: '15px 0 10px 0'}}/>
      {
        comments.map((item: any) => {
          return (
            <div key={item.commentId}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <Avatar src={item.user.avatarUrl} icon='user'/>
                </div>
                <div className={styles.right}>
                  <p className={styles.name}>
                    <Link to='/' className={styles.link}>
                      <span>{item.user.nickname}</span>:
                    </Link>
                    <span className={styles.title}>{item.content}</span>
                  </p>
                  <div className={styles.time}>
                 <span>
                   昨天：{moment(item.time).calendar()}
                 </span>
                    <div className={styles.like}>
                      <Icon
                        type="like"
                        className={styles.likeIcon}
                        theme={item.liked ? 'filled' : 'outlined'}
                        // onClick={this.like}
                      />
                      <i className={styles.number}>{item.likedCount}</i>
                    </div>
                  </div>
                </div>
              </div>
              <Divider style={{margin: '5px 0'}}/>
            </div>

          )
        })
      }
      {
        comments.length !== 0 ?
          <div className={styles.page}>
            <Pagination
              current={current}
              total={total}
              onChange={onPage}
            />
          </div> : null
      }
    </div>
  )
}

export default CommentList
