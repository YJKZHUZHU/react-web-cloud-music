/** @format */

import React, {FC, useEffect, useState, useRef} from "react"
import MvComment from "../components/MvComment"
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
  CommentOutlined,
  CheckCircleOutlined
} from "@ant-design/icons"
import API from "@/api"
import Utils from "@/help"
import {message, Select, Avatar, Button, Tooltip} from "antd"
import SimiItem, {SimiInterface} from "../components/SimiItem"
import styles from "../index.scss"

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
  const [showDesc, setShowDesc] = useState(false)
  const [collect, setCollect] = useState(false)
  const getData = () => {
    Promise.all([API.getMvDetail(query), API.getMvUrl({id: query.mvid}), API.getSimi(query)]).then(
      (res) => {
        if (res[0].code === 200 && res[1].code === 200 && res[2].code === 200) {
          setSourceValue(Object.keys(res[0].data.brs)[0])
          setSource(Object.values(res[0].data.brs)[0] as string)
          setSime(res[2].mvs)
          setCollect(res[0].subed)
          return setData({...res[0].data, url: res[1].data.url})
        }
        return message.info("稍后再试")
      }
    )
  }
  const onRef = (player: any) => setPlayer(player)

  useEffect(() => {
    getData()
  }, [query])

  const onSelect = (value: any) => {
    setSourceValue(value)
    setSource(data.brs[value])
    player.load()
  }

  const onSubMv = async (t: number) => {
    const Ret = await API.setMvSub({...query, t})
    if (Ret.code === 200) {
      message.success(Ret.message)
      // 为了不再次请求数据，当返回状态吗200，前端设置收藏状态
      setCollect(!collect)
    }
  }
  const onLike = () => {
    // API.setResourceLike({id:query.mvid,t:})
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
        <div className={styles.songDesc}>
          <p className={styles.title} onClick={() => setShowDesc(!showDesc)}>
            <span className={styles.songName}>{data.name}</span>
            {!!data.desc ? <>{showDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}</> : null}
          </p>
          <p className={styles.publish}>
            <span>发布：{data.publishTime}</span>
            <span>播放：{Utils.tranNumber(data.playCount, 0)}</span>
          </p>
          {showDesc ? (
            <p className={styles.desc} title={data.desc}>
              {data.desc}
            </p>
          ) : null}
        </div>
        <div className={styles.mvBtn}>
          <Tooltip title='暂时不支持哦...'>
            <Button shape="round" disabled>
              <LikeOutlined />
              赞({data.likeCount})
            </Button>
          </Tooltip>

          {collect ? (
            <Button shape="round" onClick={() => onSubMv(0)}>
              <CheckCircleOutlined />
              已收藏({data.subCount})
            </Button>
          ) : (
            <Button shape="round" onClick={() => onSubMv(1)}>
              <FolderAddOutlined />
              收藏({data.subCount})
            </Button>
          )}

          <Button shape="round">
            <ShareAltOutlined />
            分享({data.shareCount})
          </Button>
        </div>
        <MvComment id={query.mvid} />
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
