/** @format */

import React, {useRef, useEffect} from "react"
import {useRequest} from "ahooks"
import {MvArea, MvSort, MvType} from "@/help/map"
import SelectTag from "../findMusic/components/Selecttag"
import {Card, Row, Col, Space, Pagination, Spin} from "antd"
import {UserOutlined, LoadingOutlined} from "@ant-design/icons"
import {history} from "umi"
import {PlayIcon, Artists} from "@/components"
import {CaretRightOutlined} from "@ant-design/icons"
import Utils from "@/help"
import API from "@/api"
import styles from "./index.scss"

interface IParamsRef {
  [key: string]: any
  type: string
  area: string
  order: string
}

interface IData {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: any
  desc: any
  artistName: string
  artistId: number
  duration: number
  mark: number
  subed: boolean
  artists: any[]
}

const Mv = () => {
  const paramsRef = useRef<IParamsRef>({type: "全部", area: "全部", order: "上升最快"})
  const countRef = useRef(0)

  const {data, loading, run, pagination} = useRequest(
    ({current, pageSize}) =>
      API.getAllMv({...paramsRef.current, limit: pageSize, offset: pageSize * (current - 1)}),
    {
      manual: true,
      paginated: true,
      formatResult: (response) => {
        if (response.code !== 200) {
          return {
            list: [],
            total: 0
          }
        }
        if (response.count) {
          countRef.current = response.count
        }
        return {
          list: response.data || [],
          total: countRef.current
        }
      }
    }
  )
  const onTag = (key: string, val: string) => {
    paramsRef.current[key] = val
    return run({current: 1, pageSize: 30})
  }

  useEffect(() => {
    run({current: 1, pageSize: 30})
  }, [])
  console.log(data)
  return (
    <div className={styles._mv}>
      <SelectTag
        style={{width: 60}}
        initChecked="全部"
        data={MvArea}
        getSelectTag={(val) => onTag("area", val)}
        label="地区"
      />
      <SelectTag
        style={{width: 60}}
        initChecked="全部"
        data={MvType}
        getSelectTag={(val) => onTag("type", val)}
        label="类型"
      />
      <SelectTag
        style={{width: 60}}
        initChecked="上升最快"
        data={MvSort}
        getSelectTag={(val) => onTag("order", val)}
        label="排序"
      />
      <Spin spinning={loading} tip="Loading...">
        <Row gutter={32} className={styles.mvList}>
          {data?.list.map((item: IData) => {
            return (
              <Col
                key={item.id}
                span={6}
                className={styles.item}
                onClick={() =>
                  history.push(`/recommend/video/mvdetail?mvid=${item?.id}&type=${0}`)
                }>
                <div className={styles.img}>
                  <img src={item?.cover} />
                  <span className={styles.durationms}>
                    {Utils.formatPlayerTime(item?.duration / 1000)}
                  </span>
                  <Space size={4} className={styles.playTime}>
                    <CaretRightOutlined />
                    <span>{Utils.tranNumber(item?.playCount, 10)}</span>
                  </Space>
                  <PlayIcon iconClassName={styles.icon} />
                </div>
                <p className={styles.title}>{item?.name}</p>
                <Artists data={item.artists} />
              </Col>
            )
          })}
        </Row>
      </Spin>

      <Pagination size="small" {...(pagination as any)} showTotal={(total) => `共${total} 条`} />
    </div>
  )
}

export default Mv
