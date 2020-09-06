/** @format */

import React, {FC, useEffect, useState} from "react"
import API from "@/api"
import {Spin, Space} from "antd"
import {useRequest} from "ahooks"
import Comments, {IData, Iparams} from "@/components/Comments"
import styles from "../index.scss"

interface IProps {
  id: number
}

const getData = ({id, pageSize, current, before}: Iparams): Promise<IData> =>
  API.getMvComment({id, limit: pageSize, offset: (current - 1) * pageSize, before})

const MvComment: FC<IProps> = ({id}) => {
  const [time, setTime] = useState(0)
  const {data, run, loading, pagination} = useRequest(
    ({current, pageSize}) => getData({id, current, pageSize, before: time}),
    {
      manual: true,
      paginated: true,
      defaultPageSize: 60,
      onSuccess: (response: any) => {
        setTime(response?.comments?.pop()?.time as number)
      }
    }
  )

  useEffect(() => {
    run({current: 1, pageSize: 60})
  }, [])
  const commentData: IData = data as any

  return (
    <>
      <Space direction="vertical" className={styles.space}>
        {commentData?.hotComments ? (
          <>
            <p className={styles.wonderful}>精彩评论</p>
            <Comments data={commentData} type={0} />
          </>
        ) : null}
      </Space>

      <p>最新评论({commentData?.total})</p>
      <Spin spinning={loading} tip="加载中...">
        <Comments
          type={1}
          data={commentData}
          pagination={{
            ...(pagination as any),
            size: "small",
            style: {textAlign: "center"}
          }}
        />
      </Spin>
    </>
  )
}

export default MvComment
