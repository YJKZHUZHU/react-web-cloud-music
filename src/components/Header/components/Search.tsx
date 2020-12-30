/** @format */

import React, {useState} from "react"
import {SearchOutlined} from "@ant-design/icons"
import {Input, Popover, Modal} from "antd"
import {useRequest} from "ahooks"
import {history, useDispatch} from "umi"
import SearchList from "./SearchList"
import History from "./History"
import API from "@/api"
import {useToSearchDetail} from "@/hooks"
import store from "@/help/localStorage"
import styles from "../index.scss"

const {confirm} = Modal

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const toDetail = useToSearchDetail()

  const {run, data} = useRequest((keywords) => API.getSearchSuggest({keywords}), {
    manual: true,
    debounceInterval: 500,
    formatResult: (response) => {
      if (response.code === 200 && response.result) {
        return response.result
      }
      return {}
    }
  })

  const onDelete = () => {
    setModalVisible(true)
    confirm({
      title: "搜索历史",
      content: "确认删除全部搜索历史记录吗？",
      okText: "确认",
      cancelText: "取消",
      zIndex: 99999,
      centered: true,
      maskClosable: false,
      visible: modalVisible,
      onOk: () => {
        return new Promise((resolve, reject) => {
          store.setValue("searchHistory", [])
          if (store.getStorage("searchHistory") === "[]") {
            resolve(setModalVisible(false))
          }
          reject(setModalVisible(false))
        })
      }
    })
  }

  const onHistory = (keywords: string) => {
    setInputValue(keywords)
    history.push({
      pathname: "/search-detail/single",
      query: {
        keywords,
        type: 1
      }
    })
  }

  const onInput = (e: any) => {
    setInputValue(e.target.value)
    if (e.target.value) {
      run(e.target.value)
      dispatch({
        type: "songInfoModel/setKeywords",
        payload: {
          keywords: e.target.value
        }
      })
    }
  }

  const showHistory = inputValue && data && Object.keys(data).length

  return (
    <Popover
      content={
        showHistory ? (
          <SearchList value={inputValue} list={data} />
        ) : (
          <History onDelete={onDelete} onHistory={onHistory} />
        )
      }
      title={null}
      trigger="click"
      placement="bottomLeft"
      overlayClassName={"_searchPop"}
      getPopupContainer={(): any => document.getElementsByClassName("_search")[0]}>
      <Input
        type="search"
        suffix={<SearchOutlined onClick={() => toDetail(1, inputValue)} />}
        className={styles.inputSearch}
        value={inputValue}
        placeholder="搜索音乐，视频，歌词，电台"
        onChange={onInput}
        onPressEnter={(e: any) => toDetail(1, e.target.value)}
      />
    </Popover>
  )
}
export default Search
