import React, {FC, useEffect, useState} from 'react'
import API from '@/api'
import { UserOutlined } from '@ant-design/icons';
import {Col, Row, Avatar, Pagination} from 'antd'
import styles from '../index.scss'

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


const Collection: FC<Props> = props => {
  const {listId} = props.location.query
  const initParam = {
    id: listId,
    limit: 60,
    offset: 1
  }
  const [collectionList, setCollectionList] = useState([])
  const [current, setCurrent] = useState(1)
  const getList = (params: ParamInterface) => {
    API.playlistCollection(Object.assign(params, {loading: true})).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        setCollectionList(res.subscribers)
      }
    })
  }

  const onPage = (page: number) => {
    setCurrent(page)
    getList({
      id: listId,
      limit: 60,
      offset: page
    })
  }

  useEffect(() => {
    getList(initParam)
  }, [])

  return (
    <div className={styles.collection}>
      <Row justify='start' type='flex'>
        {
          collectionList.map((item: ItemInterface) => {
            return (
              <Col span={3} key={item.userId}>
                <div className={styles.content}>
                  <p className={styles.img}>
                    <Avatar
                      style={{backgroundColor: '#D74D45'}}
                      icon={<UserOutlined />}
                      src={item.avatarUrl}
                    />
                  </p>
                  <p className={styles.name}>{item.nickname}</p>
                </div>
              </Col>
            );
          })
        }
      </Row>
      {
        collectionList.length !== 0 ?
          <div className={styles.page}>
            <Pagination
              current={current}
              total={props.subscribedCount}
              hideOnSinglePage={false}
              onChange={onPage}
            />
          </div> : null
      }

    </div>
  );
}

export default Collection
