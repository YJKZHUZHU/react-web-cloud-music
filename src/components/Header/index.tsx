import React, {FC, Fragment, useEffect, useState} from 'react'
import {Row, Col, Icon, Divider, Input, Badge, Avatar, Button, Radio, Popover, Dropdown, Menu, message} from 'antd'
import {Link,history} from "umi"
import API from '@/api'
import {Subscribe} from '@/Appcontainer'
import classnames from 'classnames'
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
  const [visible, setVisible] = useState(false)
  const [signIn,setSignIn] = useState(false)

  const onRoute = (path: string) => {
    setVisible(false)
    history.push(path)
  }


  const onLogout = async () => {
    const Ret: any = await API.logout({loading: true})
    if (Ret.code !== 200) {
      return message.info('服务器开小差了哦。。')
    }
    await message.success('退出成功')
    await setVisible(false)
    window.location.reload()
  }

  const dailySignIn = () => {
    API.dailySignIn({type: 1}).then((res: any) => {
      if (res.code !== 200) {
        return message.info('已经签到过了哦')
      }
      setSignIn(true)
      return message.success('签到成功')
    })
  }

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
          <Button size='small' onClick={dailySignIn} disabled={userInfo.pcSign || signIn}>
            <Icon type="carry-out"/>
            {
              userInfo.pcSign || signIn ? '已签到' : '签到'
            }
          </Button>
        </div>
        <div className={styles.attention}>
          <p className={styles.item} onClick={() => onRoute('/care/dynamic')}>
            <i>{userInfo.profile && userInfo.profile.eventCount}</i>
            <em>动态</em>
          </p>
          <Divider type='vertical' className={styles.divider}/>
          <p className={styles.item} onClick={() => onRoute('/care/follows')}>
            <i>{userInfo.profile && userInfo.profile.follows}</i>
            <em>关注</em>
          </p>
          <Divider type='vertical' className={styles.divider}/>
          <p className={styles.item} onClick={() => onRoute('/care/fan')}>
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
              {/*<i/>*/}
              <em>LV.7</em>
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
                <Button onClick={() => history.goBack()}><Icon type="left"/></Button>
                <Button onClick={() => history.go(1)}><Icon type="right"/></Button>
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
                visible={visible}
                onVisibleChange={() => setVisible(!visible)}
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
                   onClick={() => history.push('/login')}>
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
