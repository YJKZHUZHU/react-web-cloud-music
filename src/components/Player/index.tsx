/** @format */

import React, {useRef, forwardRef} from "react"
import ReactPlayer from "react-player"
import {useSelector, useDispatch, PlayModelState, SongInfoModelState} from "umi"

interface PlayerInterface {
  loaded?: number
  loadedSeconds?: number
  played?: number
  playedSeconds?: number
}

const Player = () => {
  const playRef = useRef(null)
  const {isPlay, songObj} = useSelector((state: any): SongInfoModelState => state.songInfoModel)
  const {volume, playMode} = useSelector((state: any): PlayModelState => state.playmodel)

  const dispatch = useDispatch()

  const onReady = () => {
    console.log("准备")
  }
  const onPlay = () => {
    console.log("播放")
  }
  const onPause = () => {
    console.log("暂停")
  }
  const onDuration = (time: any) => {
    console.log("时间:" + time + "s")
  }
  const onProgress = (state: PlayerInterface) => {
    dispatch({
      type: "playmodel/setPlayerObj",
      payload: {
        playerObj: {...state, playedSeconds: state.playedSeconds}
      }
    })
  }

  return (
    <ReactPlayer
      playsinline
      url={songObj.url}
      playing={isPlay}
      style={{display: "none"}}
      volume={volume}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onDuration={onDuration}
      onProgress={onProgress}
      loop={playMode === 1}
      progressInterval={500}
      ref={playRef}
    />
  )
}
export default forwardRef(Player)
