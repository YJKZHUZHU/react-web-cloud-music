import React, { FC,useState,useEffect } from 'react'
import {Radio,Tabs,message,List,Avatar,Col,Row,Icon} from 'antd'
import API from '@/api'
import moment from 'moment'
import router from 'umi/router'
import Utils from '@/help'
import styles from './index.scss'

const { TabPane } = Tabs
const initSubData = {
  artistSublist:[],
  albumSublist:[],
  mvSublist:[]
}
type Props = {
  data:any
}

const MvList:FC<Props> = ({data}) => {
  const singer = data.creator.map((item:any) => item.userName).join('/')
  return (
    <div className={styles.mvItem}>
      <div className={styles.img}>
        <img src={data.coverUrl}/>
      </div>
      <p className={styles.player}>
        <Icon type="video-camera" />
        <span>{data.playTime}</span>
      </p>
      <p className={styles.time}>{Utils.formatPlayerTime(data.durationms/1000)}</p>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.singer}>{singer}</p>
    </div>
  )
}

const Collect: FC = (props) => {
  const [subData,setSubData] = useState(initSubData)

  const callback = (e:any) => {
    console.log(e)
  }

  const albumDescription = (item:any) => {
    return (
      <div className={styles.albumDescription}>
        <span>{item.name}</span>
        <span className={styles.time}>{moment(item.subTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
    )
  }
  const albumTitle = (artists:any) => {
    return artists.map((item:any) => item.name).join('/')
  }

  const artistDescription = (item:any) => {
    return (
      <div className={styles.albumDescription}>
        <span>{item.name}</span>
        <span>专辑：{item.albumSize}</span>
        <span className={styles.mvSize}>MV：{item.mvSize}</span>
      </div>
    )
  }

  useEffect(() => {
    const getData = async () => {
      const artistSublist = await API.artistSublist()
      const albumSublist = await API.albumSublist()
      const mvSublist = await API.mvSublist({loading:true})
      setSubData({
        artistSublist:artistSublist.data,
        albumSublist:albumSublist.data,
        mvSublist:mvSublist.data
      })
      console.log(artistSublist,albumSublist,mvSublist)
    }

    getData().then(r => r)

  },[])

  return (
    <div className={styles._collect}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={`专辑 ${subData.albumSublist.length}`} key="1">
          <List
            itemLayout="horizontal"
            dataSource={subData.albumSublist}
            renderItem={(item:any) => (
              <List.Item onClick={() => router.push(`/album?id=${item.id}`)} className={styles.albumItem}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picUrl} />}
                  title={albumTitle(item.artists)}
                  description={albumDescription(item)}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={`歌手 ${subData.artistSublist.length}`} key="2">
          <List
            itemLayout="horizontal"
            dataSource={subData.artistSublist}
            renderItem={(item:any) => (
              <List.Item onClick={() => router.push(`/singer?id=${item.id}`)} className={styles.albumItem}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picUrl} />}
                  title={artistDescription(item)}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={`MV ${subData.mvSublist.length}`} key="3">
          <Row gutter={32}>
            {
              subData.mvSublist.map((item:any) => {
                return (
                  <Col span={6} key={item.vid}>
                    <MvList data={item} />
                  </Col>
                )
              })
            }
          </Row>
        </TabPane>
      </Tabs>

    </div>
  )
}

export default Collect
