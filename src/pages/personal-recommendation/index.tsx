/** @format */

import {useEffect} from "react"
import {Carousel, message, Flex} from "antd"
import {CustomerServiceOutlined, PlayCircleOutlined, PlaySquareOutlined} from "@ant-design/icons"
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
      result = `/mv-detail/${item.id}`
    }
    if (+item.type === 24) {
      result = `/video-detail/${item.videoId}`
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
                size={[347, 150]}
                multiple={1.5}
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
        <Card
          className="w-[400px] p-0"
          titleClassName=" px-[16px]"
          title="最新音乐"
          link="/find-music/latest-music">
          <Flex vertical>
            {newSong.map((item, index) => {
              return (
                <Flex
                  gap={15}
                  key={item.id}
                  className={classNames(
                    styles.newSongItem,
                    " cursor-pointer py-[8px] pr-[8px] hover:bg-[#efefef] rounded-[8px]"
                  )}
                  onClick={() => getSongInfo(item.id)}>
                  <span className=" pl-[16px]  self-center">
                    {index < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div className={styles.img}>
                    <Image
                      width={64}
                      className=" rounded-[5px] "
                      src={item.picUrl}
                      size={[64, 64]}
                      multiple={2}
                    />
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <Flex gap={12} vertical flex={1} justify="center" align="center">
                    <span className="line-clamp-1 self-start w-full">{item.name}</span>
                    <Artists data={item.song.artists} className="self-start w-full" />
                  </Flex>
                  {!!item.song.mvid ? (
                    <PlaySquareOutlined
                      className=" text-[#d33931]"
                      onClick={(e) => {
                        e.stopPropagation()
                        history.push(`/mv-detail/${item.song.mvid}`)
                      }}
                    />
                  ) : null}
                </Flex>
              )
            })}
          </Flex>
        </Card>
        <Card className="flex-1" title="独家放送" link="/exclusive-broadcast">
          <Flex vertical gap={26} flex={1}>
            {privateContent.map((item) => {
              return (
                <Flex
                  gap={16}
                  key={item.id}
                  onClick={() => onLink(item)}
                  className={classNames(styles.privateContentItem)}>
                  <div className="rounded-[5px] relative cursor-pointer">
                    <Image width={300} src={item.picUrl} size={[300, 300]} multiple={2} />
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <span className="flex-1 line-clamp-2 leading-[20px]">{item.name}</span>
                </Flex>
              )
            })}
          </Flex>
        </Card>
      </Flex>
      <Card title="推荐MV" link="/find-music/song-list">
        <Flex gap={32} wrap className={styles.mv}>
          {mv.map((item) => {
            return (
              <Flex
                vertical
                gap={8}
                key={item.id}
                onClick={() => history.push(`/mv-detail/${item.id}`)}
                className={classNames("relative w-[300px]", styles.mvItem)}>
                <div
                  className={classNames(
                    styles.imgWrap,
                    "relative w-[300px] rounded-[4px] cursor-pointer overflow-hidden"
                  )}>
                  <Image height={150} src={item.picUrl} size={[300, 150]} multiple={2} />
                  <PlayIcon iconClassName={styles.playIcon} />
                  <Flex
                    align="center"
                    justify="end"
                    gap={5}
                    className=" pr-[10px] w-full absolute right-0 text-[#ffffff] top-0 leading-[32px]">
                    <PlayCircleOutlined />
                    <span>{Utils.tranNumber(item.playCount, 2)}</span>
                  </Flex>
                  <div
                    style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}
                    className={classNames(
                      styles.descWrap,
                      "leading-1 w-full text-[12px] absolute leading-[16px] p-[4px] left-0 right-0 top-0 translate-y-[-100%] transition-all text-[#ffffff]"
                    )}>
                    {item.copywriter}
                  </div>
                </div>
                <Flex vertical gap={8}>
                  <span className="line-clamp-1 leading-[16px]">{item.name}</span>
                  <Artists data={item.artists} />
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Card>
    </Flex>
  )
}

export default PersonalRecommendation
