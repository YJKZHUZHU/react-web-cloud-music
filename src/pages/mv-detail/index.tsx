/** @format */

import React, {FC, useEffect, useState, useRef} from "react"
import {history, useLocation} from "umi"
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
import {message, Select, Avatar, Button, Tag, Space} from "antd"
import {useRequest} from "ahooks"
import classnames from "classnames"
import moment from 'moment'
import API from "@/api"
import Utils from "@/help"
import SimiItem from "./SimiItem"
import {Artists, NewComment, HotComment} from "@/components"
import {IItem} from "@/components/Artists"
import styles from "./index.scss"

const {Option} = Select

interface IMvDetailInfo {
  likedCount: number
  shareCount: number
  commentCount: number
  liked: boolean
}
interface IBrItem {
  size: number
  br: number
  point: number
}
interface IVideoGroup {
  id: number
  name: string
  type: number
}

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
  praisedCount: number
  subCount: number
  shareCount: number
  likeCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  brs: IBrItem[]
  artists: IItem[]
  isReward: boolean
  commentThreadId: string
  videoGroup: IVideoGroup[]
  resolutions: any[]
  coverUrl: string
  creator: any
  description: string
  title: string
}

interface IData {
  data: MvDetailInterface
  subed: boolean
}

interface IMvUrl {
  code: number
  expi: number
  fee: number
  id: number
  md5: string
  msg: string
  mvFee: number
  promotionVo: any
  r: number
  size: number
  st: number
  url: string
}

const BRS_MAP: {[propsName: string]: string} = {
  "240": "标清",
  "480": "高清",
  "720": "超清",
  "1080": "1080P"
}

const MvDetail: FC = () => {
  const playRef = useRef<any>(null)
  const location:any = useLocation()
  const {query} = location
  const [showDesc, setShowDesc] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const {run: runMvurl, data: mvUrlData} = useRequest<{data: IMvUrl; code: number; urls: any[]}>(
    (r?: any) =>
      +query.type === 0 ? API.getMvUrl({id: query.mvid, r}) : API.getVedioUrl({id: query.mvid, r}),
    {
      manual: true,
      onSuccess: () => {
        setAutoPlay(true)
        playRef.current.load()
      }
    }
  )
  const {run: runMvDetailInfo, data: mvDetailInfo} = useRequest<IMvDetailInfo>(
    () =>
      +query.type === 0
        ? API.getMvDetailInfo({...query})
        : API.getVedioDetailInfo({vid: query.mvid}),
    {
      manual: true
    }
  )
  const {data, run} = useRequest<IData>(
    () =>
      +query.type === 0
        ? API.getMvDetail({...query, loading: true})
        : API.getVedioDetail({id: query.mvid, loading: true}),
    {
      manual: true
    }
  )
  const {run: runSub} = useRequest(() => API.setMvSub({...query, t: data?.subed ? -1 : 1}), {
    manual: true,
    onSuccess: (response) => {
      message.success(response.message)
      run()
    }
  })
  const {run: runLike} = useRequest(
    (t: number) => API.setResourceLike({type: 1, id: query.mvid, t}),
    {
      manual: true,
      onSuccess: () => {
        runMvDetailInfo()
      }
    }
  )

  useEffect(() => {
    run()
    runMvurl()
    runMvDetailInfo()
    if (playRef) {
      playRef.current.load()
    }
  }, [query])

  return (
    <div className={styles._mvDetail}>
      <div className={styles.left}>
        <p className={styles.title} onClick={() => history.goBack()}>
          <LeftOutlined />
          <span className={styles.name}>{+query.type === 0 ? "MV详情" : "视频详情"}</span>
        </p>
        <Player
          fluid={false}
          height={500}
          width="100%"
          autoPlay={autoPlay}
          src={+query.type === 0 ? mvUrlData?.data?.url : mvUrlData?.urls[0]?.url}
          poster={data?.data?.cover}
          ref={(player: any) => (playRef.current = player)}>
          <BigPlayButton position="center" className={styles.btn} />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1.0, 0.75, 0.5]} />
            <VolumeMenuButton vertical />
            <ReplayControl econds={15} order={2.1} />
            <ForwardControl econds={15} order={3.2} />
            <Select
              value={+query.type === 0 ? mvUrlData?.data?.r : mvUrlData?.urls[0]?.r}
              bordered={false}
              style={{width: 80}}
              onChange={(value) => runMvurl(value)}
              showArrow={false}
              className={styles.select}
              size="small">
              {+query.type === 0
                ? data?.data?.brs.reverse().map((item) => {
                    return (
                      <Option value={item.br} key={item.br}>
                        {BRS_MAP[item.br]}
                      </Option>
                    )
                  })
                : data?.data?.resolutions.reverse().map((item) => {
                    return (
                      <Option value={item.resolution} key={item.resolution}>
                        {BRS_MAP[item.resolution]}
                      </Option>
                    )
                  })}
            </Select>
          </ControlBar>
        </Player>
        <p className={styles.avatar}>
          <Space>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={+query.type === 0 ? data?.data?.cover : data?.data?.coverUrl}
              alt="暂无图片哦"
            />
            {+query.type === 0 ? (
              <span className={styles.singer}>
                <Artists data={data?.data?.artists as IItem[]} />
              </span>
            ) : (
              <span className={styles.singer}>{data?.data?.creator?.nickname}</span>
            )}
          </Space>
        </p>
        <div className={styles.songDesc}>
          <p className={styles.title} onClick={() => setShowDesc(!showDesc)}>
            <span className={styles.songName}>
              {+query.type === 0 ? data?.data?.name : data?.data?.title}
            </span>
            {!!data?.data?.desc ? (
              <>{showDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}</>
            ) : null}
            {!!data?.data?.description ? (
              <>{showDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}</>
            ) : null}
          </p>
          <p className={styles.publish}>
            <span>发布：{data?.data?.publishTime}</span>
            <span>播放：{Utils.tranNumber(data?.data?.playCount, 0)}</span>
          </p>
          {showDesc ? (
            <p className={styles.desc} title={data?.data?.desc}>
              {+query.type === 0 ? data?.data?.desc : !!data?.data?.description}
            </p>
          ) : null}
        </div>
        <Space className={styles.mvTag}>
          {data?.data?.videoGroup.map((item) => {
            return <Tag key={item.id}>{item.name}</Tag>
          })}
        </Space>
        <div className={styles.mvBtn}>
          <Button shape="round" onClick={() => runLike(mvDetailInfo?.liked ? -1 : 1)}>
            <LikeOutlined className={classnames({[styles.liked]: mvDetailInfo?.liked})} />
            {mvDetailInfo?.liked ? "已赞" : "赞"}({mvDetailInfo?.likedCount})
          </Button>

          <Button shape="round" onClick={runSub}>
            {data?.subed ? <CheckCircleOutlined /> : <FolderAddOutlined />}
            {data?.subed ? "已收藏" : "收藏"}({data?.data?.subCount})
          </Button>

          <Button shape="round">
            <ShareAltOutlined />
            分享({mvDetailInfo?.shareCount})
          </Button>
        </div>
        <HotComment type={+query.type === 0 ? 1 : 5} id={query.mvid} />
        <NewComment type={+query.type === 0 ? 1 : 5} id={query.mvid} />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>相关推荐</p>
        <SimiItem />
      </div>
    </div>
  )
}

export default MvDetail
