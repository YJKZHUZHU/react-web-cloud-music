/** @format */

import {useEffect} from "react"
import {Carousel, message, Flex} from "antd"
import {history} from "@umijs/max"
import {Image} from "@/components"
import classNames from "classnames"
import {
  useInit,
  useRecommendResource,
  useNewSong,
  useCarouseData,
  usePrivateContent,
  useMV,
  EnumTargetType
} from "@/store/personalRecommendation"
import dayImg from "@/assets/personal-recommendation/day.jpeg"
import {useGetSongInfo} from "@/store/player"
import {Card, PlayListItem, LatestMusicItem, ExclusiveBroadcastItem, MVItem} from "./components"

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

  useEffect(() => {
    init()
  }, [])
  return (
    <Flex className={classNames("w-full")} gap={24} vertical>
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
        <Flex wrap gap={32}>
          <PlayListItem
            data={{
              picUrl: dayImg,
              copywriter: "根据您的音乐口味生成每日更新",
              name: "每日歌曲推荐"
            }}
          />
          {recommendResource?.map((item) => (
            <PlayListItem data={item} key={item.id} />
          ))}
        </Flex>
      </Card>
      <Flex justify="space-between" gap={30}>
        <Card
          className="w-[400px] p-0"
          titleClassName=" px-[16px]"
          title="最新音乐"
          link="/find-music/latest-music">
          <Flex vertical>
            {newSong.map((item, index) => (
              <LatestMusicItem data={item} index={index} key={item.id} />
            ))}
          </Flex>
        </Card>
        <Card className="flex-1" title="独家放送" link="/exclusive-broadcast">
          <Flex vertical gap={26} flex={1}>
            {privateContent.map((item) => (
              <ExclusiveBroadcastItem data={item} key={item.id} />
            ))}
          </Flex>
        </Card>
      </Flex>
      <Card title="推荐MV" link="/mv">
        <Flex gap={32} wrap>
          {mv.map((item) => (
            <MVItem data={item} key={item.id} />
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}

export default PersonalRecommendation
