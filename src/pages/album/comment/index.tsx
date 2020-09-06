/** @format */

import React, {useEffect, useState} from "react"
import {useRequest} from "ahooks"
import {Space, Spin} from "antd"
import {useLocation} from "umi"
import Comments, {IData, Iparams} from "@/components/Comments"
import API from "@/api"
import styles from "./index.scss"

const getData = ({id, pageSize, current, before}: Iparams): Promise<IData> =>
  API.getCommentAlbum({id, limit: pageSize, offset: (current - 1) * pageSize, before})

const Comment = () => {
  const location: any = useLocation()
  const [time, setTime] = useState(0)
  const {data, run, loading, pagination} = useRequest(
    ({current, pageSize}) => getData({...location.query, current, pageSize, before: time}),
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
    <div className={styles.comments}>
      <Space direction="vertical" className={styles.space}>
        {commentData?.hotComments ? (
          <>
            <p className={styles.wonderful}>精彩评论</p>
            <Comments data={commentData} type={0} />
          </>
        ) : null}

        <>
          <p className={styles.newComment}>最新评论({commentData?.total})</p>
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
      </Space>
    </div>
  )
}

export default Comment
