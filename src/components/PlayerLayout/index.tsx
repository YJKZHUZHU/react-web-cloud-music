import React, {FC, useEffect, useState, Fragment, useRef} from 'react'
import styles from './index.scss'
import classnames from 'classnames'
import {Subscribe} from '@/Appcontainer'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import Utils from '@/help'
// @ts-ignore
import RhythmRipple from './rhythmRipple.js'

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
// console.log(new RhythmRipple())

type Props = {
  $app: any
}
const PlayerLayout: FC<Props> = props => {
  const {lyric, songObj, isPlay, playerObj, showPlayer} = props.$app.state
  const [scroller, setScroller] = useState(null)
  const imgContainerRef: any = useRef(null)


  const activeLyricIndex = (index: number) => {
    return index === findLyricIndex()
  }
  const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
  }


  const findLyricIndex = () => {
    return lyric ? lyric.findIndex((l: any, index: number) => {
      const nestLyric = lyric[index + 1]
      return (
        playerObj.playedSeconds >= l.time && (nestLyric ? playerObj.playedSeconds < nestLyric.time : true)
      )
    }) : -1
  }

  //歌词滚动
  const scrollToActiveLyric = () => {
    if (findLyricIndex() !== -1) {
      if (lyric && lyric[findLyricIndex()]) {
        // @ts-ignore
        scroller.scrollToElement('.active', 200, 0, true)
      }
    }
  }

  useEffect(() => {

    const wrapper: any = document.querySelector('.playerWrapper')
    console.log(imgContainerRef)
    const mobileOption = {
      size: parseInt(imgContainerRef.current.offsetWidth),
      radius: .25,
      rippeWidth: 2,
      pointRadius: 4
    }

    //const rd =new RhythmRipple('#ripple', Object.assign({cover: songObj.backgroundImg}, detectDeviceType() === 'Mobile' ? mobileOption : {}))

    //选中DOM中定义的 .wrapper 进行初始化
    const scroller: any = new BScroll(wrapper, {
      mouseWheel: true,
      scrollY: true,
      scrollbar: true,
      probeType: 3,
      dblclick: true,
      click: true
    })
    //rd.animate()
    setScroller(scroller)
  }, [isPlay])

  useEffect(() => {
    // @ts-ignore
    console.log(scroller && scroller.scrollToElement)
    scroller && scrollToActiveLyric()
  }, [findLyricIndex()])


  return (
    <div className={classnames(styles._playerLayout, showPlayer ? styles.show : styles.hide)}>
      <div className={styles.lyric}>
        <div className={styles.left}>
          <img
            className={styles.playBarSupport}
            src={require('../../assets/player/node.png')}
          />
          <img
            className={classnames(styles.playBar, isPlay ? styles.play : styles.stop)}
            src={require('../../assets/player/bar.png')}
          />
          <div className={styles.imgOuterBorder}>
            <div className={styles.imgOuter} ref={imgContainerRef}>
              <div className={styles.imgWrap}>
                {/*<div id="ripple"/>*/}
                <img src={songObj.backgroundImg}/>
              </div>
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
              {
                Object.keys(songObj).length !== 0 && songObj.singerArr.map((item: any, index: any) => {
                  return <span
                    key={Utils.createRandomId()}>{item.name}{songObj.singerArr.length === (index + 1) ? null : '/'}</span>
                })
              }
            </p>
          </div>
          <div className='playerWrapper'>
            <div className='content'>
              {
                lyric.map((v: any, index: number) => {
                  return (
                    <div key={Utils.createRandomId()}
                         className={classnames('wrapItem', {'active': activeLyricIndex(index)})}>
                      <p className="title">
                        {v.lyc}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentContainer}>
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

// @ts-ignore
export default Subscribe(PlayerLayout)
