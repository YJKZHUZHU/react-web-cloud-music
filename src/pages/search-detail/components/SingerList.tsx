import React,{FC,useCallback} from 'react'
import {Spin,Avatar,Icon} from 'antd'
import styles from '../index.scss'
import Utils from '@/help'
type Props = {
  data: Array<any>,
  loading: boolean,
  hasMore: boolean,
  type:number
}
const SingerList:FC<Props> = props => {
  const {data, loading, hasMore,type} = props
  const content = useCallback(() => {
    console.log(data)
    if(+type === 100){
      return (
        <ul>
          {
            data.map((item:any) => {
              return (
                <li className={styles.item} key={Utils.createRandomId()}>
                  <div className={styles.img}>
                    <Avatar shape="square" size={64} icon="user" src={item.img1v1Url} className={styles.icon} />
                  </div>
                  <p className={styles.title} dangerouslySetInnerHTML={{__html:Utils.highLight(item.name)}} />
                </li>
              )
            })
          }
        </ul>
      )
    }
    if(+type === 10){
      return (
        <ul>
          {
            data && data.map((item:any) => {
              return (
                <li className={styles.item} key={Utils.createRandomId()}>

                  <div className={styles.img}>
                    <Avatar shape="square" size={64} icon="user" src={item.picUrl} className={styles.icon} />
                  </div>
                  <p className={styles.title} dangerouslySetInnerHTML={{__html:Utils.highLight(item.name)}} />
                  <p className={styles.singer}>{item.artist && item.artist.name}</p>
                </li>
              )
            })
          }
        </ul>
      )
    }
    if(+type === 1000) {
      return (
        <ul>
          {
            data && data.map((item:any) => {
              return (
                <li className={styles.item} key={Utils.createRandomId()}>
                  <div className={styles.img}>
                    <Avatar shape="square" size={64} icon="user" src={item.coverImgUrl} className={styles.icon} />
                  </div>
                  {
                    item.name && <p className={styles.title} dangerouslySetInnerHTML={{__html:Utils.highLight(item.name)}} />
                  }

                  <p className={styles.singer}>{item.trackCount}首</p>
                  <p className={styles.nickname}>{item.creator && item.creator.nickname}</p>
                </li>
              )
            })
          }
        </ul>
      )
    }
    if(+type === 1002) {
      return (
        <ul>
          {
            data && data.map((item:any) => {
              return (
                <li className={styles.item} key={Utils.createRandomId()}>
                  <div className={styles.img}>
                    <Avatar size={64} icon="user" src={item.avatarUrl} className={styles.icon} />
                  </div>
                  <div className={styles.title}>
                    {
                      item.nickname && <p dangerouslySetInnerHTML={{__html:Utils.highLight(item.nickname)}} />
                    }

                    {item.gender === 1 ? <Icon type="man" className={styles.man} /> : <Icon type="woman" className={styles.woman} />}
                  </div>
                  {
                    item.signature && <p className={styles.singer} dangerouslySetInnerHTML={{__html:Utils.highLight(item.signature)}} />
                  }
                </li>
              )
            })
          }
        </ul>
      )
    }
  },[data, type])
  return (
    <div className={styles._singerList}>
      {content()}
      {loading && hasMore && (
        <div className="demo-loading-container">
          <Spin/>
        </div>
      )}
    </div>
  )
}

export default SingerList

