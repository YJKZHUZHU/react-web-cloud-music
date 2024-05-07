/** @format */

import React, {useEffect, useMemo, useState} from "react"
import {history} from "@umijs/max"
import {
  Row,
  Col,
  Spin,
  Pagination,
  Flex,
  Image,
  Button,
  Popover,
  Tag,
  Divider
} from "antd"
import {IPlaylistParams, playlist} from "@/api/songList"
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
import Skeleton from "react-loading-skeleton"
import {
  CaretRightOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons"
import Utils from "@/help"
import {useQuery} from "@/hooks"

const {CheckableTag} = Tag

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
      // {cat: activeTag, order: "hot", limit: 50, offset}
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
    console.log("item--", item, checked)
    close && setVisible(false)
    if (item.name === activeTag) return
    updateActiveTag(item.name === "全部歌单" ? "全部" : item.name)
    getList({cat: item.name, order: "hot", limit: 50, offset: 0})
  }

  const onPageChange = (page: number) => {
    setCurrent(page)
    getList({cat: activeTag, order: "hot", limit: 50, offset: (page - 1) * 50})
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
                    <CheckableTag
                      className="line-clamp-1"
                      key={d.name}
                      checked={activeTag === d.name}
                      onChange={(checked) => onlanguageTag(d, checked, true)}>
                      {d.name}
                    </CheckableTag>
                  )
                })}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    )
  }, [activeTag])

  useEffect(() => {
    tag && updateActiveTag(tag)
    getList({cat: tag || "全部", order: "hot", limit: 50, offset: 0})
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
              src={`${highqualityDesc?.coverImgUrl}?param=140y140`}
              fallback="data:image/png;base64,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"
              placeholder={<Skeleton height={140} />}
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
              open={visible}
              onOpenChange={setVisible}
              overlayClassName=" w-[700px]"
              content={content}
              title={
                <CheckableTag
                  key={allCatlist?.name}
                  checked={activeTag === "全部"}
                  onChange={(checked) => onlanguageTag(allCatlist!, checked)}>
                  {allCatlist?.name}
                </CheckableTag>
              }
              placement="bottom"
              trigger="click">
              <Button
                style={{width: 120}}
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

          <Row gutter={[18, 24]}>
            {list.map((item) => {
              return (
                <Col key={item.id} xxl={{span: 4}} xl={{span: 4}}>
                  <Flex
                    onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
                    vertical
                    gap={12}>
                    <div className=" relative cursor-pointer ">
                      <Image
                        height="100%"
                        width="100%"
                        preview={false}
                        src={item.coverImgUrl}
                        fallback="data:image/png;base64,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"
                        placeholder={<Skeleton height={250} />}
                      />
                      <Flex
                        gap={2}
                        align="center"
                        className="text-[#ffffff] absolute top-[10px] right-[8px]">
                        <CaretRightOutlined />
                        <span className="">{Utils.tranNumber(item.playCount)}</span>
                      </Flex>
                      <Flex
                        gap={2}
                        align="center"
                        className="text-[#ffffff] absolute bottom-[10px] left-[8px]">
                        <UserOutlined />
                        <span className=" max-w-[90px] line-clamp-1">{item.creator?.nickname}</span>
                        <img
                          alt=""
                          className=" h-[12px]"
                          src={`${item?.creator?.avatarDetail?.identityIconUrl}?param=12y12`}
                        />
                      </Flex>
                    </div>
                    <span className=" line-clamp-2 text-[#7D829E] leading-[18px]">{item.name}</span>
                  </Flex>
                </Col>
              )
            })}
          </Row>
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
