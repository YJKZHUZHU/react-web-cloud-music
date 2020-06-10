import React, {FC, useEffect, useState} from 'react'
import { CaretRightOutlined, RightOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {Link} from "umi"
import moment from 'moment'
import styles from './index.scss'
import API from '@/api'
import Song from '@/help/getSongInfo'

type Props = {
  boardData?: Array<any>
}
const initBoardData: Array<any> = []

const OfficialLeaderBoard: FC<Props> = () => {
  const [boardData, setBoardData] = useState(initBoardData)


  useEffect(() => {
    const getData = async () => {
      const res1 = await API.getTopList({idx: 3, loading: true})
      const res2 = await API.getTopList({idx: 0, loading: true})
      const res3 = await API.getTopList({idx: 2, loading: true})
      const res4 = await API.getTopList({idx: 1, loading: true})
      const res5 = await API.getTopList({idx: 17, loading: true})
      const res6 = await API.getTopList({idx: 26, loading: true})
      setBoardData([res1, res2, res3, res4, res5, res6])
    }
    getData().then(r => r)
  }, [])


  return (
    <Row gutter={48}>
      {
        boardData.map((item: any) => {
          return (
            <Col span={8} key={item.playlist.commentThreadId}>
              <div className={styles._leaderBoard}>
                <div className={styles.top}>
                  <div className={styles.img}>
                    <img src={item.playlist.coverImgUrl} className={styles.img}/>
                  </div>
                  <div className={styles.description}>
                    <p>{item.playlist.name}</p>
                    <p>最近更新：{moment(item.playlist.updateTime).format('MM-DD')}日更新</p>
                  </div>
                  <div className={styles.icon}>
                    <CaretRightOutlined onClick={() => Song.getSongUrl(item.playlist.tracks[0].id)} />
                  </div>
                </div>
                <ul className={styles.list}>
                  {
                    item.playlist.tracks.slice(0, 8).map((items: any, index: number) => {
                      return (
                        <li className={styles.item} key={items.id} onDoubleClick={() => Song.getSongUrl(items.id)}>
                          <span
                            className={styles.number}
                            style={{color: (index === 0 || index === 1 || index === 2) ? '#CD2929' : '#666666'}}>{index + 1}</span>
                          <span className={styles.title}>
                            {items.name}
                            {
                              items.alia.map((title: string) => {
                                return <i key={title} style={{color: '#999999'}}>{title}</i>
                              })
                            }
                          </span>
                          <span className={styles.name}>
                            {
                              items.ar.map((sing: any) => {
                                return <i key={sing.id}>{sing.name}{items.ar.length === (index + 1) ? null : '/'}</i>
                              })
                            }
                          </span>
                        </li>
                      )
                    })
                  }

                </ul>
                <p className={styles.link}>
                  <Link to='/'>
                    查看全部
                    <RightOutlined />
                  </Link>

                </p>
              </div>
            </Col>
          );
        })
      }

    </Row>
  );
}

export default OfficialLeaderBoard
