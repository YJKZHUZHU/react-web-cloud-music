/** @format */

import React, {FC} from "react"
import {CaretRightOutlined, PlaySquareOutlined} from "@ant-design/icons"
import Artists from "@/components/Artists"
import {useDispatch, useHistory} from "umi"
import styles from "./index.scss"

export interface INewSongItem {
  alg: string
  canDislike: boolean
  copywriter: any
  id: number
  name: string
  picUrl: string
  song: any
  trackNumberUpdateTime: any
  type: number
}

interface INewMusic {
  data: INewSongItem
  index: number
}

const NewMusic: FC<INewMusic> = ({data, index}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <div
      className={styles._newMusic}
      onDoubleClick={() =>
        dispatch({
          type: "songInfoModel/getSongInfo",
          payload: {
            id: data.id
          }
        })
      }>
      <span className={styles.number}>{index < 9 ? `0${index}` : index}</span>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <span className={styles.playIcon}>
          <CaretRightOutlined />
        </span>
      </div>
      <div className={styles.content}>
        <p>{data.name}</p>
        <p className={styles.name}>
          <span>
            <Artists data={data.song.artists} />
          </span>
          {!!data.song.mvid ? (
            <PlaySquareOutlined
              className={styles.icon}
              onClick={() =>
                history.push(
                  `/recommend/video/mvdetail?mvid=${data.song.mvid}&typs=${data.song.type}`
                )
              }
            />
          ) : null}
        </p>
      </div>
    </div>
  )
}

export default NewMusic
