import React, {FC, Fragment, useEffect, useState} from 'react'
import {Row, Col, Icon, Divider, Input, Badge, Avatar, Button, Radio, Popover, Dropdown, Menu, message} from 'antd'
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


  const onLogout = () => {
    API.logout({loading: true}).then((res: any) => {
      if (res.code !== 200) {
        return message.info('服务器开小差了，，')
      }
      message.success('退出成功')
      return window.location.reload()
    })
  }
  const dailySignIn = () => {
    API.dailySignIn({type: 1}).then((res: any) => {
      console.log(res)
      if (res.code !== 200) {
        return message.info('已经签到过了哦')
      }
      return message.success('签到成功')
    })
  }

  const userContent = (
    <div className={styles._main}>
      <div className={styles.top}>
        <div className={styles.user}>
          <div className={styles.left}>
            <Avatar src={Object.keys(userInfo).length && userInfo.profile.avatarUrl} icon="user"/>
            <i className={styles.name}>
              {
                Object.keys(userInfo).length && userInfo.profile.nickname
              }
            </i>
          </div>
          <Button size='small' onClick={dailySignIn} disabled={userInfo.pcSign}>
            <Icon type="carry-out"/>
            {
              userInfo.pcSign ? '已签到' : '签到'
            }
          </Button>
        </div>
        <div className={styles.attention}>
          <p className={styles.item} onClick={() => router.push('/care/dynamic')}>
            <i>{userInfo.profile && userInfo.profile.eventCount}</i>
            <em>动态</em>
          </p>
          <Divider type='vertical' className={styles.divider}/>
          <p className={styles.item} onClick={() => router.push('/care/follows')}>
            <i>{userInfo.profile && userInfo.profile.follows}</i>
            <em>关注</em>
          </p>
          <Divider type='vertical' className={styles.divider}/>
          <p className={styles.item} onClick={() => router.push('/care/fan')}>
            <i>{userInfo.profile && userInfo.profile.followeds}</i>
            <em>粉丝</em>
          </p>
        </div>
      </div>
      <Divider className={styles.divider}/>
      <div className={styles.middle}>
        <ul>
          <li className={styles.item}>
            <p>
              <Icon type="customer-service"/>
              <em>会员中心</em>
            </p>
            <p>{userInfo.profile && userInfo.profile.followed ? '已订购' : '未订购'}</p>
          </li>
          <li className={styles.item}>
            <p>
              <Icon type="thunderbolt"/>
              <em>会员等级</em>
            </p>
            <p className={styles.level}>
              <i/>
              <em>7</em>
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <Icon type="setting"/>
              <em>个人信息设置</em>
            </p>
            <p>
              <Icon type="right"/>
            </p>
          </li>
        </ul>

      </div>
      <Divider className={styles.divider}/>
      <div className={styles.bottom} onClick={onLogout}>退出登录</div>
    </div>
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
          {
            loginStatus ? (
              <Popover
                content={userContent}
                overlayClassName={classnames(styles.userPop, '_userPop')}
                getPopupContainer={(): any => document.getElementsByClassName('_userInfoPop')[0]}
                trigger='click'>
                <div style={{marginRight: 24}} className={classnames(styles.user, '_userInfoPop')}>
                  <Avatar src={userInfo.profile && userInfo.profile.avatarUrl} icon="user"/>
                  <i className={styles.name}>
                    {
                      userInfo.profile && userInfo.profile.nickname
                    }
                  </i>
                  <Icon type="caret-down" className={styles.icon}/>
                </div>
              </Popover>
            ) : (
              <div style={{marginRight: 24}} className={classnames(styles.user, '_userInfoPop')}
                   onClick={() => router.push('/login')}>
                <Avatar src={Object.keys(userInfo).length && userInfo.profile.avatarUrl} icon="user"/>
                <i className={styles.name}>未登录</i>
              </div>
            )
          }
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
