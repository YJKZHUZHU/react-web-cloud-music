/** @format */

import React, {useEffect, useRef, useState} from "react"
import {Row, Col, Flex, Tag, Spin, message, Image} from "antd"
import {UserOutlined} from "@ant-design/icons"
import {history} from "@umijs/max"
import {CLASSIFICATION_ENUM, LANGUAGE_ENUM, MAP_SINGER_TAG, MAP_SINGER_TAG_ENUM} from "@/help/map"
import VirtualList from "rc-virtual-list"
import {ArtistInfo, IArtistListParams, artistList} from "@/api/singer"
import styles from "./index.scss"
import Skeleton from "react-loading-skeleton"

const {CheckableTag} = Tag

const max = 30
const Singer = () => {
  const [tag, setTag] = useState<[LANGUAGE_ENUM, CLASSIFICATION_ENUM, string | number]>([
    LANGUAGE_ENUM.all,
    CLASSIFICATION_ENUM.all,
    -1
  ])
  const [area, type, initial] = tag
  const [virtualHeight, setVirtualHeight] = useState(0)
  const [list, setList] = useState<ArtistInfo[]>([])
  const [loading, setLoading] = useState(false)
  const hasMore = useRef(false)
  const offset = useRef(0)

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
    const ele = document.querySelector<HTMLDivElement>("#_contentContainer")
    ele && setVirtualHeight(ele?.offsetHeight!)
    getList({
      limit: max,
      offset: offset.current,
      area,
      type,
      initial
    })
  }, [])
  // console.log("list--", list)
  return (
    <Flex className=" bg-[#ffffff] rounded-[20px] p-[16px]" vertical gap={20}>
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
      <Spin spinning={loading} delay={500} tip="Loading...">
        <VirtualList
          virtual
          height={virtualHeight}
          className={styles.virtualList}
          data={list}
          styles={{verticalScrollBarThumb: {}}}
          itemKey="picId"
          onScroll={onScroll}>
          {(item: ArtistInfo) => (
            <Flex vertical key={item.picId} gap={12} className=" w-[140px] mb-[16px]">
              <Image
                onClick={() =>
                  history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)
                }
                className="cursor-pointer"
                preview={false}
                width={140}
                height={140}
                src={`${item.img1v1Url}?param=140y140`}
                fallback="data:image/png;base64,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"
                placeholder={<Skeleton height={140} />}
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
          )}
        </VirtualList>
      </Spin>
    </Flex>
  )
}

export default Singer
