/** @format */

import {useEffect, useRef} from "react"
import {history} from "@umijs/max"
import classnames from "classnames"
import {Flex, Image, Spin} from "antd"
import {CaretRightOutlined} from "@ant-design/icons"
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
import {Comment} from "@/components"
import Utils from "@/help"
import node from "@/assets/player/node.png"
import bar from "@/assets/player/bar.png"
import {
  Playlist,
  useActiveLyric,
  useGetSongInfo,
  useIsPlay,
  useLyric,
  useSetShowPlayer,
  useShowPlayer,
  useSimiPlayList,
  useSimiSongList,
  useSongId,
  useSongObj,
  useLoading
} from "@/store/player"
import {CommentTypeEnum} from "@/types/comment"
import {BScrollConstructor} from "@better-scroll/core/dist/types/BScroll"

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

const PlayerLayout = () => {
  const showPlayer = useShowPlayer()
  const isPlay = useIsPlay()
  const songObj = useSongObj()
  const lyric = useLyric()
  const id = useSongId()
  const loading = useLoading()
  const simiSongList = useSimiSongList()
  const simiPlayList = useSimiPlayList()

  const setShowPlayer = useSetShowPlayer()
  const getSongInfo = useGetSongInfo()

  const activeLyric = useActiveLyric()

  const rippleRef = useRef<RippleReturn | null>(null)

  const lyricScrollRef = useRef<BScrollConstructor | null>(null)

  useEffect(() => {
    if (lyricScrollRef.current && activeLyric) {
      lyricScrollRef.current?.scrollToElement("._activeLyric", 200, 0, true)
    }
  }, [activeLyric])

  const onPlayListItemLink = (item: Playlist) => {
    setShowPlayer(false)
    history.push(`/playList/${item.id}`)
  }

  const initRipple = () => {
    if (!rippleRef.current) {
      rippleRef.current = new window.Ripple(
        "#ripple",
        Object.assign({cover: "/", rippleColor: "#ffffff"})
      )
    }
  }

  const initBScroll = () => {
    if (!lyricScrollRef.current) {
      // https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#resizepolling
      lyricScrollRef.current = new BScroll("#_lyricScroll", {
        mouseWheel: true,
        scrollY: true,
        scrollbar: true,
        // probeType: 3,
        probeType: 0,
        dblclick: true,
        click: true
      })
      console.log("lyricScrollRef", lyricScrollRef)
    }
  }

  useEffect(() => {
    // 初始化动效
    initRipple()
    // 初始化BScroll
    initBScroll()
  }, [])

  useEffect(() => {
    if (rippleRef.current) {
      rippleRef.current.setCover(songObj.backgroundImg!)
      rippleRef.current.cancelAnimate()
    }
    if (lyricScrollRef.current) {
      lyricScrollRef.current.refresh()
    }
  }, [songObj.backgroundImg])

  useEffect(() => {
    if (rippleRef.current) {
      isPlay ? rippleRef.current.animate() : rippleRef.current.cancelAnimate()
    }
  }, [isPlay])

  return (
    <Flex
      gap={24}
      vertical
      className={classnames(
        "pb-[20px] fixed top-[60px] bottom-[75px] left-0 right-0 px-[24px] bg-[#f9f9f9] z-[1000] overflow-x-hidden overflow-y-scroll transition-transform ",
        showPlayer ? "transform-none" : "translate-y-[105%]"
      )}>
      <Flex justify="space-between" gap={48}>
        <div className="pt-[80px] flex justify-center relative">
          <img className="absolute w-[32px] top-[-16px] left-[50%] z-[100]" src={node} />
          <img
            className={classnames(
              " absolute top-[3px] w-[100px] origin-[0_0] transition-all z-[1]  left-[53%]",
              isPlay ? "rotate-[-12deg]" : " rotate-[-40deg] t-[6px]"
            )}
            src={bar}
          />
          <div className="w-[320px] h-[320px] bg-[#e6e5e6] rounded-[50%] flex items-center justify-center flex-row">
            <div
              className={classnames(
                "w-[300px] h-[300px] bg-[#e6e5e6] bg-gradient-to-br from-[#333540] from-10% via-[#070708] via-50%  to-[#333540] to-90%  flex justify-center items-center rounded-[50%] m-[10px]"
              )}>
              <div id="ripple" className={classnames("!w-[300px] !h-[300px]")} />
            </div>
          </div>
        </div>
        <Flex vertical flex={1} gap={20} className={classnames("pt-[50px] pl-[40px]")}>
          <span className="text-[24px] font-[600] text-[#363D62] self-center">{songObj.name}</span>

          <span className="text-[#7D829E] text-[18px] self-center line-clamp-1">
            {songObj.singerArr?.join("/")}
          </span>

          <div id="_lyricScroll" className="playerWrapper overflow-hidden relative h-[280px]">
            <Flex vertical gap={14} align="center" className=" pt-[10px] pb-[20px] ">
              {[...lyric.values()].map(([time, text], index: number) => {
                const active = text === activeLyric
                return (
                  <span
                    key={`${index}_${time}`}
                    className={classnames(
                      "text-[14px]",
                      {
                        _activeLyric: active
                      },
                      active && "text-[16px] text-[#000101] font-[700]"
                    )}>
                    {text}
                  </span>
                )
              })}
            </Flex>
          </div>
        </Flex>
        <Flex vertical gap={24} className="pt-[50px] w-[400px]">
          <span className="text-[#262727] text-[18px]">包含这首歌的歌单</span>
          <Spin className=" min-h-[100px]" spinning={loading} tip="Loading..." delay={500}>
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
                      <span className="text-[#262626] line-clamp-1">{item.name}</span>
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
          <span className="text-[#262727] text-[18px]">相似歌曲</span>
          <Spin spinning={loading} tip="Loading..." delay={500} className=" min-h-[100px]">
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
                        <span className="text-[#262626] line-clamp-1">{item.name}</span>
                        {item.alias && Array.isArray(item.alias) && item.alias.length !== 0 && (
                          <span className="text-[#838384] line-clamp-1">({item.alias.join()})</span>
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
