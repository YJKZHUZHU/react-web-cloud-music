/** @format */

import React, {FC} from "react"
import {useHistory} from "umi"
import styles from "./index.scss"

interface IItem {
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
  data: IItem[]
}

const Artists: FC<IArtists> = ({data}) => {
  if (data.length === 0) return null

  const history = useHistory()

  return (
    <>
      {data.map((item, index) => (
        <span
          key={item.id}
          className={styles.artists}
          onClick={() => history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)}>
          {item.name}
          {index !== data.length - 1 ? "/" : null}
        </span>
      ))}
    </>
  )
}
export default Artists
