import React ,{FC}from 'react'
import {Tabs,Icon,Divider,Table} from 'antd'
import styles from './index.scss'
const {TabPane} = Tabs



const PlayRecord:FC = () => {

  const header = (total:number,isDelete:boolean=true,isCollect:boolean = true) => {
    return (
      <div className={styles.header}>
        <p className={styles.left}>总共{total}首</p>
        <div className={styles.right}>
          {isCollect && (
            <p className={styles.delete}>
              <Icon type="file-add" />
              <span>收藏全部</span>
            </p>
          )}
          <Divider type='vertical' />
          {isDelete && (
            <p className={styles.delete}>
              <Icon type="delete" />
              <span>清空</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultActiveKey="1" className={styles._playRecord}>
      <TabPane
        tab={
          <span>
          <Icon type="history" />
          播放列表
        </span>
        }
        key="1"
      >
        {header(18)}
        <Divider className={styles.divider}/>
      </TabPane>
      <TabPane
        tab={
          <span>
          <Icon type="history" />
          本地历史
        </span>
        }
        key="2"
      >
        Tab 2
      </TabPane>
      <TabPane
        tab={
          <span>
          <Icon type="history" />
          近一周历史
        </span>
        }
        key="3"
      >
        Tab 2
      </TabPane>
    </Tabs>
  )
}

export default PlayRecord