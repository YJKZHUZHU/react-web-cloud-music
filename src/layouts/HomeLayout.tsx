import React, {FC, useEffect, ReactChild, forwardRef, useRef, createRef} from 'react'
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import styles from './index.scss'
import NavLink from 'umi/navlink'
import {Subscribe} from '@/Appcontainer'
import {Icon, Spin} from 'antd'
import PlayerLayout from '@/components/PlayerLayout'
import Menu from '@/layouts/Menu'
import Footer from './Footer'

interface HomeInterface {
  $app: any,
  children: ReactChild
}

const HomeLayout: FC = (props: any) => {
  const {globalLoading, loading} = props.$app.state

  return (
    <div className={styles.home}>
      <Spin spinning={globalLoading} delay={100} size='large' tip='皮肤正在加载中'>
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
        </main>
        <PlayerLayout/>
        <Footer/>
      </Spin>
    </div>
  )
}

// @ts-ignore
export default Subscribe(HomeLayout)
