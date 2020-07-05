import React, {FC, useRef, useEffect, forwardRef, useImperativeHandle, useCallback} from 'react'
import ReactPlayer from 'react-player'
import {Subscribe} from '@/Appcontainer'
import {appState} from '@/models/gloable'

interface PlayerInterface {
  loaded?:number
  loadedSeconds?:number
  played?:number
  playedSeconds?:number
}

type Props = {
  $app: any
}

const Player: FC<Props> = (props,parentRef) => {
  console.log(parentRef)

  const {isPlay, songObj,volume,playMode,playerObj} = props.$app.state
  const playRef = useRef(null)
  // console.log(playRef.current)

  const onReady = () => {
    console.log('准备')
  }
  const onPlay = () => {
    console.log('播放')
  }
  const onPause = () => {
    console.log('暂停')
  }
  const onDuration = (time: any) => {
    console.log('时间:' + time + 's')
  }
  const onProgress = (state: PlayerInterface) => {
    // console.log(Utils.aaa(state.playedSeconds))
    return appState.setPlayerObj({
      ...state,
      playedSeconds: state.playedSeconds,
    })
  }

  return (
    <ReactPlayer
      playsinline
      url={songObj.url}
      playing={isPlay}
      style={{display: 'none'}}
      volume={volume}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onDuration={onDuration}
      onProgress={onProgress}
      loop={playMode === 1}
      progressInterval={500}
      ref={playRef}
      // progressFrequency={1}
    />
  )
}
// @ts-ignore
export default Subscribe(forwardRef(Player))
