/** @format */

import React, {useEffect, useMemo, useState} from "react"
import {history} from "@umijs/max"
import {Row, Col, Spin, Pagination, Flex, Button, Popover, Tag, Divider} from "antd"
import {IPlaylistParams, playlist} from "@/api/songList"
import {Image} from "@/components"
import {
  useInit,
  useHighqualityDesc,
  useHotTags,
  useActiveTag,
  useUpdateActiveTag,
  SongCategory,
  IPlaylistItem,
  useAllCatlist,
  useReduceSubCatlist
} from "@/store/songList"
import {
  CaretRightOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons"
import Utils from "@/help"
import {useQuery} from "@/hooks"

const {CheckableTag} = Tag

const LIMIT = 30

const SongList = () => {
  const {tag} = useQuery()
  const [list, setList] = useState<IPlaylistItem[]>([])
  const allCatlist = useAllCatlist()
  const reduceSubCatlist = useReduceSubCatlist()
  const activeTag = useActiveTag()
  const [visible, setVisible] = useState(false)
  const init = useInit()
  const highqualityDesc = useHighqualityDesc()
  const updateActiveTag = useUpdateActiveTag()
  const hotTags = useHotTags()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getList = async (params: Partial<IPlaylistParams>) => {
    try {
      setLoading(true)
      const res = await playlist(params)
      setTotal(res.data.total)
      setList(res.data.playlists)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const onlanguageTag = (item: SongCategory, checked: boolean, close: boolean = false) => {
    close && setVisible(false)
    if (item.name === activeTag) return
    updateActiveTag(item.name === "全部歌单" ? "全部" : item.name)
    getList({cat: item.name, order: "hot", limit: LIMIT, offset: 0})
  }

  const onPageChange = (page: number) => {
    setCurrent(page)
    getList({cat: activeTag, order: "hot", limit: LIMIT, offset: (page - 1) * 50})
  }

  const content = useMemo(() => {
    return (
      <Flex vertical gap={12}>
        {reduceSubCatlist.map((item) => {
          return (
            <Flex align="center" key={item.key} gap={12}>
              <span className=" self-start">{item.name}</span>
              <Flex flex={1} justify="start" wrap gap={2}>
                {item.list.map((d) => {
                  return (
                    <div className="basis-[15%]" key={d.name}>
                      <CheckableTag
                        className="line-clamp-1 "
                        key={d.name}
                        checked={activeTag === d.name}
                        onChange={(checked) => onlanguageTag(d, checked, true)}>
                        {d.name}
                      </CheckableTag>
                    </div>
                  )
                })}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    )
  }, [activeTag])

  const renderList = () => {
    const data = Utils.chunkArray(list, 6)
    return (
      <Flex vertical gap={16}>
        {data.map((item) => {
          return (
            <Flex key={item.key} gap={18}>
              {item.list.map((item) => {
                return (
                  <Flex
                    className="w-[170px]"
                    key={item.id}
                    onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
                    vertical
                    gap={8}>
                    <div className=" relative cursor-pointer ">
                      <Image
                        height={170}
                        width={170}
                        className="w-[170px] h-[170px]"
                        src={item.coverImgUrl}
                        size={[170, 170]}
                        multiple={2}
                      />
                      <Flex
                        gap={2}
                        align="center"
                        justify="end"
                        className="text-[#ffffff] text-[14px] absolute w-full left-0  top-[8px] pr-[8px]">
                        <CaretRightOutlined />
                        <span>{Utils.tranNumber(item.playCount)}</span>
                      </Flex>
                      <Flex
                        gap={4}
                        align="center"
                        className="text-[#ffffff] absolute bottom-[10px] w-full px-[8px]">
                        <UserOutlined className="text-[14px]" />
                        <span className=" text-[14px] line-clamp-1">{item.creator?.nickname}</span>
                        <img
                          alt=""
                          className=" h-[12px]"
                          src={`${item?.creator?.avatarDetail?.identityIconUrl}?param=12y12`}
                        />
                      </Flex>
                    </div>
                    <span className=" cursor-pointer text-[14px] line-clamp-2 text-[#333333] leading-[20px] hover:text-[#000000]">
                      {item.name}
                    </span>
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    )
  }

  useEffect(() => {
    tag && updateActiveTag(tag)
    getList({cat: tag || "全部", order: "hot", limit: LIMIT, offset: 0})
    init()
  }, [])

  return (
    <Flex vertical gap={20}>
      {highqualityDesc && (
        <Flex
          onClick={() => history.push(`/find-music/quality-play-list/${highqualityDesc.id}`)}
          className=" cursor-pointer relative p-[20px] rounded-[12px] overflow-hidden">
          <Flex gap={12} className=" z-[1]">
            <Image
              preview={false}
              width={140}
              height={140}
              className="w-[140px] h-[140px]"
              src={highqualityDesc?.coverImgUrl}
              size={[140, 140]}
              multiple={2}
            />
            <Flex vertical gap={12} flex={1}>
              <Button
                ghost
                icon={<MenuUnfoldOutlined style={{color: "#E7AA5A"}} />}
                shape="round"
                style={{width: 120, borderColor: "#E7AA5A", color: "#E7AA5A"}}>
                精品歌单
              </Button>
              <span className=" text-[18px] text-[#ffffff]">{highqualityDesc?.name}</span>
              {highqualityDesc?.copywriter && (
                <span className="text-[#7D829E]">{highqualityDesc?.copywriter}</span>
              )}
              <span className=" text-[14px] line-clamp-2 leading-[18px]">
                {highqualityDesc?.description}
              </span>
            </Flex>
          </Flex>
          <div
            className=" blur-[50px] absolute top-0 left-0 bottom-0 right-0 z-0"
            style={{backgroundImage: `url(${highqualityDesc?.coverImgUrl})`}}
          />
          <div className=" absolute top-0 left-0 bottom-0 right-0 z-0 bg-[rgba(0, 0, 0, 0.5)]" />
        </Flex>
      )}
      <Spin delay={500} spinning={loading} tip="Loading...">
        <Flex
          flex={1}
          vertical
          gap={20}
          className=" bg-[#ffffff] rounded-[20px] p-[16px] min-h-[300px]">
          <Flex gap={12} justify="space-between">
            <Popover
              getPopupContainer={(node) => node}
              open={visible}
              onOpenChange={setVisible}
              overlayClassName=" w-[700px]"
              overlayInnerStyle={{width: 700}}
              content={content}
              title={
                <CheckableTag
                  key={allCatlist?.name}
                  checked={activeTag === "全部"}
                  onChange={(checked) => onlanguageTag(allCatlist!, checked)}>
                  {allCatlist?.name}
                </CheckableTag>
              }
              placement="right"
              trigger="click">
              <Button
                id="_songListPopoverContainer"
                className="w-[120px]"
                iconPosition="end"
                icon={<RightOutlined />}
                shape="round">
                {activeTag === "全部" ? "全部歌单" : activeTag}
              </Button>
            </Popover>
            <Flex flex={1} justify="end">
              {hotTags.map((item, index) => {
                return (
                  <Flex align="center" key={item.name}>
                    <CheckableTag
                      key={item.name}
                      checked={activeTag === item.name}
                      onChange={(checked) => onlanguageTag(item, checked)}>
                      {item.name}
                    </CheckableTag>
                    {index !== hotTags.length - 1 ? <Divider type="vertical" /> : null}
                  </Flex>
                )
              })}
            </Flex>
          </Flex>

          {renderList()}

          <Pagination
            className=" self-center"
            current={current}
            hideOnSinglePage
            showSizeChanger={false}
            size="small"
            total={total}
            onChange={onPageChange}
          />
        </Flex>
      </Spin>
    </Flex>
  )
}

SongList.title = "歌单"

export default SongList
