/** @format */

import React, {useState, useEffect, useRef} from "react"
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
import usePlayRecord from "@/hooks/usePlayRecord"
import style from "./index.scss"
import classnames from "classnames"
import Utils from "@/help"
import ReactPlayer from "react-player"
import store from "@/help/localStorage"
import PlayMode from "@/components/PlayMode"
import {useDispatch, useSelector, SongInfoModelState, PlayModelState, SingerInterface} from "umi"

interface PlayerInterface {
  loaded?: number
  loadedSeconds?: number
  played?: number
  playedSeconds?: number
}

const Footer = () => {
  const dispatch = useDispatch()
   const playRef: any = useRef(null)
   const list = usePlayRecord()
  const [lastVolume, setLastVolume] = useState(0)
  const {isPlay, showPlayRecord, playRecordTip, songObj} = useSelector(
    (state: any): SongInfoModelState => state.songInfoModel
  )
  const {showPlayer, volume, playMode, playerRate, playerObj} = useSelector(
    (state: any): PlayModelState => state.playmodel
  )

  useEffect(() => {
    dispatch({
      type: "playmodel/setVolume",
      payload: {
        volume: JSON.parse(store.getStorage("volume") as string)
      }
    })
  }, [store.getStorage("volume")])

  const onRate = (e: any) => {
    dispatch({
      type: "playmodel/setPlayRate",
      payload: {
        playerRate: +e.target.value
      }
    })
  }

  const onVolume = (value: any) => {
    console.log(value)
    setLastVolume(value / 100)
    dispatch({
      type: "playmodel/setVolume",
      payload: {
        volume: value / 100
      }
    })
  }
  const onMute = () => {
    if (volume !== 0) {
      return dispatch({
        type: "playmodel/setVolume",
        payload: {
          volume: 0
        }
      })
    }
    return dispatch({
      type: "playmodel/setVolume",
      payload: {
        volume: !!lastVolume ? lastVolume : 0
      }
    })
  }

  const onStart = () => {
    console.log("播放")
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

  const onPause = () => {
    console.log("暂停")
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
  const onDuration = (time: any) => {
    console.log("时间:" + time + "s")
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
  const onSlider = (value: any) => {
    playRef.current.seekTo(value)
    dispatch({
      type: "playmodel/setPlayerObj",
      payload: {
        playerObj: {
          ...playerObj,
          playedSeconds: value
        }
      }
    })
  }
  return (
    <footer className={style._footer}>
      <div className={style.footerContainer}>
        <Slider
          onChange={onSlider}
          style={{
            padding: 0,
            margin: 0,
            visibility: Object.keys(songObj).length !== 0 ? "visible" : "hidden"
          }}
          value={playerObj?.playedSeconds}
          defaultValue={0}
          step={0.001}
          min={0}
          max={playerObj?.loadedSeconds}
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
                      {playRef
                        ? Utils.formatPlayerTime(playRef.current?.getSecondsLoaded())
                        : "00:00"}
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
              <Radio.Group value={playerRate} onChange={onRate}>
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
            <Tooltip title={playRecordTip} visible={!!playRecordTip}>
              <i className={classnames("iconfont", "icon-bofangliebiao")} onClick={onRecord} />
            </Tooltip>

            <div className={style.progress}>
              <i
                className={classnames(
                  style.voice,
                  "iconfont",
                  volume === 0 ? "icon-jingyin" : "icon-volume"
                )}
                onClick={onMute}
              />
              <Slider
                onChange={onVolume}
                min={0}
                max={100}
                value={volume * 100}
                className={style.slider}
                tipFormatter={null}
              />
            </div>
            <a href="https://github.com/YJKZHUZHU/react-web-cloud-music" target="_blank">
              <GithubOutlined />
            </a>
          </Col>
        </Row>
      </div>
      <ReactPlayer
        playsinline
        url={songObj.url}
        playing={isPlay}
        style={{display: "none"}}
        volume={volume}
        playbackRate={playerRate}
        onPlay={onStart}
        onPause={onPause}
        onDuration={onDuration}
        onProgress={onProgress}
        onEnded={onEnded}
        loop={playMode === 1}
        progressInterval={500}
        ref={playRef}
      />
    </footer>
  )
}

export default Footer
