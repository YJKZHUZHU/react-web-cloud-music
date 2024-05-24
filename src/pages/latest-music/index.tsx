/** @format */

import React, {useEffect, useMemo, useRef, useState} from "react"
import {Flex, Spin, Tag} from "antd"
import {
  MAP_CLASSIFICATION_TYPE_ENUM,
  MAP_TAG,
  MAP_TAG_ENUM,
  MAP_NEW_SONG_AREA,
  ITagItem,
  MAP_NEW_DISK_AREA
} from "@/constants/latest-music"
import {history} from "@umijs/max"
import VirtualList from "rc-virtual-list"
import {Artists, Image, PlayIcon} from "@/components"
import coverall from "@/assets/coverall.png"
import playing from "@/assets/playing.png"
import classNames from "classnames"
import {
  useGetSong,
  useSong,
  useLoading,
  useGetAlbum,
  IAlbumItem,
  useAlbum,
  Song,
  useInitAlbum,
  usePrevAlbum
} from "@/store/latestMusic"
import Utils from "@/help"
import {PlaySquareOutlined} from "@ant-design/icons"
import {useGetSongInfo, useSongId} from "@/store/player"
import dayjs from "dayjs"
import {useVirtualListHeight} from "@/hooks"

const {CheckableTag} = Tag

const LatestMusic = () => {
  const loading = useLoading()
  const getSong = useGetSong()
  const getSongInfo = useGetSongInfo()
  const getAlbum = useGetAlbum()
  const album = useAlbum()

  const virtualHeight = useVirtualListHeight(124)

  const song = useSong()
  const songId = useSongId()
  const initAlbum = useInitAlbum()

  const [selectTags, setSelectTags] = useState([
    MAP_CLASSIFICATION_TYPE_ENUM.newSong,
    MAP_CLASSIFICATION_TYPE_ENUM.ALL,
    MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew
  ])

  const [category, area] = selectTags
  const [[title, subTitle], setAlbumText] = useState(["新碟", "本周"])

  const timeRef = useRef({year: Number(dayjs().format("YYYY")), month: Number(dayjs().format("M"))})
  const showWeekData = useRef(true)

  const prevAlbum = usePrevAlbum()

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
      }
      // { // 暂时去掉，接口不支持
      //   title: "筛选：",
      //   data: MAP_TAG.get(MAP_TAG_ENUM.NEW_DISK_TYPE),
      //   key: MAP_TAG_ENUM.NEW_DISK_TYPE
      // }
    ].filter((item) => {
      if (selectTags.at(0) === MAP_CLASSIFICATION_TYPE_ENUM.newSong) {
        return item.key !== MAP_TAG_ENUM.NEW_DISK_TYPE
      }
      return true
    })
  }, [selectTags])

  const onChange = async (item: ITagItem, index: number) => {
    try {
      const result = selectTags.map((s, i) => {
        if (index === i) {
          return item.key
        }
        if (index === 0 && i === 2 && s === MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeHot) {
          return MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew
        }
        return s
      })
      const [category, area, type] = result
      setSelectTags(result)
      if (category === MAP_CLASSIFICATION_TYPE_ENUM.newSong) {
        getSong(MAP_NEW_SONG_AREA.get(area)!)
      } else if (category === MAP_CLASSIFICATION_TYPE_ENUM.newDisk) {
        initAlbum()
        timeRef.current.year = Number(dayjs().format("YYYY"))
        timeRef.current.month = Number(dayjs().format("M"))
        await getAlbum({
          area: MAP_NEW_DISK_AREA.get(area)!,
          type: MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew,
          year: timeRef.current.year.toString(),
          month: timeRef.current.month.toString()
        })
      }
    } catch (error) {
      console.log("error", error)
      throw error
    }
  }

  const renderNewSong = () => {
    const key = MAP_NEW_SONG_AREA.get(area)!

    const data = song[key] || []

    return (
      <VirtualList
        fullHeight
        itemHeight={80}
        height={virtualHeight}
        data={data!}
        styles={{verticalScrollBarThumb: {}}}
        itemKey="id">
        {(item: Song, index) => {
          const isPlaying = String(item.id) === String(songId)
          return (
            <Flex
              align="center"
              key={item.id}
              gap={12}
              onClick={() => getSongInfo(item.id)}
              className={classNames(" h-[80px] px-[12px] cursor-pointer", {
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
        }}
      </VirtualList>
    )
  }

  const renderAlbum = () => {
    const data = Utils.chunkArray<IAlbumItem>(album, 6)
    return (
      <Flex flex={1} justify="space-between" className={classNames("px-[16px]")} gap={12}>
        <Flex vertical gap={12}>
          <div className="w-[50px] text-[#262626] text-[24px] font-[600]">{subTitle}</div>
          <div className="w-[50px] text-[#262727] ">{title}</div>
        </Flex>

        <VirtualList
          fullHeight
          itemHeight={180}
          height={virtualHeight}
          className={classNames("flex-1")}
          data={data}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          itemKey="key"
          onScroll={onScroll}>
          {(dataSource: {key: number; list: IAlbumItem[]}) => {
            return (
              <Flex key={dataSource.key} wrap gap={25} className="pb-[16px]">
                {dataSource?.list?.map((item) => (
                  <Flex
                    onClick={(e) => {
                      history.push(`/album?id=${item.id}&name=${item.name}`)
                    }}
                    vertical
                    key={item?.id}
                    gap={8}
                    className="w-[150px]">
                    <div
                      style={{
                        backgroundRepeat: "no-repeat",
                        background: `url(${coverall})`,
                        backgroundPosition: "-3px -845px"
                      }}
                      className=" w-[150px] h-[130px]">
                      <Image
                        className=" w-[130px] cursor-pointer"
                        height={130}
                        width={130}
                        size={[130, 130]}
                        multiple={2}
                        src={item.picUrl}
                      />
                    </div>
                    <Flex vertical gap={8} className="w-[130px]">
                      <span className="line-clamp-1 text-[14px] text-[#2B2B2B] cursor-pointer hover:text-[#020202]">
                        {item.name}
                      </span>
                      <Artists className="text-[14px]" data={item.artists} max={2} />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )
          }}
        </VirtualList>
      </Flex>
    )
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 180 &&
      !loading
    ) {
      console.log("到底了", e.currentTarget.scrollHeight - e.currentTarget.scrollTop, virtualHeight)
      if (prevAlbum.length !== 0) {
        setAlbumText([timeRef.current.year.toString(), timeRef.current.month.toString()])
        getAlbum({
          area: MAP_NEW_DISK_AREA.get(area)!,
          type: MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew,
          year: timeRef.current.year.toString(),
          month: timeRef.current.month.toString()
        })
        return
      }
      showWeekData.current = false
      if (timeRef.current.month === 12) {
        timeRef.current.year -= 1
      }
      if (timeRef.current.month === 12) {
        timeRef.current.month = 1
      } else {
        timeRef.current.month -= 1
      }
      setAlbumText([timeRef.current.year.toString(), timeRef.current.month.toString()])

      getAlbum({
        area: MAP_NEW_DISK_AREA.get(area)!,
        type: MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew,
        year: timeRef.current.year.toString(),
        month: timeRef.current.month.toString()
      })
    }
  }

  useEffect(() => {
    getSong(MAP_NEW_SONG_AREA.get(area)!)
  }, [])

  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex flex={1} vertical gap={24} className=" bg-[#ffffff] rounded-[20px] pb-[16px]">
        <Flex vertical gap={24} className=" px-[16px] mt-[16px]">
          {tags.map((d, index) => {
            return (
              <Flex key={d.key} align="center" gap={12}>
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
        {category === MAP_CLASSIFICATION_TYPE_ENUM.newSong ? renderNewSong() : renderAlbum()}
      </Flex>
    </Spin>
  )
}

export default LatestMusic
