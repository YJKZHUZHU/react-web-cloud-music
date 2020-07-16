/** @format */

import React, {useState, FC} from "react"
import {Tag, Descriptions, Divider} from "antd"
import styles from "./index.scss"

const {CheckableTag} = Tag
const {Item} = Descriptions

interface ItemInterface {
  id: any
  value: any
}

interface SelectTagInterface {
  data: ItemInterface[]
  getSelectTag: (value: any) => void
  label: string
}

const SelectTag: FC<SelectTagInterface> = ({data, getSelectTag, label}) => {
  const [selectTag, setSelectTag] = useState([-1])
  const onlanguageTag = (id: number, checked: boolean) => {
    if (checked) {
      setSelectTag([id])
      getSelectTag(id)
    }
  }
  return (
    <Descriptions column={1} colon={false}>
      <Item label={label} className={styles.desItem}>
        <ul className={styles.select}>
          {data.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <CheckableTag
                key={item.id}
                checked={selectTag.indexOf(item.id) > -1}
                onChange={(checked) => onlanguageTag(item.id, checked)}>
                {item.value}
              </CheckableTag>
              {index !== data.length - 1 ? <Divider type="vertical" /> : null}
            </li>
          ))}
        </ul>
      </Item>
    </Descriptions>
  )
}

SelectTag.defaultProps = {
  label: ""
}

export default SelectTag
