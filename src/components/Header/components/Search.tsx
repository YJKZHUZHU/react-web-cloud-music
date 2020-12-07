/** @format */

import React, {useState, useEffect, FC} from "react"
import {
  CustomerServiceOutlined,
  DeleteOutlined,
  InstagramOutlined,
  PlaySquareOutlined,
  RightOutlined,
  UserOutlined,
  SearchOutlined
} from "@ant-design/icons"
import {Input, Popover, Tag, Modal, message, Space} from "antd"
import API from "@/api"
import {useRequest, useBoolean} from "ahooks"
import classnames from "classnames"
import {history, useDispatch} from "umi"
import store from "@/help/localStorage"
import Utils from "@/help"
import styles from "../index.scss"

const {confirm} = Modal

const Search = () => {
  const [visible, {toggle}] = useBoolean(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [historyList, setHistoryList] = useState(store.getValue("searchHistory") || [])
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()

  const {run, data: searchList} = useRequest((keywords) => API.getSearchSuggest({keywords}), {
    manual: true,
    debounceInterval: 500,
    formatResult: (response) => {
      if (response.code === 200 && response.result) {
        return response.result
      }
      return {}
    }
  })
  const {data: hotList} = useRequest(API.getHotList, {
    formatResult: (response) => {
      if (response.code === 200) {
        return response.data
      }
      return []
    }
  })
  const onClose = (items: any) => {
    const newHistory = historyList.filter((item: any) => item.id !== items.id)
    setHistoryList(newHistory)
    store.setValue("searchHistory", newHistory)
  }
  const toDetail = (type: number, keywords: string) => {
    if (keywords === "") return message.info("请输入要查询的关键字")
    setInputValue(keywords)
    dispatch({
      type: "songInfoModel/setKeywords",
      payload: {
        keywords
      }
    })
    // appState.setKeywords(keywords)
    //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    history.push({
      pathname: "/search-detail/single",
      query: {
        type,
        keywords
      }
    })
  }

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

  const content =
    inputValue && searchList && Object.keys(searchList).length !== 0 ? (
      <div className={styles._searchSuggest}>
        <p className={styles.searchTitle}>
          搜“
          <span className={styles.linkColor}>{inputValue}</span>
          ”相关的结果
          <RightOutlined />
        </p>
        {searchList?.artists && (
          <div className={styles.singer}>
            <p className={styles.commonTitle}>
              <UserOutlined />
              <span>歌手</span>
            </p>
            <ul>
              {searchList?.artists?.reverse()?.map((item: any) => {
                return (
                  <li
                    key={item.id}
                    className={styles.name}
                    onClick={() => toDetail(100, item.name)}>
                    <span className={styles.linkColor}>{item.name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {searchList?.songs && (
          <div className={styles.song}>
            <Space className={styles.commonTitle}>
              <CustomerServiceOutlined />
              <span>单曲</span>
            </Space>
            <ul>
              {searchList?.songs?.map((item: any) => {
                return (
                  <li key={item.id} className={styles.item} onClick={() => toDetail(1, item.name)}>
                    <p className={styles.title}>
                      <span>{item.name}</span>
                      {item.alias.length !== 0 ? (
                        <span className={styles.diff}>({item.alias.join(",")})</span>
                      ) : null}
                    </p>
                    <span className={styles.split}>-</span>
                    <p className={styles.linkColor}>{Utils.formatName(item.artists)}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {searchList?.albums && (
          <div className={styles.albums}>
            <p className={styles.commonTitle}>
              <InstagramOutlined />
              <span>专辑</span>
            </p>
            <ul>
              {searchList?.albums?.map((item: any) => {
                return (
                  <li className={styles.item} key={item.id} onClick={() => toDetail(10, item.name)}>
                    <span>{item.name}</span>
                    <span className={styles.split}>-</span>
                    <span className={styles.linkColor}>{item.artist.name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {searchList?.mvs && (
          <div className={styles.mv}>
            <p className={styles.commonTitle}>
              <PlaySquareOutlined />
              <span>视频</span>
            </p>
            <ul>
              {searchList?.mvs?.map((item: any) => {
                return (
                  <li
                    className={styles.item}
                    key={item.id}
                    onClick={() => toDetail(1014, item.name)}>
                    <span>{item.name}</span>
                    <span className={styles.split}>-</span>
                    <span className={styles.linkColor}>{item.artistName}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    ) : (
      <div className={styles._searchContent}>
        <div className={styles.history}>
          <div className={styles.top}>
            <div className={styles.icon}>
              <span>搜索历史</span>
              <div>
                <DeleteOutlined onClick={onDelete} />
              </div>
            </div>
            {historyList?.length !== 0 && (
              <p className={styles.all} onClick={() => toggle()}>
                {visible ? "收起" : "查看全部"}
              </p>
            )}
          </div>
          <div className={styles.tag}>
            {historyList?.map((item: any, index: number) => {
              return (
                <Tag
                  closable
                  key={item.id}
                  onClick={() => onHistory(item.keywords)}
                  onClose={() => onClose(item)}
                  className={styles.item}
                  visible={index < 9 ? true : visible}>
                  {item.keywords}
                </Tag>
              )
            })}
          </div>
        </div>
        <div className={styles.hot}>
          <p className={styles.title}>热搜榜</p>
          <ul>
            {hotList?.map((item: any, index: number) => {
              return (
                <li
                  className={styles.item}
                  key={item.score * index}
                  onClick={() => toDetail(1, item.searchWord)}>
                  <div className={classnames(styles.number, {[styles.diff]: index < 3})}>
                    {index}
                  </div>
                  <div className={styles.content}>
                    <div className={styles.top}>
                      <span className={styles.song}>{item.searchWord}</span>
                      <span className={styles.hotNumber}>{item.score}</span>
                      {item.iconUrl ? (
                        <div className={styles.img}>
                          <img src={item.iconUrl} alt={item.iconUrl} />
                        </div>
                      ) : null}
                    </div>
                    <span className={styles.bottom}>{item.content}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )

  useEffect(() => {
    setHistoryList(store.getValue("searchHistory"))
  }, [store.getValue("searchHistory")?.length])

  return (
    <Popover
      content={content}
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
