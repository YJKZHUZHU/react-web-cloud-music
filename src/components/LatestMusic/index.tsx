/** @format */

import React, {FC, useState, useEffect} from "react"
import styles from "./index.scss"
import {CaretRightOutlined, PlayCircleOutlined} from "@ant-design/icons"
import { Radio, Tabs} from "antd"
import API from "@/api"
import {history, useDispatch} from "umi"
import Utils from "@/help"

const {TabPane} = Tabs

interface IList {
  active: string
}
const List: FC<IList> = ({active}) => {
  const [dataList, setDataList] = useState([])
  const dispatch = useDispatch()
  const getAPIData = () => {
    API.getLatestMusic({
      type: active,
      loading: true
    }).then((res) => {
      if (res.code === 200) {
        setDataList(res.data)
      }
    })
  }
  const onMv = (mvid: string) => {
    history.push({
      pathname: "/recommend/video/mvDetail",
      query: {mvid}
    })
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
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
              <span className={styles.number}>{index < 10 ? `0${index + 1}` : index + 1}</span>
              <div className={styles.img}>
                <img src={item.album.picUrl} />
                <div className={styles.icon}>
                  <CaretRightOutlined />
                </div>
              </div>
              <p className={styles.content}>
                <span>{item.name}</span>
                {item.transNames && <span>(</span>}

                {item.transNames &&
                  item.transNames.map((items: any, index: number) => {
                    return (
                      <i className={styles.smallTip} key={index}>
                        {items}
                      </i>
                    )
                  })}
                {item.transNames && <span>)</span>}
                {!!item.mvid ? (
                  <PlayCircleOutlined className={styles.playIcon} onClick={() => onMv(item.mvid)} />
                ) : null}
              </p>
              <p className={styles.name}>
                {item.artists &&
                  item.artists.map((nameItem: any, index: number) => {
                    return (
                      <i key={nameItem.id}>
                        {nameItem.name}
                        {item.artists.length === index + 1 ? null : "/"}
                      </i>
                    )
                  })}
              </p>
              <p className={styles.title}>
                {item.album.name}
                {item.album.transNames && <span>(</span>}
                {item.album.transNames &&
                  item.album.transNames.map((albumItem: any, index: number) => {
                    return <i key={index}>{albumItem}</i>
                  })}
                {item.album.transNames && <span>)</span>}
              </p>
              <p className={styles.time}>{Utils.formatPlayerTime(item.duration / 1000)}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const LatestMusic: FC = (props) => {
  const [active, setActive] = useState("0")
  const [radioKey, setRadioKey] = useState(1)
  const onTab = (value: string) => {
    setActive(value)
  }

  const onRadioGroup = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <div className={styles._latestMusic}>
      <div className={styles.radioGroup}>
        <Radio.Group
          defaultValue={1}
          onChange={(e) => setRadioKey(e.target.value)}
          value={radioKey}>
          <Radio.Button value={1}>新歌速递</Radio.Button>
          <Radio.Button value={2}>新碟上架</Radio.Button>
        </Radio.Group>
      </div>

      <Tabs defaultActiveKey="0" onChange={onTab} activeKey={active} animated={false}>
        <TabPane tab="全部" key="0">
          {radioKey === 1 ? <List active={active} /> : "111"}
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
