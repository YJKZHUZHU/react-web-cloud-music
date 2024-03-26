/** @format */

import React, {FC} from "react"
import {useRequest} from "ahooks"
import {history} from "@umijs/max"
import {Skeleton, Button} from "antd"
import {GlobalOutlined} from "@ant-design/icons"
import API from "@/api"
import {removeNewlines} from "@/help"
import styles from "../index.scss"

interface IData {
  id: number
  coverImgUrl: string
  name: string
  copywriter: string
  description: string
  [props: string]: any
}

interface IResponse {
  code: number
  lasttime: number
  more: boolean
  playlists: IData
  total: number
}
// 精品歌单描述
interface BoutiqueSongListDescProps {
  cat: string
}

const BoutiqueSongListDesc: FC<BoutiqueSongListDescProps> = ({cat}) => {
  const {data, loading} = useRequest<IResponse, any[], IData, IData>(
    () => API.getHighQuality({limit: 1, cat}),
    {
      refreshDeps: [cat],
      loadingDelay:500,
      formatResult: (response) => {
        if (response.code !== 200) return {}
        return response.playlists[0]
      }
    }
  )

  if (Object.keys(data || {}).length === 0 && !loading) return null

  return (
    <>
      {loading ? (
        <Skeleton avatar paragraph={{rows: 4}} />
      ) : (
        <div
          className={styles.highQuality}
          onClick={() => history.push(`/playList/${data?.id}?listId=${data?.id}`)}>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={`${data?.coverImgUrl}?param=280y280`} alt={data?.name} />
            </div>
            <div className={styles.desc}>
              <Button shape="round" className={styles.icon}>
                <GlobalOutlined />
                精品歌单
              </Button>
              <p className={styles.title}>{data?.name}</p>
              <p className={styles.name}>{data?.copywriter}</p>
              <p className={styles.detail}>{removeNewlines(data?.description as string)}</p>
            </div>
          </div>
          <div
            className={styles.background}
            style={{backgroundImage: `url(${data?.coverImgUrl})`}}></div>
          <div className={styles.mask}></div>
        </div>
      )}
    </>
  )
}

export default BoutiqueSongListDesc
