/** @format */

import {Flex, Spin} from "antd"
import {MV_AREA, MV_SORT, MV_TYPE} from "@/constants/mv"
import {useEffect, useRef, useState} from "react"
import {useQuery, useVirtualListHeight} from "@/hooks"
import {IMvAllParams, mvAll} from "@/api/mv"
import VirtualList from "rc-virtual-list"
import {Artists, Image} from "@/components"
import {history} from "@umijs/max"
import {CheckableTag} from "./components"
import Utils from "@/help"
import {IMVAllItem} from "@/store/mv"
import {CaretRightOutlined} from "@ant-design/icons"

enum TagEnum {
  area = "area",
  type = "type",
  order = "order"
}

interface ITagListItem {
  title: string
  list: {id: string; value: string}[]
  key: TagEnum
  defauluTag: string
}

export default function () {
  const {
    area = "全部",
    type = "全部",
    order = "上升最快"
  } = useQuery<{area: string; type: string; order: string}>()

  console.log("area", area, type, order)

  const virtualListHeight = useVirtualListHeight(130)

  const [list, setList] = useState<IMVAllItem[]>([])

  const [loading, setLoading] = useState(false)

  const hasMoreRef = useRef(false)
  const countRef = useRef(0)

  const paramRef = useRef<IMvAllParams>({
    area,
    type,
    order,
    limit: 30,
    offset: 0
  })

  const tagList: ITagListItem[] = [
    {
      title: "地区",
      list: MV_AREA,
      key: TagEnum.area,
      defauluTag: area || "全部"
    },
    {
      title: "类型",
      list: MV_TYPE,
      key: TagEnum.type,
      defauluTag: type || "全部"
    },
    {
      title: "排序",
      list: MV_SORT,
      key: TagEnum.order,
      defauluTag: order || "上升最快"
    }
  ]

  const getList = async (init: boolean = false) => {
    try {
      setLoading(true)
      const res = await mvAll(paramRef.current)
      setLoading(false)
      hasMoreRef.current = res.hasMore
      countRef.current = res.count
      setList(init ? res.data : list.concat(res.data))
      console.log("res--111", res.data)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        130 &&
      !loading &&
      hasMoreRef.current
    ) {
      paramRef.current.offset += paramRef.current.limit
      getList()
    }
  }

  const onTag = (item: {id: string; value: string}, key: TagEnum) => {
    if (key === TagEnum.area) {
      paramRef.current.area = item.id
    } else if (key === TagEnum.order) {
      paramRef.current.order = item.id
    } else if (key === TagEnum.type) {
      paramRef.current.type = item.id
    }
    getList(true)
  }

  useEffect(() => {
    getList()
  }, [])

  const wrapList = Utils.chunkArray(list, 5)

  return (
    <Flex flex={1} gap={12} vertical className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex vertical gap={12}>
        {tagList?.map((item) => {
          return (
            <Flex gap={24} align="center" key={item.key}>
              <span>{item.title}：</span>
              <CheckableTag
                onTag={(source) => onTag(source, item.key)}
                data={item?.list}
                defauluTag={item.defauluTag}
              />
            </Flex>
          )
        })}
      </Flex>
      <Spin spinning={loading} tip="Loading...">
        <VirtualList
          onScroll={onScroll}
          itemKey="key"
          itemHeight={130}
          data={wrapList}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          height={virtualListHeight}>
          {(source: {key: number; list: IMVAllItem[]}) => {
            return (
              <Flex gap={27} key={source.key} wrap className=" pb-[16px] ">
                {source.list.map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      onClick={() => history.push(`/mv-detail/${item.id}`)}
                      vertical
                      gap={4}
                      className="cursor-pointer">
                      <div className=" relative w-[200px] h-[100px]">
                        <Image
                          src={item.cover}
                          size={[200, 100]}
                          width={200}
                          height={100}
                          className="w-[200px] h-[100px]"
                        />
                        <div className=" text-right text-[#ffffff] bottom-[4px] text-[12px] absolute w-full px-[8px]">
                          {Utils.formatSeconds(item.duration)}
                        </div>

                        <Flex
                          gap={2}
                          align="center"
                          justify="end"
                          className="text-[#ffffff] top-[4px] text-[12px] absolute w-full px-[8px]">
                          <CaretRightOutlined />
                          <span> {Utils.tranNumber(item.playCount, 0)}</span>
                        </Flex>
                      </div>
                      <div className=" text-[12px] w-[200px] line-clamp-1 text-[#282828] hover:text-[#010302]">
                        {item.name}
                      </div>
                      <Artists
                        max={1}
                        color="#B3B3B3"
                        hoverColor="#7C7D7D"
                        className="text-[12px]"
                        data={item.artists}
                      />
                    </Flex>
                  )
                })}
              </Flex>
            )
          }}
        </VirtualList>
      </Spin>
    </Flex>
  )
}
