/** @format */

import {IMVAllItem} from "@/store/mv"
import {Empty, Flex, Spin} from "antd"
import {history} from "@umijs/max"
import {Artists, Image, PlayVideoIcon} from "@/components"
import {CaretRightOutlined} from "@ant-design/icons"
import Utils from "@/help"
import empty from "@/assets/empty.png"

interface Props {
  loading?: boolean
  data: IMVAllItem[]
}
const List = (props: Props) => {
  const {loading = false, data} = props
  if (data.length === 0 && !loading) {
    return (
      <Empty
        imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
        image={empty}
        description="暂无MV"
      />
    )
  }
  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex wrap gap={16}>
        {data.map((item) => {
          return (
            <Flex vertical key={item.id} gap={8} className="w-[265px]">
              <div
                onClick={() => history.push(`/mv-detail/${item.id}`)}
                className="w-[265px] h-[130px] relative rounded-[5px] cursor-pointer">
                <Image
                  src={item?.cover}
                  className="w-[265px] h-[130px]"
                  width={265}
                  height={130}
                  size={[265, 130]}
                  multiple={2}
                />
                <PlayVideoIcon />
                <Flex
                  justify="end"
                  align="center"
                  gap={4}
                  className="text-[12px] text-[#ffffff] absolute w-full top-[4px] px-[8px]">
                  <CaretRightOutlined />
                  <span>{Utils.tranNumber(item?.playCount, 2)}</span>
                </Flex>
              </div>
              <span
                onClick={() => history.push(`/mv-detail/${item.id}`)}
                className=" line-clamp-1 cursor-pointer text-[#272728] text-[14px] hover:text-[#000000]">
                {item?.name}
              </span>
              <Artists
                color="#B0B0B2"
                hoverColor="#797A7A"
                className="text-[14px]"
                data={item?.artists}
              />
            </Flex>
          )
        })}
      </Flex>
    </Spin>
  )
}

export default List
