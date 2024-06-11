/** @format */

import {useState, useRef, memo, useMemo} from "react"
import {Slider, Tooltip, Dropdown, MenuProps, message, Flex} from "antd"
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined
} from "@ant-design/icons"
import {useLocation} from "@umijs/max"
import classnames from "classnames"
import {usePlayRecord} from "@/hooks"
import {Artists, Image} from "@/components"
import Utils from "@/help"
import ReactPlayer from "react-player"
import playList from "@/assets/footer/play-list.png"
import playListActive from "@/assets/footer/play-list_active.png"
import volumIcon from "@/assets/footer/volum.png"
import soundOffIcon from "@/assets/footer/sound-off.png"
import {
  IPlayerObj,
  PlayerModeEnum,
  useGetSongInfo,
  useIsPlay,
  useIsSoundOff,
  usePlayRecordTip,
  usePlayerMode,
  usePlayerObj,
  usePlayerRate,
  useSetIsPlay,
  useSetPlayRate,
  useSetPlayRecordTip,
  useSetPlayerMode,
  useSetPlayerObj,
  useSetShowPlayRecord,
  useSetShowPlayer,
  useSetVolum,
  useShowCurrentLyric,
  useShowPlayRecord,
  useShowPlayer,
  useSongId,
  useSongObj,
  useSongUrl,
  useVolum,
  useSetShowCurrentLyric,
  useActiveLyric
} from "@/store/player"
import {MAP_PALYER_MODE, MAP_PALYER_MODE_NEXT, MAP_PALYER_MODE_TIP} from "@/constants/layout"
import style from "./index.scss"

enum PLAY_TYPE_ENUM {
  prev,
  next
}

interface Props {
  className?: string
}

const Footer = memo((props: Props) => {
  const {className} = props
  const location = useLocation()
  const playRef = useRef<ReactPlayer>(null)
  const list = usePlayRecord()
  const volum = useVolum()
  const setVolum = useSetVolum()
  const isSoundOff = useIsSoundOff()
  const songUrl = useSongUrl()
  const songId = useSongId()
  const isPlay = useIsPlay()
  const showPlayRecord = useShowPlayRecord()
  const playRecordTip = usePlayRecordTip()
  const songObj = useSongObj()
  const showPlayer = useShowPlayer()
  const playerMode = usePlayerMode()
  const playerRate = usePlayerRate()
  const playerObj = usePlayerObj()
  const setIsPlay = useSetIsPlay()
  const getSongInfo = useGetSongInfo()
  const setPlayerObj = useSetPlayerObj()
  const setShowPlayRecord = useSetShowPlayRecord()
  const setPlayRecordTip = useSetPlayRecordTip()
  const setShowPlayer = useSetShowPlayer()
  const setPlayRate = useSetPlayRate()
  const setPlayerMode = useSetPlayerMode()
  const prevVolum = useRef(0)
  const showCurrentLyric = useShowCurrentLyric()
  const setShowCurrentLyric = useSetShowCurrentLyric()
  const activeLyric = useActiveLyric()

  const modeTip = useMemo(() => {
    return MAP_PALYER_MODE_TIP.get(playerMode)!
  }, [playerMode])

  const playListIcon = useMemo(() => {
    return showPlayRecord ? playListActive : playList
  }, [showPlayRecord])

  const onVolume = (value: number) => {
    console.log("value", value)
    setVolum(value)
  }
  const onMute = () => {
    if (!isSoundOff) {
      prevVolum.current = volum
      setVolum(0)
      return
    }
    setVolum(prevVolum.current)
  }

  const onPlayBtn = () => {
    setIsPlay(!isPlay)
    if (!songId) {
      if (list.length !== 0) {
        getSongInfo(list[0]["id"])
        return
      }
      message.info("暂无可播放的歌曲")
    }
  }

  // 播放结束的操作
  const onEnded = () => {
    const {getSecondsLoaded, getCurrentTime} = playRef.current!
    if (parseInt(String(getSecondsLoaded()), 10) === parseInt(String(getCurrentTime()), 10)) {
      // 单曲循环
      if (playerMode === PlayerModeEnum.cycle) {
        return getSongInfo(songId)
      }
      // 顺序或者随机播放，触发下一首点击事件
      onPlay(PLAY_TYPE_ENUM.next)
    }
  }
  const onProgress = (state: IPlayerObj) => {
    console.log("==播放进度==", state)
    setPlayerObj(state)
  }

  const onPlay = (type: PLAY_TYPE_ENUM) => {
    if (!songUrl) {
      return message.info("没有能播放的歌曲")
    }
    // type: 0上一首 type:1 下一首
    let newSongId: string | number = ""
    const index = Utils.findIndex(list, songId as number, playerMode)
    console.log("index--", index)
    if (index === -1) {
      newSongId = list[0]["id"]
    } else {
      if (+playerMode === PlayerModeEnum.order) {
        // 顺序播放以及循环播放
        if (type === PLAY_TYPE_ENUM.prev) {
          newSongId = index === 0 ? list[list.length - 1]["id"] : list[index - 1]["id"]
        } else if (type === PLAY_TYPE_ENUM.next) {
          newSongId = index === list.length - 1 ? list[0]["id"] : list[index + 1]["id"]
        }
        getSongInfo(Number(newSongId))
      } else if (+playerMode === PlayerModeEnum.random) {
        // 随机播放
        newSongId = list[index]["id"]
      }
    }
    getSongInfo(Number(newSongId))
  }

  const renderMusicInfo = (visible: boolean) => {
    if (!visible) return <div className=" w-[320px]"></div>
    return (
      <div className={classnames(style.musicInfo, "flex items-center w-[320px] gap-[15px]")}>
        <div
          className={classnames(
            style.pictureInfo,
            "relative w-[60px] h-[60px] cursor-pointer overflow-hidden bg-[#333333] rounded-[8px]"
          )}
          onClick={() => {
            setShowPlayer(!showPlayer)
          }}>
          <div
            className={classnames(
              style.mask,
              "absolute left-0 right-0 bottom-0 top-0 bg-[rgba(0, 0, 0, 0.2)] rounded-[8px] z-[2]"
            )}
          />
          <Image
            width={60}
            height={60}
            className="rounded-[8px]"
            src={songObj.backgroundImg}
            size={[60, 60]}
            multiple={2}
          />
          {showPlayer ? <FullscreenOutlined className={style.full} /> : <FullscreenExitOutlined />}
        </div>
        <div className="flex flex-col flex-1 gap-[15px] justify-center">
          <Flex align="center" gap={5}>
            <span className="text-[#333333] line-clamp-1">{songObj.name}</span>
            <i className="text-[12px]">-</i>
            <Artists max={2} data={songObj.singerArr!} className=" text-[12px]" />
          </Flex>
          <Flex align="center" gap={5} className=" text-[12px] self-baseline">
            <span>{Utils.formatSeconds(playRef.current?.getCurrentTime()! * 1000)}</span>
            <i>/</i>
            <span> {Utils.formatSeconds(songObj.songTime! * 1000)}</span>
          </Flex>
        </div>
      </div>
    )
  }

  const onSliderChange = (value: number) => {
    if (!playRef.current) return
    playRef.current.seekTo(value)
  }

  return (
    <footer className={classnames(style._footer, className)} id="_footer">
      {renderMusicInfo(!!Object.keys(songObj).length)}

      <div className="flex-1 flex gap-[16px]">
        <div className="flex flex-col w-[650px]">
          <div className="flex items-center gap-[60px] self-center">
            <StepBackwardOutlined
              className="text-[30px]"
              onClick={() => onPlay(PLAY_TYPE_ENUM.prev)}
            />

            {isPlay ? (
              <PauseOutlined className="text-[30px]" onClick={onPlayBtn} />
            ) : (
              <CaretRightOutlined className="text-[30px]" onClick={onPlayBtn} />
            )}
            <StepForwardOutlined
              className="text-[30px]"
              onClick={() => onPlay(PLAY_TYPE_ENUM.next)}
            />
          </div>
          <Slider
            disabled={!!!songUrl}
            onChange={onSliderChange}
            value={playerObj.playedSeconds}
            defaultValue={0}
            step={0.001}
            min={0}
            max={songObj?.songTime}
            tooltip={{
              formatter: null
            }}
          />
        </div>
        {showCurrentLyric && (
          <span className=" flex-1 self-center text-[#000101] line-clamp-1">{activeLyric}</span>
        )}

        <div className="flex-1 flex items-center gap-[16px] justify-end">
          <Tooltip
            overlayInnerStyle={{color: "#000000"}}
            color="#ffffff"
            placement="top"
            title={modeTip}
            arrow={false}>
            <img
              onClick={() => setPlayerMode(MAP_PALYER_MODE_NEXT.get(playerMode)!)}
              className="w-[20px]"
              alt={modeTip}
              src={MAP_PALYER_MODE.get(playerMode)}
            />
          </Tooltip>

          <Tooltip title={playRecordTip} open={!!playRecordTip}>
            <img
              onClick={() => setShowPlayRecord(!showPlayRecord)}
              className="w-[20px]"
              alt="当前播放"
              src={playListIcon}
            />
          </Tooltip>
          <span
            onClick={() => setShowCurrentLyric(!showCurrentLyric)}
            className={classnames(
              showCurrentLyric ? "text-[#C52727]" : "text-[#3B3B3B]",
              "cursor-pointer"
            )}>
            词
          </span>
          <Tooltip
            overlayInnerStyle={{
              color: "#000000",
              paddingLeft: 0,
              paddingRight: 0
            }}
            color="#ffffff"
            placement="top"
            title={
              <Slider
                tooltip={{open: false}}
                className="!h-[100px]"
                vertical
                onChange={onVolume}
                value={volum}
              />
            }>
            <img
              onClick={onMute}
              className="w-[20px]"
              alt="音量"
              src={isSoundOff ? soundOffIcon : volumIcon}
            />
          </Tooltip>
        </div>
      </div>

      <ReactPlayer
        playsinline
        url={songUrl}
        playing={isPlay}
        style={{display: "none"}}
        volume={volum / 100}
        playbackRate={playerRate}
        onProgress={onProgress}
        onEnded={onEnded}
        loop={playerMode === PlayerModeEnum.cycle}
        progressInterval={300}
        ref={playRef}
      />
    </footer>
  )
})

export default Footer
