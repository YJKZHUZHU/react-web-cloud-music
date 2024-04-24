/** @format */

import {useState} from "react"
import {SearchOutlined} from "@ant-design/icons"
import {Modal, Select} from "antd"
import {useRequest} from "ahooks"
import {history} from "@umijs/max"
import {SearchList, History} from "./index"
import API from "@/api"
import classNames from "classnames"
import store from "@/help/localStorage"
import styles from "../index.scss"
import {useSetKeywords} from "@/store/player"

const {confirm} = Modal

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const setKeywords = useSetKeywords()

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
    history.push(`/search-detail/single?keywords=${keywords}&type=1`)
  }

  const onInput = (newValue: string) => {
    setInputValue(newValue)
    if (newValue) {
      run(newValue)
      setKeywords(newValue)
    }
  }

  const showHistory = inputValue && data && Object.keys(data).length

  return (
    <Select
      showSearch
      searchValue={inputValue}
      onSearch={onInput}
      onChange={onInput}
      className={classNames(styles.searchContainer, "w-[500px] !ml-[24px]")}
      suffixIcon={<SearchOutlined className="site-form-item-icon" />}
      placeholder="搜索音乐，视频，歌词，电台"
      dropdownRender={() => (
        <>
          {showHistory ? (
            <SearchList value={inputValue} list={data} />
          ) : (
            <History onDelete={onDelete} onHistory={onHistory} />
          )}
        </>
      )}
    />
  )
}
export default Search
