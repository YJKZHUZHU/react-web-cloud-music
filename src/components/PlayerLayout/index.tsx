/** @format */

import React, {useEffect, useState, useRef} from "react"
import classnames from "classnames"
import {useSelector} from "umi"
import {Space} from "antd"
import {CaretRightOutlined} from "@ant-design/icons"
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
import Ripple from "Ripple"
import {useRequest} from "ahooks"
import API from "@/api"
import {Artists, HotComment, NewComment, SimiItem} from "@/components"
import {IData as Iformat} from "@/components/SimiItem"
import Utils from "@/help"
import styles from "./index.scss"
import {IState} from "typings"

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

const formatSimiSong = (data: any[] = []): Iformat[] => {
  return data?.map((item) => {
    return {
      title: item.name,
      cover: item.coverImgUrl,
      path: `/playList?listId=${item.id}`,
      content: (
        <Space size={4}>
          <CaretRightOutlined />
          <span>{Utils.tranNumber(item.playCount, 2)}</span>
        </Space>
      )
    }
  })
}

const formatSimiSongList = (data: any[] = []): Iformat[] => {
  return data?.map((item) => {
    return {
      title: item.name,
      cover: item?.album?.picUrl,
      id: item.id,
      content: <Artists data={item.artists} isJump={false} />
    }
  })
}

const PlayerLayout = () => {
  const {songInfoModel, playmodel} = useSelector((state: IState) => state)
  const {isPlay, songObj, lyric, songId: id} = songInfoModel
  const {playerObj, showPlayer} = playmodel
  const [scroller, setScroller] = useState<any>(null)
  const [rd, setRd] = useState<any>(null)
  const imgContainerRef: any = useRef<any>(null)
  const [time, setTime] = useState(0)

  // 相似歌曲
  const {run: runSimiSong, data: simiSong, loading: simiLoading} = useRequest(
    () => API.getSimiSong({id}),
    {manual: true}
  )
  // 相似歌单
  const {run: runSimiSongList, data: simiSongList, loading: simiListLoading} = useRequest(
    () => API.getSimiSongList({id}),
    {
      manual: true
    }
  )
  const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop"
  }

  const findLyricIndex = () => {
    return lyric
      ? lyric.findIndex((l, index) => {
          const nextLyric: any = lyric[index + 1]
          if (index === lyric.length - 1) return true
          return (
            parseInt(String(playerObj.playedSeconds), 10) >= parseInt(String(l.time), 10) &&
            playerObj.playedSeconds < nextLyric?.time
          )
        })
      : -1
  }

  //歌词滚动
  const scrollToActiveLyric = () => {
    if (findLyricIndex() !== -1) {
      if (lyric && lyric[findLyricIndex()]) {
        scroller.scrollToElement(".active", 200, 0, true)
      }
    }
  }

  useEffect(() => {
    const wrapper: any = document.querySelector(".playerWrapper")
    //选中DOM中定义的 .wrapper 进行初始化
    const scroller: any = new BScroll(wrapper, {
      mouseWheel: true,
      scrollY: true,
      scrollbar: true,
      probeType: 3,
      dblclick: true,
      click: true
    })
    setScroller(scroller)
    if (rd) {
      isPlay ? rd.animate() : rd.cancelAnimate()
    }
  }, [isPlay])

  useEffect(() => {
    const mobileOption = {
      size: parseInt(imgContainerRef?.current?.offsetWidth, 10),
      radius: 0.25,
      rippeWidth: 2,
      pointRadius: 4
    }
    const timers = setTimeout(() => {
      const rdx = new Ripple(
        "#ripple",
        Object.assign(
          {cover: songObj.backgroundImg},
          detectDeviceType() === "Mobile" ? mobileOption : {}
        )
      )
      setRd(rdx)
      rdx.animate()
    }, 500)

    return () => clearTimeout(timers)
  }, [songObj.backgroundImg])

  useEffect(() => {
    scroller && scrollToActiveLyric()
  }, [scrollToActiveLyric, scroller])

  useEffect(() => {
    runSimiSong()
    runSimiSongList()
  }, [id])
  return (
    <div className={classnames(styles._playerLayout, showPlayer ? styles.show : styles.hide)}>
      <div className={styles.lyric}>
        <div className={styles.left}>
          <img className={styles.playBarSupport} src={require("../../assets/player/node.png")} />
          <img
            className={classnames(styles.playBar, isPlay ? styles.play : styles.stop)}
            src={require("../../assets/player/bar.png")}
          />
          <div className={styles.imgOuterBorder}>
            <div className={styles.imgOuter} ref={imgContainerRef}>
              <div id="ripple" className={styles.ripple} />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <p className={styles.name}>{songObj.name}</p>
          </div>
          <div className={styles.middle}>
            <span className={styles.name}>歌手：</span>
            {Object.keys(songObj).length !== 0 && <Artists data={songObj.singerArr} />}
          </div>
          <div className="playerWrapper">
            <div className="content">
              {lyric.map((v: any, index: number) => {
                return (
                  <div key={Utils.createRandomId()} className="wrapItem">
                    <p
                      className={classnames("title", {
                        active: index === findLyricIndex()
                      })}>
                      {v.lyc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentContainer}>
        <Space direction="vertical" className={styles.comment}>
          <HotComment type={0} id={id} />
          <NewComment type={0} id={id} />
        </Space>
        <Space direction="vertical" size={20} className={styles.right}>
          <Space direction="vertical" className={styles.item}>
            <h3>包含这首歌的歌单</h3>
            <SimiItem
              loading={simiListLoading}
              hidePlayer
              data={formatSimiSong(simiSongList?.playlists)}
            />
          </Space>
          <Space direction="vertical" className={styles.item}>
            <h3>相似歌曲</h3>
            <SimiItem
              loading={simiLoading}
              data={formatSimiSongList(simiSong?.songs)}
              showPlayIcon={true}
            />
          </Space>
        </Space>
      </div>
    </div>
  )
}

export default PlayerLayout
