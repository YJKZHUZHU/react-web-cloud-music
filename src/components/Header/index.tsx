import React, {FC, Fragment, useEffect, useState} from 'react'
import {Row, Col, Icon, Divider, Input, Badge, Avatar, Button, Radio, Popover, Dropdown, Menu,message} from 'antd'
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
  const {showPlayer, loginStatus, userInfo} = props.$app.state
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
  const login = () => {
    router.push({
      pathname: '/login'
    })
  }

  const onMenu = (value: any) => {
    console.log(value)
    if (+value.key === 2) {
      API.logout({loading:true}).then((res:any) =>  {
        if(res.code !== 200){
          return message.info('服务器开小差了，，')
        }
        message.success('退出成功')
        return  window.location.reload()
      })

    }
  }
  const menu = (
    <Menu onClick={onMenu}>
      <Menu.Item key="1">基本信息</Menu.Item>
      <Menu.Item key="2">
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <header>
      <Row justify='space-between' gutter={32} align='bottom' className={styles.row}>
        <Col span={3}>
          <h1 className={styles.logo}>
            <Link to='/'/>
          </h1>
        </Col>

        <Col span={3} offset={2}>
          {
            showPlayer ? <Icon type="down" onClick={() => appState.setShowPlayer(false)} className={styles.down}/> :
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
          <Dropdown overlay={menu} overlayClassName={classnames({[styles.show]: !loginStatus})}>
            <div style={{marginRight: 24}} className={styles.user}
                 onClick={() => !loginStatus && router.push('/login')}>
              <Avatar src={Object.keys(userInfo).length && userInfo.profile.avatarUrl} icon="user"/>
              <i className={styles.name}>
                {
                  loginStatus ? Object.keys(userInfo).length && userInfo.profile.nickname : '未登录'
                }
              </i>
            </div>
          </Dropdown>
        </Col>
        <Col span={1}>
          <Popover
            content={content}
            title="选择您喜欢的主题"
            trigger='click'
            overlayClassName={styles.themePop}
            getPopupContainer={(): any => document.getElementsByClassName('_changeSkin')[0]}
          >
            <Icon type="skin" className={classnames(styles.skin, '_changeSkin')}/>
          </Popover>

        </Col>
      </Row>
    </header>

  )
}

// @ts-ignore
export default Subscribe(Header)
