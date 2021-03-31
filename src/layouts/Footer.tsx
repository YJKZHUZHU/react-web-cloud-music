/** @format */

import React, {useState, useRef, memo, useEffect} from "react"
import {Slider, Radio, Tooltip, Row, Col, Space} from "antd"
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  ShareAltOutlined,
  GithubOutlined,
  PauseOutlined
} from "@ant-design/icons"
import {useBoolean} from "ahooks"
import {
  useDispatch,
  useLocation,
  useSelector,
  SingerInterface
} from "umi"
import classnames from "classnames"
import {usePlayRecord} from "@/hooks"
import Utils from "@/help"
import ReactPlayer from "react-player"
import store from "@/help/localStorage"
import {PlayMode} from "@/components"
import style from "./index.scss"
import {IState} from "typings"

interface PlayerInterface {
  loaded?: number
  loadedSeconds?: number
  played?: number
  playedSeconds?: number
}

const Footer = memo(() => {
  const dispatch = useDispatch()
  const location = useLocation()
  const playRef = useRef<any>(null)
  const list = usePlayRecord()
  const volumnRef = useRef(0)
  const [volume, setVolme] = useState(Number(store.getStorage("volume")))
  const [showValumeIcon, {toggle}] = useBoolean(Number(store.getStorage("volume")) === 0) // 是否静音
  const {songInfoModel, playmodel} = useSelector((state: IState) => state)
  const {isPlay, showPlayRecord, playRecordTip, songObj} = songInfoModel
  const {showPlayer, playMode, playerRate} = playmodel

  const onVolume = (value: any) => {
    volumnRef.current = value / 100
    if (value === 0) {
      toggle(true)
    } else {
      toggle(false)
      setVolme(() => {
        store.setStorage("volume", String(value / 100))
        return value / 100
      })
    }
  }
  const onMute = () => {
    toggle()
    setVolme(showValumeIcon ? volumnRef.current : 0)
  }

  const onPlayBtn = () => {
    dispatch({
      type: "songInfoModel/setIsPlay",
      payload: {
        isPlay: !isPlay
      }
    })
    if (!songObj.id && list.length !== 0) {
      dispatch({
        type: "songInfoModel/getSongInfo",
        payload: {
          id: list[0]["id"]
        }
      })
    }
  }

  const onEnded = () => {
    const {getSecondsLoaded, getCurrentTime} = playRef.current
    if (parseInt(getSecondsLoaded(), 10) === parseInt(getCurrentTime(), 10)) {
      // 单曲循环
      if (playMode === 1) {
        return dispatch({
          type: "songInfoModel/getSongInfo",
          payload: {
            id: songObj.id
          }
        })
      }
      // 顺序或者随机播放，触发下一首点击事件
      onPlay(1)
    }
  }
  const onProgress = (state: PlayerInterface) => {
    console.log("onProgress", state)
    dispatch({
      type: "playmodel/setPlayerObj",
      payload: {
        playerObj: state
      }
    })
  }

  const onRecord = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: !showPlayRecord
      }
    })
    dispatch({
      type: "songInfoModel/setPlayRecordTip",
      payload: {
        playRecordTip: ""
      }
    })
  }

  const onPlay = (type: number) => {
    // type: 0上一首 type:1 下一首
    let songId: any = ""
    const index = Utils.findIndex(list, songObj.id as number, playMode)
    if (index === -1) {
      songId = list[0]["id"]
    } else {
      if (+playMode === 0) {
        // 顺序播放以及循环播放
        if (type === 0) {
          songId = index === 0 ? list[list.length - 1]["id"] : list[index - 1]["id"]
        } else if (type === 1) {
          songId = index === list.length - 1 ? list[0]["id"] : list[index + 1]["id"]
        }
        dispatch({
          type: "songInfoModel/getSongInfo",
          payload: {
            id: songId
          }
        })
        // Song.getSongUrl(songId)
      } else if (+playMode === 2) {
        // 随机播放
        songId = list[index]["id"]
      }
    }
    dispatch({
      type: "songInfoModel/getSongInfo",
      payload: {
        id: songId
      }
    })
  }

  // 视频播放隐藏
  if (location.pathname === "/mv-detail") return null

  return (
    <footer className={style._footer}>
      <div className={style.footerContainer}>
        <Slider
          onChange={(val: number) => playRef.current.seekTo(val)}
          style={{
            padding: 0,
            margin: 0,
            visibility: Object.keys(songObj).length !== 0 ? "visible" : "hidden"
          }}
          value={playRef.current?.getCurrentTime()}
          defaultValue={0}
          step={0.001}
          min={0}
          max={songObj?.songTime}
          tipFormatter={null}
        />
        <Row className={style.footer}>
          <Col span={4}>
            {Object.keys(songObj).length !== 0 ? (
              <div className={style.info}>
                <div
                  className={style.img}
                  onClick={() =>
                    dispatch({type: "playmodel/setShowPlayer", payload: {showPlayer: !showPlayer}})
                  }>
                  <div className={style.mask} />
                  <img src={songObj.backgroundImg} />
                  {showPlayer ? (
                    <FullscreenOutlined className={style.full} />
                  ) : (
                    <FullscreenExitOutlined />
                  )}
                </div>
                <div className={style.content}>
                  <div className={style.top}>
                    <span className={style.songName}>{songObj.name}</span>
                    <i className={style.split}>-</i>
                    <span className={style.name}>
                      {songObj.singerArr &&
                        songObj.singerArr.map((item: any, index: any) => {
                          return (
                            <span key={item.id}>
                              {item.name}
                              {(songObj.singerArr as SingerInterface[]).length === index + 1
                                ? null
                                : "/"}
                            </span>
                          )
                        })}
                    </span>
                  </div>
                  <div className={style.bottom}>
                    <span className={style.playTime}>
                      {playRef
                        ? Utils.formatPlayerTime(playRef.current?.getCurrentTime())
                        : "00:00"}
                    </span>
                    <i className={style.split}>/</i>
                    <span className={style.time}>
                      {playRef ? Utils.formatPlayerTime(songObj.songTime || 0) : "00:00"}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </Col>
          <Col span={3} push={3} className={style.playBtnGroup}>
            {/* 上一曲 */}
            <div className={classnames(style.common, style.last)} onClick={() => onPlay(0)}>
              <StepBackwardOutlined />
            </div>
            <div className={classnames(style.common, style.now)} onClick={onPlayBtn}>
              {isPlay ? (
                <PauseOutlined className={style.pause} />
              ) : (
                <CaretRightOutlined className={style.caret} />
              )}
            </div>
            {/* 下一曲 */}
            <div className={classnames(style.common, style.next)} onClick={() => onPlay(1)}>
              <StepForwardOutlined />
            </div>
          </Col>
          <Col span={5} push={2} className={style.playRate}>
            <Space>
              <p className={style.tip}>播放速度</p>
              <Radio.Group
                size="small"
                value={playerRate}
                onChange={(e) =>
                  dispatch({
                    type: "playmodel/setPlayRate",
                    payload: {
                      playerRate: +e.target.value
                    }
                  })
                }>
                <Radio.Button value={1}>1.x</Radio.Button>
                <Radio.Button value={1.2}>1.2x</Radio.Button>
                <Radio.Button value={1.5}>1.5x</Radio.Button>
                <Radio.Button value={2}>2x</Radio.Button>
              </Radio.Group>
            </Space>
          </Col>
          <Col span={5} className={style.operating}>
            <ShareAltOutlined />
            <PlayMode />
            {playRecordTip ? (
              <Tooltip title={playRecordTip} visible={true}>
                <i className={classnames("iconfont", "icon-bofangliebiao")} onClick={onRecord} />
              </Tooltip>
            ) : (
              <i className={classnames("iconfont", "icon-bofangliebiao")} onClick={onRecord} />
            )}

            <div className={style.progress}>
              <i
                className={classnames(
                  style.voice,
                  "iconfont",
                  showValumeIcon ? "icon-jingyin" : "icon-volume"
                )}
                onClick={onMute}
              />
              <Slider
                onChange={onVolume}
                min={0}
                max={100}
                value={volume * 100}
                className={style.slider}
              />
            </div>
            <a href="https://github.com/YJKZHUZHU/react-web-cloud-music" target="_blank">
              <GithubOutlined />
            </a>
          </Col>
        </Row>
      </div>
      {Object.keys(songObj).length !== 0 && (
        <ReactPlayer
          playsinline
          url={songObj.url}
          playing={isPlay}
          style={{display: "none"}}
          volume={volume}
          playbackRate={playerRate}
          onProgress={onProgress}
          onEnded={onEnded}
          loop={playMode === 1}
          progressInterval={500}
          ref={playRef}
        />
      )}
    </footer>
  )
})

export default Footer
