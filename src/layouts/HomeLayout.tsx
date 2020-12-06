/** @format */

import React, {FC, useEffect} from "react"
import {Drawer, Spin} from "antd"
import {useDispatch, useSelector, SongInfoModelState} from "umi"
import {Subscribe} from "@/Appcontainer"
import {PlayRecord, PlayerLayout, Header} from "@/components"
import Menu from "@/layouts/Menu"
import Footer from "./Footer"
import styles from "./index.scss"

interface IHomeLayout {
  $app: any
}

const HomeLayout: FC<IHomeLayout> = ({children, $app}) => {
  const dispatch = useDispatch()

  const {showPlayRecord, songObj} = useSelector(
    (state: any): SongInfoModelState => state.songInfoModel
  )

  const onClose = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: false
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: "userModel/getUserInfo"
    })
  }, [])

  return (
    <div className={styles.home}>
      <Header />
      <main>
        <Menu />
        <article>
          <div className={styles.containerWrapper}>
            <Spin size="large" spinning={$app.state.loading} tip="Loading...">
              {children}
            </Spin>
          </div>
        </article>
        <Drawer
          className={styles.drawer}
          placement="right"
          bodyStyle={{paddingTop: 18}}
          visible={showPlayRecord}
          width={640}
          onClose={onClose}
          getContainer={false}>
          <PlayRecord />
        </Drawer>
      </main>

      {Object.keys(songObj).length !== 0 && <PlayerLayout />}
      <Footer />
    </div>
  )
}

export default Subscribe(HomeLayout)
