/** @format */

import {useState, useRef, memo} from "react"
import {Slider, Tooltip, Dropdown, MenuProps, message} from "antd"
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined
} from "@ant-design/icons"
import {useBoolean} from "ahooks"
import {useLocation} from "@umijs/max"
import classnames from "classnames"
import {usePlayRecord} from "@/hooks"
import Utils from "@/help"
import ReactPlayer from "react-player"
import store from "@/help/localStorage"
import {PlayMode} from "@/components"
import throttle from "lodash-es/debounce"
import {
  IPlayerObj,
  PlayerModeEnum,
  useGetSongInfo,
  useIsPlay,
  usePlayRecordTip,
  usePlayerMode,
  usePlayerObj,
  usePlayerRate,
  useSetIsPlay,
  useSetPlayRate,
  useSetPlayRecordTip,
  useSetPlayerObj,
  useSetShowPlayRecord,
  useSetShowPlayer,
  useShowPlayRecord,
  useShowPlayer,
  useSongId,
  useSongObj,
  useSongUrl
} from "@/store/player"
import style from "./index.scss"

enum PLAY_TYPE_ENUM {
  prev,
  next
}

const Footer = memo(() => {
  const location = useLocation()
  const playRef = useRef<ReactPlayer>(null)
  const list = usePlayRecord()
  const volumnRef = useRef(0)
  const [volume, setVolme] = useState(Number(store.getStorage("volume")))
  const [showValumeIcon, {toggle}] = useBoolean(Number(store.getStorage("volume")) === 0) // 是否静音
  const songUrl = useSongUrl()
  const songId = useSongId()
  const isPlay = useIsPlay()
  const showPlayRecord = useShowPlayRecord()
  const playRecordTip = usePlayRecordTip()
  const songObj = useSongObj()
  const showPlayer = useShowPlayer()
  const playerMode = usePlayerMode()
  const playerRate = usePlayerRate()
  const setIsPlay = useSetIsPlay()
  const playerObj = usePlayerObj()
  const getSongInfo = useGetSongInfo()
  const setPlayerObj = useSetPlayerObj()
  const setShowPlayRecord = useSetShowPlayRecord()
  const setPlayRecordTip = useSetPlayRecordTip()
  const setShowPlayer = useSetShowPlayer()
  const setPlayRate = useSetPlayRate()

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

  const onRecord = () => {
    setShowPlayRecord(!showPlayRecord)
    setPlayRecordTip("")
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
    if (!visible) return <div className=" w-[300px]"></div>
    return (
      <div className={classnames(style.musicInfo, "flex items-center w-[300px] gap-[15px]")}>
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
          <img width={60} height={60} className=" rounded-[8px]" src={songObj.backgroundImg} />
          {showPlayer ? <FullscreenOutlined className={style.full} /> : <FullscreenExitOutlined />}
        </div>
        <div className="flex flex-col flex-1 gap-[15px] justify-center">
          <div className="flex items-center gap-[5px]">
            <span className="text-[#333333]">{songObj.name}</span>
            <i className="text-[12px]">-</i>
            <span className="line-clamp-1 flex-1 text-[12px]">
              {songObj.singerArr?.join("/") || "--"}
            </span>
          </div>
          <div className="flex items-center gap-[5px] text-[12px] self-baseline">
            <span>
              {playRef ? Utils.formatPlayerTime(playRef.current?.getCurrentTime()!) : "00:00"}
            </span>
            <i>/</i>
            <span>{playRef ? Utils.formatPlayerTime(songObj.songTime || 0) : "00:00"}</span>
          </div>
        </div>
      </div>
    )
  }

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "1.x"
    },
    {
      key: 1.25,
      label: "1.25x"
    },
    {
      key: 1.5,
      label: "1.5x"
    },
    {
      key: 2,
      label: "2.x"
    }
  ].map((d) => {
    return {
      ...d,
      onClick: () => setPlayRate(d.key)
    }
  })

  const onSliderChange = (value: number) => {
    if (!playRef.current) return
    playRef.current.seekTo(value)
  }

  // 视频播放隐藏
  if (location.pathname === "/mv-detail") return null

  return (
    <footer className={style._footer}>
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

        <div className="flex-1 flex items-center gap-[16px] justify-end">
          {/* 音量 */}
          <div className="flex items-center w-[200px] gap-[4px]">
            <i
              className={classnames(
                "!text-[24px]",
                "iconfont",
                showValumeIcon ? "icon-jingyin" : "icon-volume"
              )}
              onClick={onMute}
            />
            <Slider className="flex-1" onChange={onVolume} min={0} max={100} value={volume * 100} />
          </div>

          <Dropdown overlayStyle={{width: 80}} menu={{items}} placement="top" arrow>
            <div className="cursor-pointer">{playerRate}x</div>
          </Dropdown>

          <PlayMode />

          {playRecordTip ? (
            <Tooltip title={playRecordTip} open={true}>
              <i
                className={classnames(
                  "iconfont",
                  "icon-bofangliebiao",
                  "!text-[24px]",
                  "cursor-pointer"
                )}
                onClick={onRecord}
              />
            </Tooltip>
          ) : (
            <i
              className={classnames(
                "iconfont",
                "icon-bofangliebiao",
                "!text-[24px]",
                "cursor-pointer"
              )}
              onClick={onRecord}
            />
          )}
        </div>
      </div>

      <ReactPlayer
        playsinline
        url={songUrl}
        playing={isPlay}
        style={{display: "none"}}
        volume={volume}
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
