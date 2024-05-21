/** @format */

import {useEffect} from "react"
import {Row, Col, Flex} from "antd"
import {history} from "@umijs/max"
import {People} from "@/components"
import classNames from "classnames"
import {useGlobalList, useInit, useOfficialList} from "@/store/top"
import dayjs from "dayjs"
import Card from "./components/Card"
import styles from "./index.scss"
import {CaretRightOutlined, RightOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {useGetSongInfo} from "@/store/player"

export default () => {
  const init = useInit()

  const getSongInfo = useGetSongInfo()

  const officialList = useOfficialList()
  const globalList = useGlobalList()

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={classNames(styles.topContainer, "flex flex-col gap-[40px]")}>
      <Flex vertical gap={20} className={classNames("bg-[#ffffff] rounded-[20px] p-[16px]")}>
        <div className="text-[32px] font-[600]  text-[#363D62]">全球榜</div>
        <Flex vertical gap={20} justify="space-between">
          {officialList.map((item) => {
            return (
              <Flex key={item.id} gap={20}>
                <div
                  style={{
                    backgroundImage: `-webkit-cross-fade(url(${item.tracks[0].al.picUrl}?param=200y200), url(${item.coverImgUrl}), 95%)`
                  }}
                  className={classNames(styles.bg, "w-[200px]")}>
                  <span className="text-[#ffffff] text-[12px] mt-[60px]">
                    {dayjs(item.updateTime).format("MM月DD日更新")}
                  </span>
                </div>
                <Flex flex={1} vertical justify="space-between">
                  <Flex vertical>
                    {item.tracks.slice(0, 5).map((d, index) => {
                      return (
                        <div
                          onDoubleClick={() => getSongInfo(d.id)}
                          key={d.id}
                          className={classNames(
                            "h-[35px] flex items-center gap-[8px] hover:bg-[#F1F1F2]",
                            {
                              "bg-[#F9F9F9]": index % 2 === 0
                            }
                          )}>
                          <span
                            className={classNames(
                              {
                                "text-[#E00000]": index <= 2,
                                "text-[#BABABD]": index > 2
                              },
                              "pr-[8px]",
                              "pl-[4px]"
                            )}>
                            {index + 1}
                          </span>
                          <span className="text-[#363D62] w-[300px] line-clamp-1">
                            {d.name}
                            <i className="text-[#BABABD]">
                              {d.alia.join() && `(${d.alia.join()})`}
                            </i>
                          </span>
                          <span className="text-[#BABABD] w-[250px] line-clamp-1">
                            专辑-{d.al.name}
                          </span>
                          <People
                            data={d.ar.slice(0, 3)}
                            className="flex-1 justify-end text-[#BABABD] line-clamp-1 pr-[4px]"
                          />
                        </div>
                      )
                    })}
                  </Flex>

                  <div
                    onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
                    className="inline-flex items-center cursor-pointer text-[#BABABD] hover:text-[#363D62]">
                    <span>查看全部</span>
                    <RightOutlined />
                  </div>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Flex>

      <Card title="全球榜">
        <Row gutter={[32, 16]}>
          {globalList.map((item) => {
            return (
              <Col key={item.id} span={4}>
                <div
                  className="w-[150px] h-[150px] bg-no-repeat relative bg-cover  rounded-[12px] mb-[8px] cursor-pointer"
                  style={{backgroundImage: `url(${item.coverImgUrl}?param=300y300)`}}
                  onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}>
                  <div className="flex items-center gap-[4px] absolute right-[10px] top-[10px]">
                    <CaretRightOutlined style={{color: "#ffffff", fontSize: 18}} />
                    <span className="text-[18px] text-[#ffffff]">
                      {Utils.tranNumber(item.playCount, 2)}
                    </span>
                  </div>
                </div>
                <span className="text-[#363D62] text-[18px]">{item.name}</span>
              </Col>
            )
          })}
        </Row>
      </Card>
    </div>
  )
}
