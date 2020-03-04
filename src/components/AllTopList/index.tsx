import React,{FC,useEffect,useState} from 'react'
import {Row,Col,Icon} from 'antd'
import styles from './index.scss'
import API from '@/api'
import Utils from '@/help'
import router from 'umi/router'

const ALlTopLIst: FC  = props => {
  const [allData,setAllData] = useState([])
  useEffect(() => {
    API.getAllTopList({loading: true}).then((res:any) => {
      console.log(res)
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
                <div className={styles.item} onClick={() => router.push(`/playList?listId=${item.id}`)}>
                  <img src={item.coverImgUrl} className={styles.img}/>
                  <div className={styles.count}>{Utils.tranNumber(item.playCount,2)}</div>
                  <div className={styles.playIcon}>
                    <Icon type="caret-right" />
                  </div>
                  <p className={styles.name}>{item.name}</p>
                </div>
              </Col>
            )
          })
        }

      </Row>
    </div>
  )
}

export default ALlTopLIst
