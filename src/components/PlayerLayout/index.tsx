/** @format */

import React, {FC, useEffect, useState, useRef} from "react"
import styles from "./index.scss"
import classnames from "classnames"
import {useSelector, PlayModelState, SongInfoModelState} from "umi"
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
import Ripple from "Ripple"
import Utils from "@/help"

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

const PlayerLayout = () => {
  const {isPlay, songObj, lyric} = useSelector(
    (state: any): SongInfoModelState => state.songInfoModel
  )
  console.log(songObj)

  const {playerObj, showPlayer} = useSelector((state: any): PlayModelState => state.playmodel)
  const [scroller, setScroller] = useState<any>(null)
  const [rd, setRd] = useState<any>(null)
  const imgContainerRef: any = useRef<any>(null)

  const activeLyricIndex = (index: number) => {
    return index === findLyricIndex()
  }

  const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop"
  }

  const findLyricIndex = () => {
    return lyric
      ? lyric.findIndex((l: any, index: number) => {
          const nestLyric: any = lyric[index + 1]
          return (
            playerObj.playedSeconds >= l.time &&
            (nestLyric ? playerObj.playedSeconds < nestLyric.time : true)
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
            <p className={styles.singer}>
              <span className={styles.name}>歌手：</span>
              {Object.keys(songObj).length !== 0 &&
                songObj.singerArr.map((item: any, index: any) => {
                  return (
                    <span key={Utils.createRandomId()}>
                      {item.name}
                      {songObj.singerArr.length === index + 1 ? null : "/"}
                    </span>
                  )
                })}
            </p>
          </div>
          <div className="playerWrapper">
            <div className="content">
              {lyric.map((v: any, index: number) => {
                return (
                  <div
                    key={Utils.createRandomId()}
                    className={classnames("wrapItem", {
                      active: (index: number) => index === findLyricIndex()
                    })}>
                    <p className="title">{v.lyc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentContainer}>
        <div>精彩评论</div>
        <div>相似歌曲</div>
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
        {/*<p>评论区展示</p>*/}
      </div>
    </div>
  )
}

export default PlayerLayout
