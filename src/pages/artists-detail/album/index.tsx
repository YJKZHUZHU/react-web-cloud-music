/** @format */

import React,{useEffect,FC} from "react"
import {useRequest} from "ahooks"
import {Spin,Row,Col,Card} from 'antd'
import {useHistory} from "umi"
import API from "@/api"
import moment from 'moment'
import PlayIcon from '@/components/PlayIcon'
import {IProps} from "../_layout"
import styles from './index.scss'

const Album:FC<IProps> = ({query}) => {
  const {id} = query
  const {data, run, loading} = useRequest(() => API.getSingerAlbum({id}), {
    manual: true
  })
  const history = useHistory()
  useEffect(() => {
    run()
  }, [])
  console.log(data)
  return (
    <Spin spinning={loading} tip="Loading...">
      <Row gutter={24}>
        {(data?.hotAlbums as any[])?.map((item) => (
          <Col
            span={4}
            className={styles.card}
            key={item.id}
            onClick={() => history.push(`/artists-detail/album?id=${id}&name=${item.name}`)}>
            <Card
              bordered={false}
              style={{width: "100%"}}
              bodyStyle={{padding: 0}}
              loading={loading}
              cover={
                <div className={styles.singerCover}>
                  <div className={styles.img}>
                    <img alt={item.name} src={item.picUrl}/>
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                </div>
              }>
              <p className={styles.name}>
                <span className={styles.singerName}>
                  {item.name}
                  {item.alias.length !== 0 ? (
                    <i className={styles.alias}>({item.alias.join("")})</i>
                  ) : null}
                </span>
              </p>
              <span className={styles.publishTime}>
                {moment(item.publishTime).format("YYYY-MM-DD")}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  )
}

export default Album
