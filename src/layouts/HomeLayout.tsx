import React, {FC, useEffect, ReactChild, forwardRef, useRef, createRef} from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './index.scss'
import NavLink from 'umi/navlink'
import {Subscribe} from '@/Appcontainer'
import {Icon, Spin} from 'antd'
import PlayerLayout from '@/components/PlayerLayout'
import ReactPlayer from 'react-player'
import Player from '@/components/Player'

interface HomeInterface {
  $app: any,
  children: ReactChild
}

const HomeLayout: FC = (props: any) => {
  const {globalLoading,loading} = props.$app.state
  console.log('加载：'+ loading)
  return (
    <Spin spinning={globalLoading} delay={100} size='large' tip='皮肤正在加载中'>
      <div className={styles.home}>
        <Header/>
        <main>
          <aside>
            <div className={styles.recommend}>
              <h2>推荐</h2>
              <ul className={styles.list}>
                <li>
                  <NavLink
                    to='/recommend/findMusic'
                    activeClassName={styles.activeRouter}>
                    <Icon type="customer-service" className={styles.icon}/>
                    <span>发现音乐</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/recommend/fm' activeClassName={styles.activeRouter}>
                    <Icon type="wifi" className={styles.icon}/>
                    <span>私人FM</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/recommend/video' activeClassName={styles.activeRouter}>
                    <Icon type="play-circle" className={styles.icon}/>
                    <span>视频</span>
                  </NavLink>

                </li>
                <li>
                  <NavLink to='/recommend/friend' activeClassName={styles.activeRouter}>
                    <Icon type="team" className={styles.icon}/>
                    <span>朋友</span>
                  </NavLink>

                </li>

              </ul>
            </div>
            <div className={styles.myMusic}>
              <h2>我的音乐</h2>
              <ul className={styles.list}>
                <li>
                  <NavLink to='/myMusic/cloud' activeClassName={styles.activeRouter}>
                    <Icon type="cloud" className={styles.icon}/>
                    <span>我的音乐云盘</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/myMusic/collect' activeClassName={styles.activeRouter}>
                    <Icon type="usergroup-add" className={styles.icon}/>
                    <span>我的收藏</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </aside>
          <article>
            <div>
              <Spin size="large" spinning={loading}>
                {
                  props.children
                }
              </Spin>
            </div>
          </article>
        </main>
        <PlayerLayout/>
        <Footer/>
      </div>
      <Player
      />
      {/*<ReactPlayer*/}
      {/*  url={props.$app.state.songObj.url}*/}
      {/*  playing={props.$app.state.isPlay}*/}
      {/*  style={{display:'none'}}*/}
      {/*/>*/}
    </Spin>
  )
}

// @ts-ignore
export default Subscribe(HomeLayout)
