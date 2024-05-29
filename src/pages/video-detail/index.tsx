/** @format */

import {FC, useEffect, useState, useRef, useMemo} from "react"
import {history, useParams} from "@umijs/max"
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  MenuButton,
  ReplayControl,
  ForwardControl,
  PlayerReference,
  PlayToggle
} from "video-react"
import empty from "@/assets/empty.png"
import {
  LeftOutlined,
  UserOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  LikeOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  CaretRightOutlined
} from "@ant-design/icons"
import {Button, Skeleton, Flex, Empty} from "antd"
import Utils from "@/help"
import {Artists, Image, Tag, Comment} from "@/components"
import {
  videoDetail,
  videoDetailInfo,
  videoUrl,
  relatedAllvideo,
  IArtistsItem,
  IVideoGroupItem,
  BrlLevelEnum,
  MVItem,
  VideoGroupItem
} from "@/api/video"
import classNames from "classnames"
import {CommentTypeEnum} from "@/types/comment"
import dayjs from "dayjs"

export const MapBrs = new Map<BrlLevelEnum, string>()
  .set(BrlLevelEnum.low, "标清")
  .set(BrlLevelEnum.high, "高清")
  .set(BrlLevelEnum.super, "超清")
  .set(BrlLevelEnum["1080p"], "1080p")

interface IDetail {
  img: string
  artists: {
    userName?: string
    userId?: string | number
  }[]
  // nickname:string
  name: string
  desc: string
  publishTime: string
  playCount: number
  videoGroup: VideoGroupItem[]
  likedCount: number
  liked: boolean
  shareCount: number
  subCount: number
  [prop: string]: any
}

const MvDetail: FC = () => {
  const {vid} = useParams()
  const playRef = useRef<PlayerReference | null>(null)
  const [loading, setLoading] = useState(false)

  const [br, setBr] = useState(BrlLevelEnum["1080p"]) // 默认1080p
  const [brs, setBrs] = useState<{label: string; value: BrlLevelEnum}[]>([])
  const [mvUrlInfo, setMvUrlInfo] = useState<{[prop: number]: string}>()
  const [showDesc, setShowDesc] = useState(false)
  const [detail, setDetail] = useState<IDetail>()

  const [mvList, setMvList] = useState<MVItem[]>([])

  const getMvUrl = async (t?: BrlLevelEnum) => {
    try {
      const res = await videoUrl({id: vid!, t})
      const r = res.data?.urls.at(0)?.r!
      const url = res.data?.urls.at(0)?.url!
      setMvUrlInfo({
        ...mvUrlInfo,
        [t || r]: url
      })

      setBr(t || r)
    } catch (error) {
      console.log("error", error)
    }
  }
  const getmvDetail = async () => {
    try {
      setLoading(true)
      const res = await videoDetail({id: vid!})
      const countRes = await videoDetailInfo({vid: vid!})
      const simiMvRes = await relatedAllvideo({id: vid!})

      setMvList(simiMvRes?.data || [])

      setDetail({
        img: res?.data?.avatarUrl,
        artists: [{userId: res.data?.creator?.userId, userName: res.data?.creator?.nickname}],
        name: res.data?.title,
        desc: res?.data?.description || "",
        publishTime: dayjs(res?.data?.publishTime).format("YYYY-MM-DD HH:mm:ss"),
        playCount: res?.data?.playTime,
        videoGroup: res?.data?.videoGroup,
        subCount: res?.data?.subscribeCount,
        likedCount: countRes?.data.likedCount,
        liked: countRes?.data.liked,
        shareCount: countRes?.data.shareCount
      })

      const result = res.data?.resolutions?.map((item) => {
        return {
          label: MapBrs.get(item.resolution)!,
          value: item.resolution
        }
      })
      setBrs(result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onSelectItem = async (index: number) => {
    try {
      const target = brs.at(index)?.value!
      if (target === br) return
      if (mvUrlInfo && mvUrlInfo[target]) {
        setBr(target)
      } else {
        await getMvUrl(target)
      }
      const state = playRef.current?.getState()! as any

      playRef.current?.load()
      playRef.current?.seek(state?.player?.currentTime)
      playRef.current?.play()
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (vid) {
      getMvUrl()
      getmvDetail()
    }
  }, [vid])

  const renderIcon = () => {
    if (!detail?.desc) return null
    if (showDesc) return <CaretUpOutlined onClick={() => setShowDesc(false)} />
    return <CaretDownOutlined onClick={() => setShowDesc(true)} />
  }
  const renderDesc = () => {
    if (detail?.desc && showDesc) {
      return (
        <div className="text-[#262626] text-[14px] leading-[18px] line-clamp-4 w-[620px]">
          {detail?.desc}
        </div>
      )
    }
    return null
  }

  const url = useMemo(() => {
    return mvUrlInfo ? mvUrlInfo[br] : ""
  }, [mvUrlInfo, br])

  const renderMvList = () => {
    if (!loading && mvList?.length === 0) {
      return (
        <Empty
          imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
          style={{height: 620}}
          image={empty}
          description="暂无相似视频"
        />
      )
    }
    if (loading) {
      return (
        <Flex vertical flex={1}>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <Flex key={item} gap={4} className="px-[12px]">
                <Skeleton.Image style={{height: 60, width: 100}} active></Skeleton.Image>
                <Flex vertical flex={1}>
                  <Skeleton title={{width: "80%"}} active paragraph={{rows: 0}}></Skeleton>
                  <Skeleton active paragraph={{rows: 0}}></Skeleton>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      )
    }

    return (
      <Flex flex={1} vertical>
        {mvList?.map((item, index) => {
          return (
            <Flex
              key={item.id}
              onClick={() => history.push(`/mv-detail/${item.id}`)}
              gap={4}
              className={classNames(
                "px-[12px] rounded-[5px] py-[8px]",
                {
                  "bg-[#F9F9F9]": index % 2 === 0
                },
                "hover:bg-[#EEEFF0] hover:cursor-pointer"
              )}>
              <div className={classNames("relative w-[100px] h-[60px]")}>
                <Image
                  width={100}
                  height={60}
                  src={item?.cover}
                  size={[100, 60]}
                  multiple={2}
                  className="w-[100px] h-[60px]"
                />
                <Flex
                  justify="end"
                  className="text-[#ffffff] text-[12px] absolute w-full top-[4px] px-[8px]">
                  <CaretRightOutlined />
                  <span>{Utils.tranNumber(item.playCount, 2)}</span>
                </Flex>
                <div className="text-[#ffffff] text-[12px] absolute w-full bottom-[4px] px-[8px] text-right">
                  {Utils.formatSeconds(item.duration)}
                </div>
              </div>
              <Flex vertical flex={1} justify="space-between">
                <div className=" text-[14px] flex-1 line-clamp-2 leading-[16px]">{item?.name}</div>
                <Artists className="text-[14px]" data={item?.artists} />
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    )
  }

  return (
    <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex
        className=" w-max cursor-pointer text-[#262626]"
        align="center"
        gap={4}
        onClick={() => history.back()}>
        <LeftOutlined />
        <span>视频详情</span>
      </Flex>

      <Flex gap={18} justify="space-between">
        <Flex gap={12} vertical className="w-[620px]">
          <div className="h-[405px] w-full">
            <Player
              className="!pt-[0px] !h-[inherit] rounded-[15px]"
              fluid={true}
              autoPlay
              width={620}
              height={405}
              src={url}
              ref={(player) => {
                playRef.current = player
              }}>
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar className=" rounded-b-[15px]" autoHide={false}>
                <PlayToggle />
                <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1.0, 0.75, 0.5]} />
                <VolumeMenuButton vertical />
                <ReplayControl seconds={10} />
                <ForwardControl seconds={10} />
                <MenuButton
                  selectedIndex={brs?.findIndex((item) => item.value === br)}
                  onSelectItem={onSelectItem}
                  className=" !w-max !flex !justify-center !items-center"
                  items={brs}>
                  {MapBrs.get(br)}
                </MenuButton>
              </ControlBar>
            </Player>
          </div>

          <Flex vertical gap={12} className="w-[620px]">
            {loading ? (
              <Skeleton active avatar paragraph={{rows: 0}} />
            ) : (
              <Flex gap={12} align="center" className=" mb-[12px]">
                <Image
                  src={detail?.img}
                  width={50}
                  height={50}
                  size={[50, 50]}
                  multiple={2}
                  className="w-[50px] h-[50px] rounded-[50%]"
                />
                <Artists type="user" color="#575757" hoverColor="#2C2D2D" data={detail?.artists!} />
              </Flex>
            )}
            {loading ? (
              <Skeleton active paragraph={{rows: 3}}></Skeleton>
            ) : (
              <>
                <Flex gap={12} align="center" className="text-[#262626]">
                  <span className="text-[#262626] text-[20px] font-bold">{detail?.name}</span>
                  {renderIcon()}
                </Flex>
                <Flex align="center" gap={24} className="text-[#B0B2B2] text-[14px]">
                  <span>发布：{detail?.publishTime}</span>
                  <span>播放：{Utils.tranNumber(detail?.playCount, 2)}</span>
                </Flex>
                {renderDesc()}
                <Flex gap={8} align="center" wrap>
                  {detail?.videoGroup.map((item) => {
                    return <Tag key={item.id}>{item.name}</Tag>
                  })}
                </Flex>
                <Flex gap={12} align="center" className=" mt-[12px]">
                  <Button icon={<LikeOutlined />} shape="round">
                    {detail?.liked ? "已赞" : "赞"}({detail?.likedCount})
                  </Button>

                  <Button
                    icon={detail?.subed ? <CheckCircleOutlined /> : <FolderAddOutlined />}
                    shape="round">
                    {detail?.subed ? "已收藏" : "收藏"}({detail?.subCount})
                  </Button>

                  <Button icon={<ShareAltOutlined />} shape="round">
                    分享({detail?.shareCount})
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
          <Comment id={vid!} type={CommentTypeEnum.video} />
        </Flex>

        <Flex flex={1} vertical gap={12}>
          <span className="text-[#262626]">相似视频</span>
          {renderMvList()}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MvDetail
