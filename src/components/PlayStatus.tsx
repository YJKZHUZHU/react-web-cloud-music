/** @format */

import {useSongId} from "@/store/player"
import {FC} from "react"
import playing from "@/assets/playing.png"
import classNames from "classnames"

interface Props {
  id: string | number
  className?: string
}
const PlayStatus: FC<Props> = (props) => {
  const {id, className, children} = props
  const songId = useSongId()
  const active = String(songId) === String(id)
  return active ? (
    <img className={classNames("h-[16px] w-auto", className)} src={playing} alt="" />
  ) : (
    <>{children}</>
  )
}

export default PlayStatus
