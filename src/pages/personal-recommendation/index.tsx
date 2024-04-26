/** @format */

import {useEffect, useRef} from "react"
import {Row, Col, Carousel, message, Image} from "antd"
import {
  CustomerServiceOutlined,
  LeftCircleOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  RightCircleOutlined
} from "@ant-design/icons"
import {history} from "@umijs/max"
import {PlayIcon, Artists} from "@/components"
import classNames from "classnames"
import {Card} from "./components"
import styles from "./index.scss"
import {
  useInit,
  useRecommendResource,
  useNewSong,
  useCarouseData,
  usePrivateContent,
  IPrivateContentItem,
  useMV
} from "@/store/personalRecommendation"
import Utils from "@/help"
import dayImg from "@/assets/personal-recommendation/day.jpg"
import {useGetSongInfo} from "@/store/player"

const PersonalRecommendation = () => {
  const init = useInit()
  const recommendResource = useRecommendResource()
  const newSong = useNewSong()
  const privateContent = usePrivateContent()
  const mv = useMV()

  const getSongInfo = useGetSongInfo()
  const slider = useRef<any>(null)
  const carouseData = useCarouseData()

  const onPlay = (id: number | string) => {
    if (id) {
      return getSongInfo(Number(id))
    }
    return message.info("该类型无法播放哦")
  }
  const onLink = (item: IPrivateContentItem) => {
    let result = ""
    if (+item.type === 5) {
      result = `/mv-detail?mvid=${item.id}&type=0`
    }
    if (+item.type === 24) {
      result = `/mv-detail?mvid=${item.videoId}&type=1`
    }
    return history.push(result)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div
      className={classNames(
        styles._personalRecommendation,
        "w-full",
        "flex",
        "flex-col",
        "gap-[24px]"
      )}>
      <div className={styles.carousel}>
        <Carousel
          dots
          autoplay={false}
          centerMode
          infinite
          focusOnSelect
          centerPadding="80px"
          slidesToShow={3}
          ref={slider}>
          {carouseData?.map((item) => {
            return (
              <>
                <Image
                  key={item.targetId}
                  className="w-[auto]"
                  width={!item?.imageUrl ? 300 : undefined}
                  height={!item?.imageUrl ? 150 : undefined}
                  preview={false}
                  src={item?.imageUrl}
                  fallback="data:image/png;base64,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"
                  onDoubleClick={() => onPlay(item?.targetId)}
                />

                <span
                  key={item.targetId}
                  className={classNames(styles.bg, "_carousel_bg")}
                  style={{background: item?.titleColor}}>
                  {item?.typeTitle}
                </span>
              </>
            )
          })}
        </Carousel>
        <LeftCircleOutlined onClick={() => slider?.current?.prev()} className={styles.left} />
        <RightCircleOutlined onClick={() => slider?.current?.next()} className={styles.right} />
      </div>
      <Card title="推荐歌单" link="/find-music/song-list">
        <Row className={styles.recommendResource} justify="start" gutter={[24, 16]}>
          <Col span={4}>
            <div className={styles.recommendResourceItem}>
              <div className={styles.imgWrap}>
                <img src={dayImg} />

                <div className={styles.descWrap}>
                  <span className={styles.desc}>根据您的音乐口味生成每日更新</span>
                </div>

                <PlayIcon iconClassName={styles.playIcon} />
              </div>
              <p className="text-[#7D829E] px-[8px] line-clamp-2 mt-[12px] mb-[12px] text-[14px] leading-[16px] h-[32px]">
                每日歌曲推荐
              </p>
            </div>
          </Col>
          {recommendResource?.map((item) => {
            return (
              <Col
                onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
                span={4}
                key={item.id}>
                <div className={styles.recommendResourceItem}>
                  <div className={styles.imgWrap}>
                    <img src={item.picUrl} />
                    <span className={styles.number}>
                      <CustomerServiceOutlined />
                      <i>{Utils.tranNumber(item.playcount, 2)}</i>
                    </span>
                    {item.copywriter && (
                      <div className={styles.descWrap}>
                        <span className={styles.desc}>{item.copywriter}</span>
                      </div>
                    )}

                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <p className="text-[#7D829E] px-[8px] line-clamp-2 mt-[12px] mb-[12px] text-[14px] leading-[16px] h-[32px]">
                    {item.name}
                  </p>
                </div>
              </Col>
            )
          })}
        </Row>
      </Card>
      <div className="flex justify-between gap-[30px]">
        <Card className="w-[400px]" title="最新音乐" link="/find-music/latest-music">
          <div className={styles.newSong}>
            {newSong.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={styles.newSongItem}
                  onDoubleClick={() => getSongInfo(item.id)}>
                  <span className={styles.number}>{index < 10 ? `0${index}` : index}</span>
                  <div className={styles.img}>
                    <img src={item.picUrl} />
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <div className={styles.content}>
                    <p className="line-clamp-1 w-[190px]">{item.name}</p>
                    <span className={classNames("line-clamp-1", "w-[190px]", "text-[#BCBEC9]")}>
                      {item.song.artists.map((d: any) => d.name).join("/")}
                    </span>
                  </div>
                  {!!item.song.mvid ? (
                    <PlaySquareOutlined
                      className={styles.icon}
                      onClick={() =>
                        history.push(`/mv-detail?mvid=${item.song.mvid}&type=${item.song.ftype}`)
                      }
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        </Card>
        <Card className="flex-1" title="独家放送" link="/exclusive-broadcast">
          <div
            className={classNames(
              styles.privateContent,
              "flex flex-col gap-[26px] flex-1 justify-between"
            )}>
            {privateContent.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => onLink(item)}
                  className={classNames(styles.privateContentItem, "flex", "gap-[16px]")}>
                  <div className={styles.img}>
                    <img src={item.picUrl} />
                    <PlayCircleOutlined className={styles.icon} />
                  </div>
                  <p className="flex-1 line-clamp-2 leading-[20px]">{item.name}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
      <Card title="推荐MV" link="/find-music/song-list">
        <Row className={styles.mv} gutter={[32, 32]}>
          {mv.map((item) => {
            return (
              <Col span={6} key={item.id}>
                <div
                  onClick={() => history.push(`/mv-detail?mvid=${item.id}&type=${+item.type - 5}`)}
                  className={styles.mvItem}>
                  <div className={styles.imgWrap}>
                    <img src={item.picUrl} />
                    <span className={styles.number}>
                      <PlayCircleOutlined className={styles.listen} />
                      <i>{Utils.tranNumber(item.playCount, 2)}</i>
                    </span>
                    <div className={styles.descWrap}>
                      <span className={styles.desc}>{item.copywriter}</span>
                    </div>
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="line-clamp-1">{item.name}</p>
                    <Artists data={item.artists} />
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Card>
    </div>
  )
}

export default PersonalRecommendation
