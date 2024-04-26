/** @format */

import {FC} from "react"
import {history} from "@umijs/max"
import classNames from "classnames"

interface Props {
  data: {
    id: string | number
    name: string
    [prop: string]: any
  }[]
  color?: string
  disabled?: boolean
  className?: string
}
const People: FC<Props> = (props) => {
  const {data, color, disabled = false, className} = props
  const onLink = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: {id: string | number; name: string}
  ) => {
    if (disabled) return false
    e.preventDefault()
    e.stopPropagation()
    const {id, name} = item
    return history.push(`/artists-detail?id=${id}&name=${name}`)
  }

  return (
    <div className={classNames("flex", "items-center", className)}>
      {data.map((item, index) => {
        return (
          <i
            key={item.id}
            onClick={(e) => onLink(e, item)}
            style={{color: color}}
            className="text-[#BABABD] cursor-pointer hover:text-[#363D62]">
            {item.name}
            {index !== data.length - 1 ? "/" : null}
          </i>
        )
      })}
    </div>
  )
}

export default People
