/** @format */

import {useEffect, useState} from "react"
import {Tag, Button, Tabs, message, Spin, Flex, Divider, Tooltip, TabsProps} from "antd"
import {
  PlayCircleOutlined,
  ShareAltOutlined,
  CheckOutlined,
  PlusOutlined,
  FolderAddOutlined,
  HeartOutlined
} from "@ant-design/icons"
import {useParams, history} from "@umijs/max"
import dayjs from "dayjs"
import {album, dynamic, Song, AlbumInfo, IDynamicRes, subAlbum} from "@/api/album"
import coverall from "@/assets/coverall.png"
import {Artists, Image, Comment, PlayStatus} from "@/components"
import Utils from "@/help"
import classNames from "classnames"
import {CommentTypeEnum} from "@/types/comment"
import {useGetSongInfo} from "@/store/player"

const Album = () => {
  const {id = ""} = useParams()
  const [songList, setSongList] = useState<Song[]>([])
  const [albumInfo, setAlbumInfo] = useState<Partial<AlbumInfo>>({})
  const [dynamicInfo, setDynamicInfo] = useState<Partial<IDynamicRes>>({})
  const [loading, setLoading] = useState(false)
  const getSongInfo = useGetSongInfo()

  const getAlbum = async () => {
    try {
      const res = await album({id})
      setSongList(res.data.songs)
      setAlbumInfo(res.data.album)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getDynamic = async () => {
    try {
      const res = await dynamic({id})
      setDynamicInfo(res.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const onSub = async (t: 0 | 1) => {
    try {
      setLoading(true)
      const res = await subAlbum({id, t})
      if (res.data.code === 200) {
        await getDynamic()
        setLoading(false)
        return message.success(t === 0 ? "专辑取消收藏成功" : "专辑已收藏")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    setLoading(true)
    Promise.race([getAlbum(), getDynamic()]).finally(() => setLoading(false))
  }, [])

  const renderSongList = () => {
    return (
      <Flex vertical gap={12}>
        <Flex align="center" gap={12}>
          <div className="  w-[5%]"></div>
          <div className=" w-[50%]">音乐标题</div>
          <div className="w-[20%]">歌手</div>
          <div className=" w-[20%]">专辑</div>
          <div className=" w-[5%] ">时长</div>
        </Flex>
        <Flex vertical>
          {songList.map((item, index) => {
            return (
              <Flex
                onClick={() => getSongInfo(item.id)}
                align="center"
                gap={12}
                className={classNames(
                  {"bg-[#F9F9F9]": index % 2 === 0},
                  "py-[8px]",
                  "hover:bg-[#EEEFF0]"
                )}>
                <Flex justify="space-between" className="w-[5%]">
                  <PlayStatus id={item.id} className=" pl-[12px]">
                    <span className="pl-[12px]">{Utils.generateIndex(index)}</span>
                  </PlayStatus>
                  <HeartOutlined />
                </Flex>
                <Flex gap={4} align="center" className=" w-[50%]">
                  <span className="">{item.name}</span>
                  <Flex flex={1} align="center">
                    {item.alia.length !== 0 && (
                      <span className="text-[#878888]  line-clamp-1">{`(${item?.alia?.join()})`}</span>
                    )}
                    {item?.sq && (
                      <Tag
                        className="!px-[2px] !leading-[14px] !text-[12px]"
                        color="red"
                        bordered={false}>
                        SQ
                      </Tag>
                    )}
                    {!!item?.mv && (
                      <PlayCircleOutlined
                        onClick={(e) => {
                          e.stopPropagation()
                          history.push(`/mv-detail/${item.mv}`)
                        }}
                        className="text-[#C82D2D]"
                      />
                    )}
                  </Flex>
                </Flex>
                <div className="w-[20%]">
                  <Artists data={item?.ar} />
                </div>
                <div className=" w-[20%] text-[#525353] hover:text-[#252526] cursor-pointer">
                  {item?.al?.name}
                </div>
                <div className="w-[5%] text-[#ADADAE]">{Utils.formatSeconds(item?.dt)}</div>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    )
  }

  const items: TabsProps["items"] = [
    {
      key: "songList",
      label: "歌曲列表",
      children: renderSongList()
    },
    {
      key: "comment",
      label: dynamicInfo?.commentCount ? `评论(${dynamicInfo?.commentCount || 0})` : "评论",
      children: <Comment id={Number(id)} type={CommentTypeEnum.album} />
    },
    {
      key: "detail",
      label: "专辑详情",
      children: (
        <Flex vertical gap={24}>
          <span className=" font-bold">专辑介绍</span>
          <p className="text-[#999999] whitespace-pre-line leading-[40px]">
            {albumInfo?.description}
          </p>
        </Flex>
      )
    }
  ]

  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
        <Flex gap={24}>
          <div
            style={{
              backgroundRepeat: "no-repeat",
              background: `url(${coverall})`,
              backgroundPosition: "0 -986px"
            }}
            className=" rounded-[5px] w-[209px] h-[177px]">
            <Image
              className="cursor-pointer rounded-[5px]"
              src={albumInfo.picUrl}
              height={177}
              size={[177, 177]}
              multiple={2}
            />
          </div>
          <Flex flex={1} vertical gap={12}>
            <Flex gap={4} align="center">
              <Tag color="red" bordered={false}>
                专辑
              </Tag>
              <span className="text-[18px] font-[600] text-[#262627]">{albumInfo?.name}</span>
            </Flex>

            <Flex gap={4} align="center">
              <Button icon={<PlayCircleOutlined />} type="primary">
                <div className=" inline-flex gap-[4px] items-center">
                  <span> 播放全部</span>
                  <Divider type="vertical" />
                  <Tooltip title="添加全部到播放列表">
                    <PlusOutlined />
                  </Tooltip>
                </div>
              </Button>
              <Button
                loading={loading}
                onClick={() => onSub(dynamicInfo?.isSub ? 0 : 1)}
                icon={dynamicInfo?.isSub ? <CheckOutlined /> : <FolderAddOutlined />}
                type="primary">
                {dynamicInfo?.isSub ? "已收藏" : "收藏"}(
                {Utils.tranNumber(dynamicInfo?.subCount, 0)})
              </Button>
              <Button icon={<ShareAltOutlined />} type="primary">
                分享({Utils.tranNumber(dynamicInfo?.shareCount, 0)})
              </Button>
            </Flex>

            <Flex gap={8} vertical>
              <Flex align="center">
                <span className="text-[#363D62]">歌手：</span>
                <Artists data={albumInfo.artists!} />
              </Flex>
              <Flex align="center">
                <span className="text-[#363D62]">时间：</span>
                <span>{dayjs(albumInfo.publishTime).format("YYYY-MM-DD")}</span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} />
      </Flex>
    </Spin>
  )
}

export default Album
