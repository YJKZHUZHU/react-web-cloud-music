/** @format */

import React, {useEffect, useState, useRef} from "react"
import {history} from "@umijs/max"
import classnames from "classnames"
import {Flex, Image, Spin} from "antd"
import {CaretRightOutlined} from "@ant-design/icons"
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
import {getSimiSong, getSimiPlaylist, MusicData, Playlist} from "@/api/plyer"
import {Comment} from "@/components"
import Utils from "@/help"
import node from "@/assets/player/node.png"
import bar from "@/assets/player/bar.png"
import {
  useGetSongInfo,
  useIsPlay,
  useLyric,
  usePlayerObj,
  useSetShowPlayer,
  useShowPlayer,
  useSongId,
  useSongObj
} from "@/store/player"
import styles from "./index.scss"
import {CommentTypeEnum} from "@/types/comment"

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

const PlayerLayout = () => {
  const showPlayer = useShowPlayer()
  const playerObj = usePlayerObj()
  const isPlay = useIsPlay()
  const songObj = useSongObj()
  const lyric = useLyric()
  const id = useSongId()
  const [scroller, setScroller] = useState<any>(null)
  const [rd, setRd] = useState<any>(null)
  const imgContainerRef: any = useRef<any>(null)
  // 相似歌曲
  const [simiSongList, setSimiSongList] = useState<MusicData[]>([])
  const [simiPlayList, setSimiPlayList] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(false)
  const setShowPlayer = useSetShowPlayer()
  const getSongInfo = useGetSongInfo()

  const getSime = async () => {
    try {
      setLoading(true)
      const [simiSongRes, simiPlaylistRes] = await Promise.all([
        getSimiSong({id}),
        getSimiPlaylist({id})
      ])
      setSimiSongList(simiSongRes.data.songs)
      setSimiPlayList(simiPlaylistRes.data.playlists)
      setLoading(false)
      console.log("111", simiSongRes, simiPlaylistRes)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop"
  }

  const findLyricIndex = () => {
    return lyric
      ? lyric.findIndex((l: any, index: any) => {
          const nextLyric: any = lyric[index + 1]
          if (index === lyric.length - 1) return true
          return (
            parseInt(String(playerObj.playedSeconds), 10) >= parseInt(String(l.time), 10) &&
            playerObj.playedSeconds < nextLyric?.time
          )
        })
      : -1
  }

  //歌词滚动
  const scrollToActiveLyric = () => {
    if (findLyricIndex() !== -1) {
      if (lyric && lyric[findLyricIndex()]) {
        scroller.scrollToElement(".active", 200, 0, true)
      }
    }
  }

  const onPlayListItemLink = (item: Playlist) => {
    setShowPlayer(false)
    history.push(`/playList/${item.id}`)
  }

  useEffect(() => {
    const wrapper: any = document.querySelector(".playerWrapper")
    //选中DOM中定义的 .wrapper 进行初始化
    const scroller: any = new BScroll(wrapper, {
      mouseWheel: true,
      scrollY: true,
      scrollbar: true,
      probeType: 3,
      dblclick: true,
      click: true
    })
    setScroller(scroller)
    if (rd) {
      isPlay ? rd.animate() : rd.cancelAnimate()
    }
  }, [isPlay])

  useEffect(() => {
    const mobileOption = {
      size: parseInt(imgContainerRef?.current?.offsetWidth, 10),
      radius: 0.25,
      rippeWidth: 2,
      pointRadius: 4
    }
    const timers = setTimeout(() => {
      const rdx = new (window as any).Ripple(
        "#ripple",
        Object.assign(
          {cover: songObj.backgroundImg},
          detectDeviceType() === "Mobile" ? mobileOption : {}
        )
      )
      setRd(rdx)
      rdx.animate()
    }, 500)

    return () => clearTimeout(timers)
  }, [songObj.backgroundImg])

  useEffect(() => {
    scroller && scrollToActiveLyric()
  }, [scrollToActiveLyric, scroller])

  useEffect(() => {
    showPlayer && getSime()
  }, [showPlayer])

  return (
    <Flex
      gap={24}
      vertical
      className={classnames(
        styles._playerLayout,
        "pb-[20px] fixed top-[60px] bottom-[75px] left-0 right-0 px-[24px] bg-[#f9f9f9] z-[1000] overflow-x-hidden overflow-y-scroll transition-transform ",
        showPlayer ? "transform-none" : "translate-y-[105%]"
      )}>
      <Flex justify="space-between" className={classnames(styles.lyric)} gap={48}>
        <div className="pt-[80px] flex justify-center relative">
          <img className="absolute w-[32px] top-[-16px] left-[50%] z-[100]" src={node} />
          <img
            className={classnames(
              " absolute top-[3px] w-[100px] origin-[0_0] transition-all z-[1]  left-[53%]",
              isPlay ? "rotate-[-12deg]" : " rotate-[-40deg] t-[6px]"
            )}
            src={bar}
          />
          <div
            className={classnames(
              styles.imgOuterBorder,
              "w-[320px] h-[320px] bg-[#e6e5e6] rounded-[50%] flex items-center justify-center flex-row"
            )}>
            <div
              className={classnames(
                styles.imgOuter,
                "w-[300px] h-[300px] bg-[#e6e5e6] bg-gradient-to-br from-[#333540] from-10% via-[#070708] via-50%  to-[#333540] to-90%  flex justify-center items-center rounded-[50%] m-[10px]"
              )}
              ref={imgContainerRef}>
              <div id="ripple" className="!w-[300px] !h-[300px]" />
            </div>
          </div>
        </div>
        <Flex
          vertical
          flex={1}
          gap={20}
          className={classnames(styles.right, "pt-[50px] pl-[40px]")}>
          <span className="text-[24px] font-[600] text-[#363D62] self-center">{songObj.name}</span>

          <span className="text-[#7D829E] text-[18px] self-center line-clamp-1">
            {songObj.singerArr?.join("/")}
          </span>

          <div className="playerWrapper">
            <div className="content">
              {lyric.map((v: any, index: number) => {
                return (
                  <div key={Utils.createRandomId()} className="wrapItem">
                    <p
                      className={classnames("title", {
                        active: index === findLyricIndex()
                      })}>
                      {v.lyc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Flex>
        <Flex vertical gap={24} className="pt-[50px] w-[400px]">
          <span className="text-[#363D62]">包含这首歌的歌单</span>
          <Spin spinning={loading} tip="Loading..." delay={500}>
            <Flex vertical gap={24}>
              {simiPlayList.map((item) => {
                return (
                  <Flex
                    onClick={() => onPlayListItemLink(item)}
                    gap={12}
                    key={item.id}
                    className="cursor-pointer">
                    <Image
                      preview={false}
                      width={50}
                      height={50}
                      src={`${item?.coverImgUrl}?param=100y100`}
                      fallback="data:image/png;base64,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"
                    />
                    <Flex vertical gap={8} justify="center">
                      <span className="text-[#7D829E] line-clamp-1">{item.name}</span>
                      <Flex gap={2} align="center" className="text-[#888888] text-[14px]">
                        <CaretRightOutlined />
                        <span>{Utils.tranNumber(item.playCount)}</span>
                      </Flex>
                    </Flex>
                  </Flex>
                )
              })}
            </Flex>
          </Spin>
        </Flex>
      </Flex>

      <Flex flex={1} gap={48} justify="space-between">
        <Comment className="flex-1" id={id} immediate={showPlayer} type={CommentTypeEnum.music} />

        <Flex vertical gap={24} className="pt-[50px] w-[400px]">
          <span className="text-[#363D62]">相似歌曲</span>
          <Spin spinning={loading} tip="Loading..." delay={500}>
            <Flex vertical gap={24}>
              {simiSongList.map((item) => {
                return (
                  <Flex
                    onClick={() => getSongInfo(item.id)}
                    gap={12}
                    key={item.id}
                    className="cursor-pointer">
                    <Image
                      width={50}
                      height={50}
                      preview={false}
                      src={`${item?.album.picUrl}?param=100y100`}
                      fallback="data:image/png;base64,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"
                    />
                    <Flex flex={1} vertical gap={8} justify="center">
                      <Flex align="center" gap={2}>
                        <span className="text-[#7D829E] line-clamp-1">{item.name}</span>
                        {item.alias && Array.isArray(item.alias) && item.alias.length !== 0 && (
                          <span className="text-[#838384]">({item.alias.join()})</span>
                        )}
                      </Flex>
                      <span className="text-[#69696A] text-[14px] line-clamp-1">
                        {item.artists.map((item) => item.name).join("/")}
                      </span>
                    </Flex>
                  </Flex>
                )
              })}
            </Flex>
          </Spin>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PlayerLayout
