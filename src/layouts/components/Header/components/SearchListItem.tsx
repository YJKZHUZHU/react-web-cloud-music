/** @format */

import { FC } from "react"
import { HighlightText } from '@/components'
import styles from "../index.scss"

interface ISearchListItemProps {
  value: string
  data: any[]
  toDetail: (val: string) => void
}

const SearchListItem: FC<ISearchListItemProps> = (props) => {
  const { data = [], children, toDetail, value } = props
  if (data?.length === 0) return null
  return (
    <div className={styles.singer}>
      {children}
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id} className={styles.name} onClick={() => toDetail(item.name)}>
              <HighlightText className={styles.linkColor} content={item.name} pattern={new RegExp(value, 'g')} />
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
