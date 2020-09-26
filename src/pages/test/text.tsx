

import React, {FC, useState, useEffect} from "react"
import {CaretRightOutlined, PlaySquareOutlined} from "@ant-design/icons"
import {Radio, Tabs, message, Spin} from "antd"
import {useDispatch, history} from "umi"
import {useRequest} from "ahooks"
import Artists from "@/components/Artists"
import API from "@/api"
import Utils from "@/help"
import styles from "./index.scss"

const {TabPane} = Tabs

interface IList {
  active: string
}

const List: FC<IList> = ({active}) => {
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const getAPIData = async () => {
    setLoading(true)
    try {
      const Ret = await API.getLatestMusic({type: active})
      setLoading(false)
      if (Ret.code !== 200) return message.info("数据异常，稍后再试哦...")
      setDataList(Ret.data)
    } catch (error) {
      console.log(error)
      return setLoading(false)
    }
  }

  const onMv = (mvid: string) => {
    history.push({
      pathname: "/recommend/video/mvDetail",
      query: {
        mvid
      }
    })
  }

  useEffect(() => {
    getAPIData()
  }, [])

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className={styles.list}>
        <ul>
          {dataList.map((item: any, index: number) => {
            return (
              <li
                className={styles.item}
                key={item.id}
                onDoubleClick={() =>
                  dispatch({
                    type: "songInfoModel/getSongInfo",
                    payload: {
                      id: item.id
                    }
                  })
                }>
                <span className={styles.number}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                <div className={styles.img}>
                  <img src={item.album.picUrl} />
                  <div className={styles.icon}>
                    <CaretRightOutlined />
                  </div>
                </div>
                <p className={styles.content}>
                  <span>{item.name}</span>
                  {item.alias.length !== 0 &&
                    item.alias.map((items: any, index: number) => {
                      return (
                        <i className={styles.smallTip} key={index}>
                          {index === 0 ? "(" : null}
                          {items}
                          {index === 0 ? ")" : null}
                        </i>
                      )
                    })}
                  {!!item.mvid ? (
                    <PlaySquareOutlined
                      className={styles.playIcon}
                      onClick={() => onMv(item.mvid)}
                    />
                  ) : null}
                </p>
                <p className={styles.name}>
                  <Artists data={item.artists} />
                </p>
                <p className={styles.title}>
                  {item.album.name}
                  {item.alias.length !== 0 &&
                    item.alias.map((items: any, index: number) => {
                      return (
                        <i className={styles.smallTip} key={index}>
                          {index === 0 ? "(" : null}
                          {items}
                          {index === 0 ? ")" : null}
                        </i>
                      )
                    })}
                </p>
                <p className={styles.time}>{Utils.formatPlayerTime(item.duration / 1000)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Spin>
  )
}

const LatestMusic = () => {
  const [active, setActive] = useState("0")
  const [radioKey, setRadioKey] = useState<"new-songs" | "new-disc">("new-songs")
  const onTab = (value: string) => {
    setActive(value)
  }

  return (
    <div className={styles._latestMusic}>
      <div className={styles.radioGroup}>
        <Radio.Group
          defaultValue={1}
          onChange={(e) => setRadioKey(e.target.value)}
          value={radioKey}>
          <Radio.Button value="new-songs">新歌速递</Radio.Button>
          <Radio.Button value="new-disc">新碟上架</Radio.Button>
        </Radio.Group>
      </div>

      <Tabs defaultActiveKey="0" onChange={onTab} activeKey={active} animated={false}>
        <TabPane tab="全部" key="0">
          {radioKey === "new-disc" ? <List active={active} /> : "111"}
        </TabPane>
        <TabPane tab="华语" key="7">
          {radioKey === 1 ? <List active={active} /> : "111"}
        </TabPane>
        <TabPane tab="欧美" key="96">
          {radioKey === 1 ? <List active={active} /> : "111"}
        </TabPane>
        <TabPane tab="韩国" key="16">
          {radioKey === 1 ? <List active={active} /> : "111"}
        </TabPane>
        <TabPane tab="日本" key="8">
          {radioKey === 1 ? <List active={active} /> : "111"}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LatestMusic
