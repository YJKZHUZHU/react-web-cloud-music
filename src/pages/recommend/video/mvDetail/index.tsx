/** @format */

import React, {FC, useEffect, useState, useRef} from "react"
import {history} from "umi"
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  ReplayControl,
  ForwardControl
} from "video-react"
import {
  LeftOutlined,
  UserOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  LikeOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  CommentOutlined
} from "@ant-design/icons"
import API from "@/api"
import Utils from "@/help"
import {message, Select, Avatar, Button} from "antd"
import SimiItem,{SimiInterface} from '../components/SimiItem'
import styles from "../index.scss"
import SimiDetail from '../components/SimiItem'

const {Option} = Select

interface MvDetailInterface {
  id: string
  name: string
  artistId: number
  artistName: string
  briefDesc: string
  desc: string
  cover: string
  coverId: string
  playCount: number
  subCount: number
  shareCount: number
  likeCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  brs: {[propsNameL: string]: any}
  artists: {id: string; name: string}[]
  isReward: boolean
  commentThreadId: string
  url: string
}

const initValue = {
  id: "",
  name: "",
  artistId: 0,
  artistName: "",
  briefDesc: "",
  desc: "",
  cover: "",
  coverId: "",
  playCount: 0,
  subCount: 0,
  shareCount: 0,
  likeCount: 0,
  commentCount: 0,
  duration: 0,
  nType: 0,
  publishTime: "",
  brs: {},
  artists: [],
  isReward: false,
  commentThreadId: "",
  url: ""
}
const BRS_MAP: {[propsName: string]: string} = {
  "240": "标清",
  "480": "高清",
  "720": "超清",
  "1080": "1080P"
}
const MvDetail: FC = () => {
  const {query} = history.location
  const [data, setData] = useState<MvDetailInterface>(initValue)
  const [simi, setSime] = useState<SimiInterface[]>([]) //相似mv
  const [player, setPlayer] = useState<any>(null)
  const [sourceValue, setSourceValue] = useState("")
  const [source, setSource] = useState("")
  const getData = () => {
    Promise.all([API.getMvDetail(query), API.getMvUrl({id: query.mvid}),API.getSimi(query)]).then((res) => {
      console.log(res[2])
      if (res[0].code === 200 && res[1].code === 200 && res[2].code === 200) {
        setSourceValue(Object.keys(res[0].data.brs)[0])
        setSource(Object.values(res[0].data.brs)[0] as string)
        setSime(res[2].mvs)
        return setData({...res[0].data, url: res[1].data.url})
      }
      return message.info("稍后再试")
    })
  }
  const onRef = (player: any) => {
    setPlayer(player)
  }

  useEffect(() => {
    getData()
  }, [query])

  const onSelect = (value: any) => {
    setSourceValue(value)
    setSource(data.brs[value])
    player.load()
  }

  return (
    <div className={styles._mvDetail}>
      <div className={styles.left}>
        <p className={styles.title} onClick={() => history.goBack()}>
          <LeftOutlined />
          <span className={styles.name}>MV详情</span>
        </p>
        <Player src={source} poster={data.cover} ref={onRef}>
          <BigPlayButton position="center" className={styles.btn} />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1.0, 0.75, 0.5]} />
            <VolumeMenuButton vertical />
            <ReplayControl econds={15} order={2.1} />
            <ForwardControl econds={15} order={3.2} />
            <Select
              value={sourceValue}
              bordered={false}
              style={{width: 80}}
              onChange={onSelect}
              showArrow={false}
              className={styles.select}
              size="small">
              {Object.keys(data.brs)
                .reverse()
                .map((item) => {
                  console.log(item)
                  return (
                    <Option value={item} key={item}>
                      {BRS_MAP[item]}
                    </Option>
                  )
                })}
            </Select>
          </ControlBar>
        </Player>
        <p className={styles.avatar}>
          <Avatar size={64} icon={<UserOutlined />} src={data.cover} alt="暂无图片哦" />
          <span className={styles.singer}>{Utils.formatName(data.artists)}</span>
        </p>
        <div>
          <p>
            {data.name}
            <CaretUpOutlined />
            <CaretDownOutlined />
          </p>
          <p>
            <span>发布：{data.publishTime}</span>
            <span>播放：{Utils.tranNumber(data.playCount, 0)}</span>
          </p>
          <p>{data.desc}</p>
        </div>
        <div>
          <Button>
            <LikeOutlined />
            赞({data.likeCount})
          </Button>
          <Button>
            <FolderAddOutlined />
            已收藏({data.subCount})
          </Button>
          <Button>
            <ShareAltOutlined />
            分享({data.shareCount})
          </Button>
          <Button>
            <CommentOutlined />
            评论({data.commentCount})
          </Button>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.title}>相关推荐</p>
        {simi.map((item) => (
          <SimiItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default MvDetail
