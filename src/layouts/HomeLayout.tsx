import React, {FC, useEffect, ReactChild, forwardRef, useRef, createRef} from 'react'
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import styles from './index.scss'
import {NavLink} from "umi"
import {Subscribe} from '@/Appcontainer'
import { Drawer, Spin } from 'antd';
import PlayRecord from '@/components/PlayRecord'
import PlayerLayout from '@/components/PlayerLayout'
import Menu from '@/layouts/Menu'
import Footer from './Footer'

interface HomeInterface {
  $app: any,
  children: ReactChild
}

const HomeLayout: FC = (props: any) => {
  const {globalLoading, loading,showPlayRecord} = props.$app.state

  return (
    <div className={styles.home}>
      <Spin spinning={globalLoading} delay={100} size='large' tip='资源请稍等，，，'>
        <Header/>
        <main>
          <Menu/>
          <article>
            <div className={styles.containerWrapper}>
              <Spin size="large" spinning={loading}>
                {
                  props.children
                }
              </Spin>
            </div>
          </article>
          <Drawer
            placement="right"
            closable={false}
            visible={showPlayRecord}
            width={640}
            getContainer={false}
            mask={false}
            style={{position: "absolute"}}>
            <PlayRecord/>
          </Drawer>
        </main>
        <PlayerLayout/>
        <Footer/>
      </Spin>

    </div>
  )
}

// @ts-ignore
export default Subscribe(HomeLayout)
