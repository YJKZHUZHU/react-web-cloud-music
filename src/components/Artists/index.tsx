/** @format */

import React, {FC} from "react"
import {history} from "@umijs/max"
import Utils from "@/help"
import styles from "./index.scss"

export interface IItem {
  img1v1Id?: number
  topicPerson?: number
  briefDesc?: string
  picId?: number
  trans?: string
  albumSize?: number
  img1v1Url?: string
  picUrl?: string
  musicSize?: number
  followed?: boolean
  alias?: any[]
  name?: string
  id?: number
  img1v1Id_str?: string
}

interface IArtists {
  data: IItem[] | undefined
  isJump?: boolean
}

const Artists: FC<IArtists> = ({data, isJump}) => {
  if (!data || data.length === 0) return null


  const onLink = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined,
    name: string | undefined
  ) => {
    if (!isJump) return false
    e.preventDefault()
    e.stopPropagation()
    return history.push(`/artists-detail/album?id=${id}&name=${name}`)
  }

  return (
    <span className={styles.allArtists}>
      {data.map((item, index) => (
        <i
          key={(item.id as number) + index}
          className={styles.artists}
          onClick={(e) => onLink(e, item.id, item.name)}>
          <span dangerouslySetInnerHTML={{__html: Utils.highLight(item.name as string)}} />
          {index !== data.length - 1 ? "/" : null}
        </i>
      ))}
    </span>
  )
}
Artists.defaultProps = {
  isJump: true
}
export default Artists
