/** @format */

import React, {FC} from "react"
import styles from "../index.scss"

interface ISearchListItemProps {
  data: any[]
  toDetail: (val: string) => void
}

const SearchListItem: FC<ISearchListItemProps> = (props) => {
  const {data = [], children, toDetail} = props
  if (data?.length === 0) return null
  return (
    <div className={styles.singer}>
      {children}
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id} className={styles.name} onClick={() => toDetail(item.name)}>
              <span className={styles.linkColor}>{item.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SearchListItem.defaultProps = {
  data: []
}

export default SearchListItem
