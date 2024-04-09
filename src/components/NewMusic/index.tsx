/** @format */

import React, { FC } from "react"
import { CaretRightOutlined, PlaySquareOutlined } from "@ant-design/icons"
import { Artists, PlayIcon } from "@/components"
import { useDispatch, history } from "@umijs/max"
import classNames from "classnames"
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

const NewMusic: FC<INewMusic> = ({ data, index }) => {
  const dispatch = useDispatch()
  console.log('data-=',data)
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
      <span className={styles.number}>{index < 10 ? `0${index}` : index}</span>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <PlayIcon iconClassName={styles.playIcon} />
      </div>
      <div className={styles.content}>
        <p className="line-clamp-1 w-[190px]">{data.name}</p>
        <span className={classNames('line-clamp-1', 'w-[190px]', 'text-[#BCBEC9]')}>
          {data.song.artists.map((d: any) => d.name).join('/')}
        </span>
      </div>
      {!!data.song.mvid ? (
        <PlaySquareOutlined
          className={styles.icon}
          onClick={() =>
            history.push(`/mv-detail?mvid=${data.song.mvid}&type=${data.song.type}`)
          }
        />
      ) : null}
    </div>
  )
}

export default NewMusic
