/** @format */

import React, {FC, useEffect} from "react"
import Header from "@/components/Header"
import {Drawer, Spin} from "antd"
import {useDispatch, useSelector, SongInfoModelState} from "umi"
import {Subscribe} from "@/Appcontainer"
import PlayRecord from "@/components/PlayRecord"
import PlayerLayout from "@/components/PlayerLayout"
import Menu from "@/layouts/Menu"
import Loading from '@/components/Loading'
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
          closable={false}
          visible={showPlayRecord}
          width={640}
          getContainer={false}
          mask={false}>
          <PlayRecord />
        </Drawer>
      </main>

      {Object.keys(songObj).length !== 0 && <PlayerLayout />}
      <Footer />
    </div>
  )
}

export default Subscribe(HomeLayout)
