/** @format */

import React, {FC} from "react"
import {
  CustomerServiceOutlined,
  InstagramOutlined,
  PlaySquareOutlined,
  UserOutlined
} from "@ant-design/icons"
import {Space} from "antd"
import {useToSearchDetail} from "@/hooks"
import SearchListItem from "./SearchListItem"
import styles from "../index.scss"

interface ISearchListProps {
  value: string
  list: {
    artists: any[]
    songs: any[]
    albums: any[]
    mvs: any[]
  }
}

const SearchList: FC<ISearchListProps> = (props) => {
  const {value, list} = props
  const toDetail = useToSearchDetail()

  return (
    <div className={styles._searchSuggest}>
      <p className={styles.searchTitle}>
        搜“
        <span className={styles.linkColor}>{value}</span>
        ”相关的结果
      </p>
      <SearchListItem data={list?.artists} toDetail={(name) => toDetail(100, name)}>
        <Space>
          <UserOutlined />
          <span>歌手</span>
        </Space>
      </SearchListItem>
      <SearchListItem data={list?.songs} toDetail={(name) => toDetail(1, name)}>
        <Space>
          <CustomerServiceOutlined />
          <span>单曲</span>
        </Space>
      </SearchListItem>

      <SearchListItem data={list?.albums} toDetail={(name) => toDetail(10, name)}>
        <Space>
          <InstagramOutlined />
          <span>专辑</span>
        </Space>
      </SearchListItem>

      <SearchListItem data={list?.mvs} toDetail={(name) => toDetail(1014, name)}>
        <Space>
          <PlaySquareOutlined />
          <span>视频</span>
        </Space>
      </SearchListItem>
    </div>
  )
}

SearchList.defaultProps = {
  list: {
    albums: [],
    songs: [],
    mvs: [],
    artists: []
  }
}

export default SearchList
