/** @format */

import {useEffect, useRef} from "react"
import {history} from "@umijs/max"
import classnames from "classnames"
import {Flex, Spin} from "antd"
import {Artists, Image} from "@/components"
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

interface Props {
  className?: string
}

const PlayerLayout = (props: Props) => {
  const {className} = props
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
      rippleRef.current.setCover(`${songObj.backgroundImg!}?param=400y400`)
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
        showPlayer ? "transform-none" : "translate-y-[120%]",
        className
      )}>
      <Flex justify="space-between" gap={48}>
        <div className="pt-[80px] flex justify-center relative">
          <img alt="" className="absolute w-[32px] top-[-16px] left-[50%] z-[100]" src={node} />
          <img
            alt=""
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
          <Artists className=" self-center " data={songObj.singerArr!} />

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
                      width={50}
                      height={50}
                      size={[50, 50]}
                      multiple={2}
                      src={item?.coverImgUrl}
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
                      size={[50, 50]}
                      multiple={2}
                      src={item?.album.picUrl}
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
