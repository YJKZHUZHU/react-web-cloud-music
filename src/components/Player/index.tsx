import React, {FC, useRef, useEffect, forwardRef, useImperativeHandle, useCallback} from 'react'
import ReactPlayer from 'react-player'
import {Subscribe} from '@/Appcontainer'
import {appState} from '@/models/gloable'
import Utils from '@/help'

type Props = {
  $app: any
}

const Player: FC<Props> = (props) => {
  const {isPlay, songObj} = props.$app.state

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
  const onProgress = (state:any) => {
    console.log('onProgress', state)
    // console.log(Utils.aaa(state.playedSeconds))
    return appState.setPlayerObj({
      ...state,
      playedSeconds:state.playedSeconds
    })
  }

  return (
    <div>
      <ReactPlayer
        url={songObj.url}
        playing={isPlay}
        style={{display: 'none'}}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onDuration={onDuration}
        onProgress={onProgress}
      />
    </div>

  )
}
// @ts-ignore
export default Subscribe(Player)
