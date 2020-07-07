/** @format */

import React, {FC, useEffect} from "react"
import Header from "@/components/Header"
import styles from "./index.scss"
import {Drawer, Spin} from "antd"
import PlayRecord from "@/components/PlayRecord"
import PlayerLayout from "@/components/PlayerLayout"
import Menu from "@/layouts/Menu"
import Footer from "./Footer"
import {Loading, connect, useDispatch, useSelector} from "umi"

interface IHomeLayout {
  loading: Loading
}

const HomeLayout: FC<IHomeLayout> = ({loading, children}) => {
  const dispatch = useDispatch()

  const {showPlayRecord} = useSelector((state: any) => state.songInfoModel)

  useEffect(() => {
    dispatch({
      type: "userModel/getUserInfo"
    })
  }, [])

  return (
    <div className={styles.home}>
      {/* <Spin spinning={false} delay={100} size="large" tip="资源请稍等，，，"> */}
      <Header />
      <main>
        <Menu />
        <article>
          <div className={styles.containerWrapper}>
            <Spin size="large" spinning={loading.global} tip="Loading...">
              {children}
            </Spin>
          </div>
        </article>
        <Drawer
          className={styles.drawer}
          placement="right"
          closable={false}
          visible={showPlayRecord}
          width={640}
          getContainer={false}
          mask={false}>
          <PlayRecord />
        </Drawer>
      </main>
      <PlayerLayout />
      <Footer />
      {/* </Spin> */}
    </div>
  )
}
const mapPropsToState = ({loading}: IHomeLayout) => ({
  loading
})

export default connect(mapPropsToState)(HomeLayout)
