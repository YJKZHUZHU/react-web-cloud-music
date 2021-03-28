/** @format */
import React, {FC} from "react"
import {Tag, Divider} from "antd"
import styles from "../index.scss"

const {CheckableTag} = Tag

interface IVedioGroupListItem {
  id: number
  name: string
}

interface IPopoverContentProps {
  data: IVedioGroupListItem[]
  tag: string
  callback: (id: any, name: string, checked: any) => void
}
const PopoverContent: FC<IPopoverContentProps> = (props) => {
  const {data, tag, callback} = props
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        return (
          <li className={styles.item}>
            <CheckableTag
              className={styles.chooseTag}
              key={item.name}
              checked={item.name === tag}
              onChange={(checked) => callback(item.id, item.name, checked)}>
              {item.name}
            </CheckableTag>
            <Divider type="vertical" className={styles.divider} />
          </li>
        )
      })}
    </ul>
  )
}

export default PopoverContent
