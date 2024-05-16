/** @format */

import {Fragment, useEffect, useRef} from "react"
import {Row, Col, Carousel, message, Flex} from "antd"
import {
  CustomerServiceOutlined,
  LeftCircleOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  RightCircleOutlined
} from "@ant-design/icons"
import {history} from "@umijs/max"
import {PlayIcon, Artists, Image} from "@/components"
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
  useMV,
  EnumTargetType,
  IRecommendItem
} from "@/store/personalRecommendation"
import Utils from "@/help"
import dayImg from "@/assets/personal-recommendation/day.jpeg"
import {useGetSongInfo} from "@/store/player"

const PersonalRecommendation = () => {
  const init = useInit()
  const recommendResource = useRecommendResource()
  const newSong = useNewSong()
  const privateContent = usePrivateContent()
  const mv = useMV()

  const getSongInfo = useGetSongInfo()
  const carouseData = useCarouseData()

  const onPlay = (id: number | string, targetType: EnumTargetType) => {
    if (targetType === EnumTargetType.song) {
      return getSongInfo(Number(id))
    }
    if (targetType === EnumTargetType.playList) {
      return history.push(`/playList/${id}`)
    }
    if (targetType === EnumTargetType.dvd) {
      return history.push(`/album?id=${id}`)
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

  const renderPlayListItem = (item: Partial<IRecommendItem>) => {
    const onLink = () => {
      if (item.id) {
        return history.push(`/playList/${item.id}?listId=${item.id}`)
      }
      return message.info("开发中...")
    }
    return (
      <Flex
        onClick={onLink}
        key={item.id}
        gap={12}
        vertical
        style={{boxShadow: "0px 4px 28px 0px rgba(35, 29, 106, 0.1)"}}
        className={classNames(
          " pb-[12px] cursor-pointer relative bg-white rounded-[12px] w-[200px]",
          styles.recommendResourceItem
        )}>
        <div className={classNames(styles.imgWrap)}>
          <Image
            className=" h-[200px] w-[200px]"
            src={item.picUrl}
            size={[200, 200]}
            multiple={1.5}
            width={200}
            height={200}
          />
          {item.playcount && (
            <Flex
              align="center"
              style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
              className={classNames(
                styles.number,
                " w-full h-[32px] absolute bottom-0 text-white pl-[15px]   translate-y-full transition-all rounded-bl rounded-br rounded-[5px]"
              )}
              gap={4}>
              <CustomerServiceOutlined />
              <span>{Utils.tranNumber(item.playcount, 2)}</span>
            </Flex>
          )}

          {item.copywriter && (
            <div
              style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
              className={classNames(
                styles.descWrap,
                " rounded-tl rounded-tr rounded-[5px] text-[12px] min-h-[20px] w-full leading-[20px] text-[#ffffff] line-clamp-2 px-[6px] py-[4px]  absolute left-0 right-0 top-0 translate-y-[-100%] transition-all"
              )}>
              {item.copywriter}
            </div>
          )}

          <PlayIcon iconClassName={styles.playIcon} />
        </div>
        <span className="text-[#7D829E] px-[8px] line-clamp-2  text-[14px] leading-[16px] h-[32px]">
          {item.name}
        </span>
      </Flex>
    )
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Flex className={classNames(styles._personalRecommendation, "w-full")} gap={24} vertical>
      <Carousel arrows className="h-[150px]" dots autoplay={false} centerMode slidesToShow={3}>
        {carouseData?.map((item) => {
          return (
            <div key={item.targetId} className=" px-[15px] relative">
              <Image
                className="w-[auto] rounded-[5px] cursor-pointer"
                height={150}
                preview={false}
                src={item?.imageUrl}
                onClick={() => onPlay(item?.targetId, item.targetType)}
              />
              <span
                key={item.targetId}
                className="text-[12px] px-[4px] py-[2px]  absolute text-[#ffffff] text-center bottom-[6px] right-[15px]  rounded-br-[5px] rounded-tl-[5px] "
                style={{background: item?.titleColor}}>
                {item?.typeTitle}
              </span>
            </div>
          )
        })}
      </Carousel>

      <Card title="推荐歌单" link="/find-music/song-list">
        <Flex wrap gap={24}>
          {renderPlayListItem({
            picUrl: dayImg,
            copywriter: "根据您的音乐口味生成每日更新",
            name: "每日歌曲推荐"
          })}
          {recommendResource?.map(renderPlayListItem)}
        </Flex>
      </Card>
      <Flex justify="space-between" gap={30}>
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
                    <img alt="" src={`${item.picUrl}?param=64y64`} />
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
      </Flex>
      <Card title="推荐MV" link="/find-music/song-list">
        <Row className={styles.mv} gutter={[32, 32]}>
          {mv.map((item) => {
            return (
              <Col span={6} key={item.picUrl}>
                <div
                  onClick={() => history.push(`/mv-detail?mvid=${item.id}&type=${+item.type - 5}`)}
                  className={styles.mvItem}>
                  <div className={styles.imgWrap}>
                    <Image
                      preview={false}
                      width="100%"
                      height="100%"
                      // width={200}
                      // height={200}
                      src={`${item.picUrl}?param=300y200`}
                      fallback="data:image/png;base64,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"
                    />
                    {/* <img alt="" /> */}
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
    </Flex>
  )
}

export default PersonalRecommendation
