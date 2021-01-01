/** @format */

import React, {FC, useEffect} from "react"
import {Drawer} from "antd"
import {useDispatch, useSelector} from "umi"
import {PlayRecord, PlayerLayout, Header} from "@/components"
import Menu from "@/layouts/Menu"
import Footer from "./Footer"
import {IState} from "typings"
import styles from "./index.scss"

const HomeLayout: FC = ({children}) => {
  const dispatch = useDispatch()

  const {showPlayRecord, songObj} = useSelector((state: IState) => state.songInfoModel)

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
          <div className={styles.containerWrapper}>{children}</div>
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

export default HomeLayout
