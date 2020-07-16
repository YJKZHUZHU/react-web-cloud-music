/** @format */

import React, {useState, useEffect} from "react"
import SelectTag from "./components/Selecttag"
import {message, Card, Spin, Row, Col} from "antd"
import {CLASSIFICATION, LANGUAGE, SELECT} from "@/help/map"
import API from "@/api"
import styles from "./index.scss"

const {Meta} = Card

let param = {
  type: -1,
  area: -1,
  initial: -1,
  limimt: 30,
  offset: 0
}
interface ArtistItemInterface {
  accountId: number
  albumSize: number
  alias: any[]
  briefDesc: string
  followed: boolean
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
}

const Singer = () => {
  const [data, setData] = useState<ArtistItemInterface[]>([])
  const [loading, setLoading] = useState(false)
  const getData = async (params: any) => {
    param = params
    setLoading(true)
    try {
      const Ret = await API.getArtistList(params)
      setLoading(false)
      if (Ret.code !== 200) message.info("稍后再试哦。。。")
      setData(Ret.artists)
    } catch (error) {
      setLoading(false)
    }
  }
  const getLanguage = (value: number) => {
    console.log(value)
    getData({...param, area: value})
  }
  const getClassification = (value: number) => {
    console.log(value)
    getData({...param, type: value})
  }
  const getSelect = (value: any) => {
    console.log(value)
    getData({...param, initial: value})
  }
  useEffect(() => {
    getData(param)
  }, [])
  return (
    <div className={styles.singer}>
      <SelectTag data={LANGUAGE} getSelectTag={getLanguage} label="语种" />
      <SelectTag data={CLASSIFICATION} getSelectTag={getClassification} label="分类" />
      <SelectTag data={SELECT} getSelectTag={getSelect} label="分类" />
      <Spin spinning={loading} tip="Loading...">
        <Row gutter={24}>
          {data.map((item) => (
            <Col span={4} className={styles.card}>
              <Card
                bordered={false}
                bodyStyle={{padding: 0}}
                loading={loading}
                cover={<img alt={item.name} src={item.picUrl} />}>
                <p>
                  <span>{item.name}</span>
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  )
}

export default Singer
