import React, {FC, Fragment, useEffect, useState} from 'react'
import {Row, Col, Icon, Divider, Input, Badge, Avatar, Button, Radio, Popover} from 'antd'
import Link from 'umi/link'
import API from '@/api'
import {Subscribe} from '@/Appcontainer'
import classnames from 'classnames'
import router from 'umi/router'
import {appState} from '@/models/gloable'
import Utils from '@/help'
import Search from '@/components/Search'
import styles from './index.scss'


interface AccountInterface {
  code: number,
  account: object,
  profile: any
}
type Props = {
  $app: any
}


const Header: FC<Props> = props => {
  const {showPlayer} = props.$app.state

  const [avatarUrl, setAvatarUrl] = useState('')
  const [userName, setUserName] = useState('')
  const content = (
    <div className={styles.theme}>
      <p className={styles.item} onClick={() => Utils.setTheme('black')}>
        <span className={classnames(styles.black, styles.com)}/>
        <span>黑色</span>
      </p>
      <p className={styles.item} onClick={() => Utils.setTheme('shallow')}>
        <span className={classnames(styles.shallow, styles.com)}/>
        <span>浅色</span>
      </p>
      <p className={styles.item} onClick={() => Utils.setTheme('red')}>
        <span className={classnames(styles.red, styles.com)}/>
        <span>红色</span>
      </p>
    </div>
  )
  useEffect(() => {
    // @ts-ignore
    API.login({phone: 18470186610, password: 'YJK960124FF'}).then((res: AccountInterface) => {
      if (res.code === 200) {
        // @ts-ignore
        setAvatarUrl(res.profile.avatarUrl)
        setUserName(res.profile.nickname)
      }
    })
  }, [])
  // @ts-ignore
  return (
    <header>
      <div className={styles.top}>
        <Row justify='space-between' gutter={32} align='bottom' className={styles.row}>
          <Col span={3}>
            <h1 className={styles.logo}>
              <Link to='/'/>
            </h1>
          </Col>
          <Col span={3} offset={2}>
            {
              showPlayer ? <Icon type="down" onClick={() => appState.setShowPlayer(false)} className={styles.down} /> :
                (<Button.Group>
                  <Button onClick={() => router.goBack()}><Icon type="left"/></Button>
                  <Button onClick={() => router.go(1)}><Icon type="right"/></Button>
                </Button.Group>)
            }

          </Col>
          <Col span={5} className='_search'>
            <Search/>
          </Col>
          <Col span={3} offset={3}>
            <span style={{marginRight: 24}}>
              <Avatar src={avatarUrl} icon="user"/>
              <i>{userName}</i>
            </span>
          </Col>
          <Col span={1}>
            <Popover
              content={content}
              title="选择您喜欢的主题"
              trigger='click'
              overlayClassName={styles.themePop}
              getPopupContainer={():any => document.getElementsByClassName('_changeSkin')[0]}
            >
              <Icon type="skin" className={classnames(styles.skin,'_changeSkin')}/>
            </Popover>

          </Col>
        </Row>
      </div>
    </header>

  )
}

export default Subscribe(Header)
