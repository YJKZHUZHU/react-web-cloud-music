import React,{FC,useEffect,useState} from 'react'
import { CaretRightOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import styles from './index.scss'
import API from '@/api'
import Utils from '@/help'
import {history} from 'umi'

const ALlTopLIst: FC  = props => {
  const [allData,setAllData] = useState([])
  useEffect(() => {
    API.getAllTopList({loading: false}).then((res:any) => {
      if(res.code === 200) {
        setAllData(res.list)
      }
    })
  },[])
  return (
    <div className={styles._allTopList}>
      <Row gutter={32}>
        {
          allData.map((item:any) => {
            return (
              <Col key={item.id} span={4}>
                <div
                  className={styles.item}
                  onClick={() => history.push(`/playList?listId=${item.id}`)}>
                  <img src={item.coverImgUrl} className={styles.img} />
                  <div className={styles.count}>{Utils.tranNumber(item.playCount, 2)}</div>
                  <div className={styles.playIcon}>
                    <CaretRightOutlined />
                  </div>
                  <p className={styles.name}>{item.name}</p>
                </div>
              </Col>
            );
          })
        }

      </Row>
    </div>
  );
}

export default ALlTopLIst
