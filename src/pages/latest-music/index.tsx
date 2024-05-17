/** @format */

import React, {useEffect, useMemo, useState} from "react"
import {Flex, Radio, Spin, Tag} from "antd"
import {
  MAP_CLASSIFICATION_TYPE_ENUM,
  MAP_TAG,
  MAP_TAG_ENUM,
  MAP_NEW_SONG_AREA,
  ITagItem
} from "@/constants/latest-music"
import {history} from "@umijs/max"
import VirtualList from "rc-virtual-list"
import {Artists, Image, PlayIcon, VideoIcon} from "@/components"
import coverall from "@/assets/coverall.png"
import playing from "@/assets/playing.png"
import NewSongs from "./components/NewSongs"
import NewDisc from "./components/NewDisc"
import styles from "./index.scss"
import classNames from "classnames"
import {
  useGetSong,
  useSong,
  useLoading,
  SongKey,
  useGetAlbum,
  useMonthAlbum,
  IAlbumItem
} from "@/store/latestMusic"
import Utils from "@/help"
import {PlaySquareOutlined} from "@ant-design/icons"
import {useGetSongInfo, useSongId} from "@/store/player"

const {CheckableTag} = Tag

const LatestMusic = () => {
  const [radioKey, setRadioKey] = useState<"new-songs" | "new-disc">("new-songs")
  const loading = useLoading()
  const getSong = useGetSong()
  const getSongInfo = useGetSongInfo()
  const getAlbum = useGetAlbum()
  // const isPalying = useIsPalying()
  const song = useSong()
  const songId = useSongId()
  const monthAlbum = useMonthAlbum()
  const [selectTags, setSelectTags] = useState([
    MAP_CLASSIFICATION_TYPE_ENUM.newSong,
    MAP_CLASSIFICATION_TYPE_ENUM.ALL,
    MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew
  ])

  const [category, area] = selectTags

  const [virtualHeight, setVirtualHeight] = useState(0)

  const tags = useMemo(() => {
    return [
      {
        title: "分类：",
        data: MAP_TAG.get(MAP_TAG_ENUM.CLASSIFICATION),
        key: MAP_TAG_ENUM.CLASSIFICATION
      },
      {
        title: "地区：",
        data: MAP_TAG.get(MAP_TAG_ENUM.AREA),
        key: MAP_TAG_ENUM.AREA
      },
      {
        title: "筛选：",
        data: MAP_TAG.get(MAP_TAG_ENUM.NEW_DISK_TYPE),
        key: MAP_TAG_ENUM.NEW_DISK_TYPE
      }
    ].filter((item) => {
      if (selectTags.at(0) === MAP_CLASSIFICATION_TYPE_ENUM.newSong) {
        return item.key !== MAP_TAG_ENUM.NEW_DISK_TYPE
      }
      return true
    })
  }, [selectTags])

  const onChange = (item: ITagItem, index: number) => {
    const result = selectTags.map((s, i) => {
      if (index === i) {
        return item.key
      }
      if (index === 0 && i === 2 && s === MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeHot) {
        return MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew
      }
      return s
    })
    const [category, area] = result
    setSelectTags(result)
    if (category === MAP_CLASSIFICATION_TYPE_ENUM.newSong) {
      getSong(MAP_NEW_SONG_AREA.get(area)!)
    } else if (category === MAP_CLASSIFICATION_TYPE_ENUM.newDisk) {
      getAlbum({})
    }
  }

  const renderNewSong = () => {
    if (category !== MAP_CLASSIFICATION_TYPE_ENUM.newSong) {
      return
    }
    const key = MAP_NEW_SONG_AREA.get(area)!
    const data = song[key]
    return (
      <Flex vertical>
        {data?.map((item, index) => {
          const isPlaying = String(item.id) === String(songId)
          return (
            <Flex
              align="center"
              key={item.id}
              gap={12}
              onClick={() => getSongInfo(item.id)}
              className={classNames("py-[12px] px-[12px] cursor-pointer", {
                "bg-[#F9F9F9]": index % 2 === 0,
                "hover:bg-[#ECECEC]": index % 2 === 0
              })}>
              <Flex justify="center" align="start" className="w-[30px] leading-[20px]">
                {isPlaying ? (
                  <img alt="" src={playing} width={18} />
                ) : (
                  <span>{Utils.generateIndex(index)}</span>
                )}
              </Flex>

              <div className=" relative ">
                <Image
                  width={60}
                  height={60}
                  size={[60, 60]}
                  multiple={2}
                  className=" rounded-[5px]"
                  src={item.album.picUrl}
                />
                <PlayIcon
                  iconStyle={{opacity: 1, width: 24, height: 24}}
                  iconClassName="opacity-1"
                  className="!text-[12px]"
                />
              </div>
              <Flex align="center" gap={8} className="text-[#B2B2B2] text-[16px] w-[300px]">
                <span className={classNames("line-clamp-1", {"text-[#C62526]": isPlaying})}>
                  {item.name}
                  {item.alias.length !== 0 && `(${item.alias.join()})`}
                </span>

                {!!item.mvid ? (
                  <PlaySquareOutlined
                    className="text-[#C62526] text-[12px]"
                    onClick={(e) => {
                      e.stopPropagation()
                      history.push(`/mv-detail?mvid=${item.mvid}&type=${0}`)
                    }}
                  />
                ) : null}
              </Flex>
              <Artists
                splitColor="#B2B2B2"
                className="text-[14px] w-[200px]"
                color="#B2B2B2"
                data={item.artists}
                max={2}
              />

              <span
                onClick={(e) => {
                  e.stopPropagation()
                  history.push(`/album?id=${item.album.id}&name=${item.album.name}`)
                }}
                className="text-[14px] text-[#B2B2B2] flex-1 line-clamp-1 hover:text-[#282828]">
                {item.album.name}
                {item.alias.length !== 0 && ` (${item.alias.join()})`}
              </span>
              <span className="text-[14px] text-[#B2B2B2]">
                {Utils.formatSeconds(item.duration)}
              </span>
            </Flex>
          )
        })}
      </Flex>
    )
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    console.log("滚动啊")
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    // if (
    //   Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 140 &&
    //   !loading &&
    //   hasMore.current
    // ) {
    //   offset.current += 30
    //   console.log("触发了吗")
    //   getList(
    //     {
    //       limit: max,
    //       offset: offset.current,
    //       area,
    //       type,
    //       initial
    //     },
    //     true
    //   )
    // }
  }

  const renderAlbum = () => {
    if (category !== MAP_CLASSIFICATION_TYPE_ENUM.newDisk) {
      return
    }
    return (
      <VirtualList
        virtual
        height={virtualHeight}
        className={styles.virtualList}
        data={monthAlbum}
        styles={{verticalScrollBarThumb: {}}}
        itemKey="id"
        onScroll={onScroll}>
        {(item: IAlbumItem) => (
          <Flex vertical key={item.id} gap={12} className=" rounded-[5px] w-[153px] mb-[16px]">
            <div
              style={{
                backgroundRepeat: "no-repeat",
                background: `url(${coverall})`,
                backgroundPosition: "0 -845px"
              }}
              className=" rounded-[5px] w-[153px] h-[130px]">
              <Image
                className="cursor-pointer rounded-[5px]"
                height={132}
                size={[132, 132]}
                multiple={2}
                src={item.picUrl}
              />
            </div>

            <span className="line-clamp-1">{item.name}</span>
            <Artists data={item.artists} />
          </Flex>
        )}
      </VirtualList>
    )
  }

  useEffect(() => {
    const ele = document.querySelector<HTMLDivElement>("#_contentContainer")
    ele && setVirtualHeight(ele?.offsetHeight!)
    getSong(MAP_NEW_SONG_AREA.get(area)!)
  }, [])

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={24} className=" bg-[#ffffff] rounded-[20px]">
        <Flex vertical gap={24} className=" px-[16px] mt-[16px]">
          {tags.map((d, index) => {
            return (
              <Flex key={d.key} align="center">
                <span>{d.title}</span>
                <Flex flex={1} align="center">
                  {d.data?.map((item) => {
                    return (
                      <CheckableTag
                        key={item.key}
                        checked={item.key === selectTags[index]}
                        onChange={() => onChange(item, index)}>
                        {item.name}
                      </CheckableTag>
                    )
                  })}
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        {renderNewSong()}
        {renderAlbum()}
      </Flex>
    </Spin>
  )
}

export default LatestMusic
