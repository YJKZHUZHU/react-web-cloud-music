/** @format */

import React, {FC, useState, useEffect, useMemo} from "react"
import {
  CustomerServiceOutlined,
  DeleteOutlined,
  InstagramOutlined,
  PlaySquareOutlined,
  RightOutlined,
  UserOutlined,
  SearchOutlined
} from "@ant-design/icons"
import {Input, Popover, Tag, Modal, message} from "antd"
import API from "@/api"
import styles from "./index.scss"
import {useDebounceFn} from "@umijs/hooks"
import classnames from "classnames"
import {history} from "umi"
import store from "@/help/localStorage"
import {Subscribe} from "@/Appcontainer"
import {appState} from "@/models/gloable"
import Utils from "@/help"

const {confirm} = Modal

const Search: FC = () => {
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [hotList, setHotList] = useState([])
  const [searchList, setSearchList] = useState<any>({})
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [historyList, setHistoryList] = useState(store.getValue("searchHistory") || [])
  const [inputValue, setInputValue] = useState("")
  const {run} = useDebounceFn(async (keywords) => {
    const Ret: any = await API.getSearchSuggest({keywords})
    if (Ret.code === 200 && Ret.result) {
      setSearchList(Ret.result)
    }
    await appState.setKeywords(keywords)
  }, 500)

  const onClose = (items: any) => {
    const newHistory = historyList.filter((item: any) => item.id !== items.id)
    setHistoryList(newHistory)
    store.setValue("searchHistory", newHistory)
  }
  const toDetail = (type: number, keywords: string) => {
    if (keywords === "") return message.info("请输入要查询的关键字")
    setInputValue(keywords)
    setPopoverVisible(false)
    appState.setKeywords(keywords)
    //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    history.push({
      pathname: "/search-detail",
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
    setPopoverVisible(false)
    setInputValue(keywords)
    history.push({
      pathname: "/search-detail",
      query: {
        keywords,
        type: 1
      }
    })
  }

  const content =
    inputValue && Object.keys(searchList).length !== 0 ? (
      <div className={styles._searchSuggest}>
        <p className={styles.searchTitle}>
          搜“
          <span className={styles.linkColor}>{inputValue}</span>
          ”相关的结果
          <RightOutlined />
        </p>
        <div className={styles.singer}>
          <p className={styles.commonTitle}>
            <UserOutlined />
            <span>歌手</span>
          </p>
          <ul>
            {searchList.artists &&
              searchList.artists.reverse().map((item: any) => {
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
        <div className={styles.song}>
          <p className={styles.commonTitle}>
            <CustomerServiceOutlined />
            <span>单曲</span>
          </p>
          <ul>
            {searchList.songs &&
              searchList.songs.map((item: any) => {
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
        <div className={styles.albums}>
          <p className={styles.commonTitle}>
            <InstagramOutlined />
            <span>专辑</span>
          </p>
          <ul>
            {searchList.albums &&
              searchList.albums.map((item: any) => {
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
        <div className={styles.mv}>
          <p className={styles.commonTitle}>
            <PlaySquareOutlined />
            <span>视频</span>
          </p>
          <ul>
            {searchList.mvs &&
              searchList.mvs.map((item: any) => {
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
            <p className={styles.all} onClick={() => setVisible(!visible)}>
              {visible ? "收起" : "查看全部"}
            </p>
          </div>
          <div className={styles.tag}>
            {historyList.map((item: any, index: number) => {
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
            {hotList.map((item: any, index: number) => {
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
                    <p className={styles.bottom}>{item.content}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )

  const onInput = (e: any) => {
    setPopoverVisible(true)
    setInputValue(e.target.value)
    if (e.target.value) {
      run(e.target.value)
    }
  }

  useEffect(() => {
    API.getHotList().then((res: any) => {
      if (res.code === 200) {
        setHotList(res.data)
      }
    })
  }, [])

  useEffect(() => {
    setHistoryList(store.getValue("searchHistory"))
  }, [store.getValue("searchHistory").length])

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      placement="bottomLeft"
      visible={popoverVisible}
      overlayClassName={"_searchPop"}
      getPopupContainer={(): any => document.getElementsByClassName("_search")[0]}>
      <Input
        type="search"
        suffix={<SearchOutlined onClick={() => toDetail(1, inputValue)} />}
        className={styles.search}
        value={inputValue}
        placeholder="搜索音乐，视频，歌词，电台"
        onClick={() => setPopoverVisible(!popoverVisible)}
        onChange={onInput}
        onPressEnter={(e: any) => toDetail(1, e.target.value)}
      />
    </Popover>
  )
}
// @ts-ignore
export default Subscribe(Search)
