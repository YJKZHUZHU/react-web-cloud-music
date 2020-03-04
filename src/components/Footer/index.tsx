import React, {FC} from 'react'
import {Progress, Icon} from 'antd'
import {Subscribe} from '@/Appcontainer'
import {appState} from '@/models/gloable'
import style from './index.scss'
import classnames from 'classnames'
import Utils from '@/help'

type Props = {
  $app: any
}
const Footer: FC<Props> = props => {
  const {isPlay, songObj, playerObj,showPlayer} = props.$app.state
  const onPlay = () => {
    return appState.setStopPlay(!appState.state.isPlay)
  }
  return (
    <footer>
      <div className={style.footerContainer}>
        <Progress
          percent={parseFloat(String(playerObj.playedSeconds/playerObj.loadedSeconds))*100}
          strokeColor={{
            '0%': '#D74D45',
            '100%': '#87d068',
          }}
          status="active"
          strokeLinecap="square"
          showInfo={false}
          style={{padding: '0 23px'}}
        />
        <div className={style.footer}>
          <div className={style.info} style={{visibility:Object.keys(songObj).length !== 0 ? 'visible' : 'visible'}}>
            <div className={style.img} onClick={() => appState.setShowPlayer(!showPlayer)}>
              <div className={style.mask}/>
              <img src={songObj.backgroundImg}/>
              <Icon type={showPlayer ? 'fullscreen-exit' : 'fullscreen' } className={style.full}/>
            </div>
            <div className={style.content}>
              <div className={style.top}>
                <span className={style.songName}>{songObj.name}</span>
                <i className={style.split}>-</i>
                <span className={style.name}>
                {
                  songObj.singerArr && songObj.singerArr.map((item: any, index: any) => {
                    return <span key={item.id}>{item.name}{songObj.singerArr.length === (index + 1) ? null : '/'}</span>
                  })
                }
              </span>
              </div>
              <div className={style.bottom}>
              <span className={style.playTime}>
                {playerObj.playedSeconds ? Utils.formatPlayerTime(playerObj.playedSeconds) : '00:00'}
              </span>
                <i className={style.split}>/</i>
                <span
                  className={style.time}>{songObj.songTime ? Utils.formatPlayerTime(songObj.songTime) : '00:00'}</span>
              </div>
            </div>
          </div>
          <div className={style.playBtnGroup}>
            <div className={classnames(style.common,style.last)}>
              <Icon type="step-backward" />
            </div>
            <div className={classnames(style.common,style.now)}>
              {
                isPlay ?
                  <Icon type={'pause'} onClick={onPlay} className={style.pause} />
                  :<Icon type={'caret-right'} onClick={onPlay} className={style.caret}/>
              }
            </div>
            <div className={classnames(style.common,style.next)}>
              <Icon type="step-forward" />
            </div>
          </div>
          <div className={style.operating}>
            <Icon type="share-alt"/>
            <Icon type="reload"/>
            <Icon type="ordered-list"/>
            <div className={style.progress}>
              <Icon type="sound" className={style.voice}/>
              <Progress
                percent={50}
                strokeColor='#D74D45'
                status='active'
              />
            </div>
            <Icon type="github"/>
          </div>
        </div>
      </div>

    </footer>
  )
}

// @ts-ignore
export default Subscribe(Footer)
