/** @format */

import React, {useEffect, useMemo, useRef, useState} from "react"
import {Row, Col, Flex, Tag, Spin, message} from "antd"
import {Image} from "@/components"
import {UserOutlined} from "@ant-design/icons"
import {history} from "@umijs/max"
import {CLASSIFICATION_ENUM, LANGUAGE_ENUM, MAP_SINGER_TAG, MAP_SINGER_TAG_ENUM} from "@/help/map"
import VirtualList from "rc-virtual-list"
import {ArtistInfo, IArtistListParams, artistList} from "@/api/singer"
import styles from "./index.scss"
import {useVirtualListHeight} from "@/hooks"
import Utils from "@/help"

const {CheckableTag} = Tag

const max = 30
const Singer = () => {
  const [tag, setTag] = useState<[LANGUAGE_ENUM, CLASSIFICATION_ENUM, string | number]>([
    LANGUAGE_ENUM.all,
    CLASSIFICATION_ENUM.all,
    -1
  ])
  const [area, type, initial] = tag
  const [list, setList] = useState<ArtistInfo[]>([])
  const [loading, setLoading] = useState(false)
  const hasMore = useRef(false)
  const offset = useRef(0)

  const virtualHeight = useVirtualListHeight(132)

  const getList = async (params: Partial<IArtistListParams>, scroll: boolean = false) => {
    try {
      setLoading(true)

      const res = await artistList(params)

      if (hasMore.current) {
        setList(list.concat(res.data.artists))
      } else {
        setList(res.data.artists)
        scroll && message.info("到底了")
      }
      hasMore.current = res.data.more

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onlanguageTag = async (
    key: MAP_SINGER_TAG_ENUM,
    item: {id: number | string; value: string}
  ) => {
    if (tag[key] === item.id) return

    const result = tag.map((d, index) => {
      if (index === key) {
        return item.id
      }
      return d
    }) as [LANGUAGE_ENUM, CLASSIFICATION_ENUM, string | number]
    setTag(result)
    offset.current = 0

    hasMore.current = false
    getList({
      limit: max,
      offset: offset.current,
      area: result[0],
      type: result[1],
      initial: result[2]
    })
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualHeight) <= 140 &&
      !loading &&
      hasMore.current
    ) {
      offset.current += 30
      console.log("触发了吗")
      getList(
        {
          limit: max,
          offset: offset.current,
          area,
          type,
          initial
        },
        true
      )
    }
  }

  useEffect(() => {
    getList({
      limit: max,
      offset: offset.current,
      area,
      type,
      initial
    })
  }, [])

  const source = useMemo(() => {
    return Utils.chunkArray<ArtistInfo>(list, 7)
  }, [list])
  console.log("source", source)
  return (
    <Spin spinning={loading} delay={500} tip="Loading...">
      <Flex flex={1} className=" bg-[#ffffff] rounded-[20px] p-[16px]" vertical gap={20}>
        <Flex vertical gap={12}>
          {MAP_SINGER_TAG.map((item) => {
            return (
              <Flex align="center" key={item.key} gap={24}>
                <span>{item.name}:</span>
                <Row className=" flex-1">
                  {item.list.map((d) => {
                    return (
                      <Col key={d.id} span={1.5}>
                        <CheckableTag
                          checked={tag[item.key] === d.id}
                          onChange={() => onlanguageTag(item.key, d)}>
                          {d.value}
                        </CheckableTag>
                      </Col>
                    )
                  })}
                </Row>
              </Flex>
            )
          })}
        </Flex>
        <VirtualList
          fullHeight
          height={virtualHeight}
          itemHeight={168}
          className={styles.virtualList}
          data={source}
          styles={{verticalScrollBarThumb: {}}}
          itemKey="key"
          onScroll={onScroll}>
          {(dataSource: {key: number; list: ArtistInfo[]}, index) => {
            return (
              <Flex key={index} wrap gap={21} justify="flex-start">
                {dataSource.list.map((item) => (
                  <Flex vertical key={item.picId} gap={12} className=" w-[140px]">
                    <Image
                      onClick={() =>
                        history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)
                      }
                      className="cursor-pointer"
                      width={140}
                      height={140}
                      size={[140, 140]}
                      multiple={2}
                      src={item.img1v1Url}
                    />
                    <Flex justify="space-between" gap={4}>
                      <span
                        onClick={() =>
                          history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)
                        }
                        className=" flex-1 line-clamp-1 text-[#262627] cursor-pointer hover:text-[#020204]">
                        {item.name}
                      </span>
                      <UserOutlined
                        style={{color: "#ED3634"}}
                        onClick={() => history.push(`/homepage/${item.id}`)}
                      />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )
          }}
        </VirtualList>
      </Flex>
    </Spin>
  )
}

export default Singer
