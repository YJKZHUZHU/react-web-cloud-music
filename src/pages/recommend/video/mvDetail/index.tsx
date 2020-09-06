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
  CheckCircleOutlined
} from "@ant-design/icons"

import {message, Select, Avatar, Button, Tooltip} from "antd"
import {useRequest} from "ahooks"
import API from "@/api"
import Utils from "@/help"
import SimiItem from "../components/SimiItem"
import Artists, {IItem} from "@/components/Artists"
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
  artists: IItem[]
  isReward: boolean
  commentThreadId: string
  subed: boolean
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
  subed: false
}
const BRS_MAP: {[propsName: string]: string} = {
  "240": "标清",
  "480": "高清",
  "720": "超清",
  "1080": "1080P"
}
const MvDetail: FC = () => {
  const playRef = useRef<any>(null)
  const {query} = history.location
  const [sourceValue, setSourceValue] = useState("")
  const [source, setSource] = useState("")
  const [showDesc, setShowDesc] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const {data, run} = useRequest(() => API.getMvDetail({...query, loading: true}), {
    manual: true,
    initialData: initValue,
    formatResult: (response: any): MvDetailInterface => {
      setSource(Object.values(response.data.brs as object)[0])
      setSourceValue(Object.keys(response.data.brs as object)[0])
      return {
        ...response.data,
        subed: response.subed
      }
    }
  })
  const {run: runSub} = useRequest(() => API.setMvSub({...query, t: data?.subed ? -1 : 1}), {
    manual: true,
    onSuccess: (response) => {
      message.success(response.message)
      run()
    }
  })
  const {run: runLike} = useRequest(() => API.setResourceLike({type: 1, id: query.mvid, t: 1}), {
    manual: true,
    onSuccess: () => {
      run()
    }
  })

  const onSelect = (value: any) => {
    setSourceValue(value)
    setSource(data?.brs[value])
    setAutoPlay(true)
    playRef.current.load()
  }

  const onLike = () => {
    API.setResourceLike({type: 1, id: query.mvid, t: 1})
  }

  useEffect(() => {
    run()
    if (playRef) {
      console.log(111)
      playRef.current.load()
    }
  }, [query])

  return (
    <div className={styles._mvDetail}>
      <div className={styles.left}>
        <p className={styles.title} onClick={() => history.goBack()}>
          <LeftOutlined />
          <span className={styles.name}>MV详情</span>
        </p>
        <Player
          autoPlay={autoPlay}
          src={source}
          poster={data?.cover}
          ref={(player: any) => (playRef.current = player)}>
          <BigPlayButton position="center" className={styles.btn} />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1.0, 0.75, 0.5]} />
            <VolumeMenuButton vertical />
            <ReplayControl econds={15} order={2.1} />
            <ForwardControl econds={15} order={3.2} />
            {sourceValue ? (
              <Select
                value={sourceValue}
                bordered={false}
                style={{width: 80}}
                onChange={onSelect}
                showArrow={false}
                className={styles.select}
                size="small">
                {Object.keys(data?.brs as object)
                  .reverse()
                  .map((item) => {
                    return (
                      <Option value={item} key={item}>
                        {BRS_MAP[item]}
                      </Option>
                    )
                  })}
              </Select>
            ) : null}
          </ControlBar>
        </Player>
        <p className={styles.avatar}>
          <Avatar size={64} icon={<UserOutlined />} src={data?.cover} alt="暂无图片哦" />
          <span className={styles.singer}>
            <Artists data={data?.artists as IItem[]} />
          </span>
        </p>
        <div className={styles.songDesc}>
          <p className={styles.title} onClick={() => setShowDesc(!showDesc)}>
            <span className={styles.songName}>{data?.name}</span>
            {!!data?.desc ? <>{showDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}</> : null}
          </p>
          <p className={styles.publish}>
            <span>发布：{data?.publishTime}</span>
            <span>播放：{Utils.tranNumber(data?.playCount as number, 0)}</span>
          </p>
          {showDesc ? (
            <p className={styles.desc} title={data?.desc}>
              {data?.desc}
            </p>
          ) : null}
        </div>
        <div className={styles.mvBtn}>
          <Tooltip title="暂时不支持哦...">
            <Button shape="round" onClick={runLike} disabled>
              <LikeOutlined />
              赞({data?.likeCount})
            </Button>
          </Tooltip>

          <Button shape="round" onClick={runSub}>
            {data?.subed ? <CheckCircleOutlined /> : <FolderAddOutlined />}
            {data?.subed ? "已收藏" : "收藏"}({data?.subCount})
          </Button>

          <Button shape="round">
            <ShareAltOutlined />
            分享({data?.shareCount})
          </Button>
        </div>
        <MvComment id={query.mvid} />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>相关推荐</p>
        <SimiItem />
      </div>
    </div>
  )
}

export default MvDetail
