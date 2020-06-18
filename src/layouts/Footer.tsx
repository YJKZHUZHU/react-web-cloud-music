import React, {FC, useState, useEffect, useRef} from "react"
import {Progress, Slider, Radio,Tooltip} from "antd"
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseCircleOutlined,
  CaretRightOutlined,
  ShareAltOutlined,
  OrderedListOutlined,
  NotificationOutlined,
  SoundOutlined,
  GithubOutlined,
  PauseOutlined,
} from "@ant-design/icons"
import {Subscribe} from "@/Appcontainer"
import {appState} from "@/models/gloable"
import style from "./index.scss"
import classnames from "classnames"
import Utils from "@/help"
import ReactPlayer from "react-player"
import store from "@/help/localStorage"
import PlayRate from "@/components/PlayRate"

interface PlayerInterface {
  loaded?: number
  loadedSeconds?: number
  played?: number
  playedSeconds?: number
}

type Props = {
  $app: any
}
const Footer: FC<Props> = (props) => {
  const {
    isPlay,
    songObj,
    playerObj,
    showPlayer,
    volume,
    playMode,
    playerRate,
    showPlayRecord,
    playRecordTip
  } = props.$app.state
  const [lastVolume, setLastVolume] = useState(0)
  const playRef: any = useRef(null)

  useEffect(() => {
    const volume = JSON.parse(store.getStorage("volume") as string)
    appState.setVolume(volume)
  }, [store.getStorage("volume")])

  const handleSlider = (value: any) => {
    playRef.current.seekTo(value)
    return appState.setPlayerObj({
      ...playerObj,
      playedSeconds: value,
    })
  }

  const onRate = (e: any) => {
    return appState.setPlayRate(+e.target.value)
  }

  const onVolume = (value: any) => {
    setLastVolume(value / 100)
    return appState.setVolume(value / 100)
  }
  const onMute = () => {
    if (volume !== 0) {
      return appState.setVolume(0)
    }
    return appState.setVolume(lastVolume)
  }

  const onStart = () => {
    console.log("播放")
  }

  const onPause = () => {
    console.log("暂停")
  }
  const onDuration = (time: any) => {
    console.log("时间:" + time + "s")
  }
  const onProgress = (state: PlayerInterface) => {
    console.log("onProgress", state.loaded)
    return appState.setPlayerObj({
      ...state,
      playedSeconds: state.playedSeconds,
    })
  }

  return (
    <footer className={style._footer}>
      <div className={style.footerContainer}>
        <Slider
          onChange={handleSlider}
          style={{
            padding: 0,
            margin: 0,
            visibility: Object.keys(songObj).length !== 0 ? "visible" : "hidden"
          }}
          value={playerObj.playedSeconds}
          defaultValue={0}
          step={0.001}
          min={0}
          max={songObj.songTime}
          tipFormatter={null}
        />
        <div className={style.footer}>
          <div
            className={style.info}
            style={{visibility: Object.keys(songObj).length !== 0 ? "visible" : "hidden"}}>
            <div className={style.img} onClick={() => appState.setShowPlayer(!showPlayer)}>
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
                          {songObj.singerArr.length === index + 1 ? null : "/"}
                        </span>
                      )
                    })}
                </span>
              </div>
              <div className={style.bottom}>
                <span className={style.playTime}>
                  {playerObj.playedSeconds
                    ? Utils.formatPlayerTime(playerObj.playedSeconds)
                    : "00:00"}
                </span>
                <i className={style.split}>/</i>
                <span className={style.time}>
                  {songObj.songTime ? Utils.formatPlayerTime(songObj.songTime) : "00:00"}
                </span>
              </div>
            </div>
          </div>
          <div className={style.playBtnGroup}>
            <div className={classnames(style.common, style.last)}>
              <StepBackwardOutlined />
            </div>
            <div
              className={classnames(style.common, style.now)}
              onClick={() => appState.setStopPlay(!appState.state.isPlay)}>
              {isPlay ? (
                <PauseOutlined className={style.pause} />
              ) : (
                <CaretRightOutlined className={style.caret} />
              )}
            </div>
            <div className={classnames(style.common, style.next)}>
              <StepForwardOutlined />
            </div>
          </div>
          <div className={style.playRate}>
            <p className={style.tip}>播放速度</p>
            <Radio.Group value={playerRate} onChange={onRate}>
              <Radio.Button value={1}>1.x</Radio.Button>
              <Radio.Button value={1.2}>1.2x</Radio.Button>
              <Radio.Button value={1.5}>1.5x</Radio.Button>
              <Radio.Button value={2}>2x</Radio.Button>
            </Radio.Group>
          </div>

          <div className={style.operating}>
            <ShareAltOutlined />
            <PlayRate />
            <Tooltip title={playRecordTip} visible={!!playRecordTip}>
              <OrderedListOutlined onClick={() => appState.setShowPlayRecord(!showPlayRecord)} />
            </Tooltip>

            <div className={style.progress}>
              {volume === 0 ? (
                <NotificationOutlined className={style.voice} onClick={onMute} />
              ) : (
                <SoundOutlined className={style.voice} onClick={onMute} />
              )}
              <Slider
                onChange={onVolume}
                min={0}
                max={100}
                // defaultValue={defaultValue}
                value={volume * 100}
                className={style.slider}
                tipFormatter={null}
              />
            </div>
            <a href="https://github.com/YJKZHUZHU/react-web-cloud-music" target="_blank">
              <GithubOutlined />
            </a>
          </div>
        </div>
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
        loop={playMode === 1}
        progressInterval={500}
        ref={playRef}
        // progressFrequency={1}
      />
    </footer>
  )
}

// @ts-ignore
export default Subscribe(Footer)
