/** @format */

import {useEffect} from "react"
import {Row, Col} from "antd"
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
      <Card title="官方榜单">
        <div className="flex flex-col gap-[20px]">
          {officialList.map((item) => {
            return (
              <div key={item.id} className="flex justify-between gap-[20px]">
                <div
                  style={{
                    backgroundImage: `-webkit-cross-fade(url(${item.tracks[0].al.picUrl}?param=200y200), url(${item.coverImgUrl}), 95%)`
                  }}
                  className={classNames(styles.bg)}>
                  <span className="text-[#ffffff] text-[12px] mt-[60px]">
                    {dayjs(item.updateTime).format("MM月DD日更新")}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className=" flex flex-col">
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
                  </div>

                  <div
                    onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
                    className="inline-flex items-center cursor-pointer text-[#BABABD] hover:text-[#363D62]">
                    <span>查看全部</span>
                    <RightOutlined />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
      <Card title="全球榜">
        <Row gutter={[32, 16]} justify="space-between">
          {globalList.map((item) => {
            return (
              <Col key={item.id} span={4}>
                <div
                  className="w-150 h-[150px] bg-no-repeat relative bg-cover  rounded-[12px] mb-[8px] cursor-pointer"
                  style={{backgroundImage: `url(${item.coverImgUrl}?param=150y150)`}}
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
