import React, {FC, useState, useEffect} from 'react'
import {Input, Popover, Icon, Tag, Modal} from 'antd'
import API from '@/api'
import styles from './index.scss'
import {useDebounceFn} from '@umijs/hooks'
import classnames from 'classnames'
import router from 'umi/router'


const historyTag = [
  {
    name: '叶俊宽',
    id: 1
  },
  {
    name: '叶俊宽',
    id: 12
  },
  {
    name: '叶俊宽',
    id: 13
  },
  {
    name: '叶俊宽',
    id: 14
  },
  {
    name: '叶俊宽',
    id: 15
  },
  {
    name: '叶俊宽',
    id: 16
  },
  {
    name: '叶俊宽',
    id: 17
  },
  {
    name: '叶俊宽',
    id: 18
  },
  {
    name: '叶俊宽',
    id: 19
  },
  {
    name: '叶俊宽',
    id: 182
  },
  {
    name: '叶1俊宽',
    id: 191
  },
  {
    name: '叶俊宽',
    id: 1811
  },
  {
    name: '叶俊宽',
    id: 19111
  }
]

const Search: FC = props => {
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [hotList, setHotList] = useState([])
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState({})
  const [popoverVisible,setPopoverVisible] = useState(false)
  const {run} = useDebounceFn((keywords) => {
    setValue(keywords)
    setPopoverVisible(true)
    API.getSearchSuggest({keywords}).then((res: any) => {
      if (res.code === 200 && res.result) {
        setSearchList(res.result)
      }
    })
  }, 500)

  useEffect(() => {
    API.getHotList().then((res: any) => {
      if (res.code === 200) {
        setHotList(res.data)
      }
    })
  }, [])

  const onTag = () => {

  }

  const toDetail = async (type: number | string,keywords:string) => {
    await setPopoverVisible(false)
    //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    router.push({
      pathname: '/search-detail',
      query: {
        type,
        keywords
      }
    })
  }

  const onDelete = () => {
    setModalVisible(true)
    Modal.confirm({
      title: '搜索历史',
      content: '确认删除历史记录吗？',
      okText: '确认',
      cancelText: '取消',
      zIndex: 99999,
      centered: true,
      maskClosable: false,
      visible: modalVisible
    })
  }

  const content = value && Object.keys(searchList).length !== 0 ? (
    <div className={styles._searchSuggest}>
      <p className={styles.searchTitle}>搜“
        <span className={styles.linkColor}>{value}</span>
        ”相关的结果
        <Icon type="right"/>
      </p>
      <div className={styles.singer}>
        <p className={styles.commonTitle}>
          <Icon type="user"/>
          <span>歌手</span>
        </p>
        <ul>
          {
            searchList.artists && searchList.artists.map((item: any) => {
              return (
                <li key={item.id} className={styles.name} onClick={() => toDetail(100,item.name)}>
                  <span className={styles.linkColor}>{item.name}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles.song}>
        <p className={styles.commonTitle}>
          <Icon type="customer-service"/>
          <span>单曲</span>
        </p>
        <ul>
          {
            searchList.songs && searchList.songs.map((item: any) => {
              return (
                <li key={item.id} className={styles.item} onClick={() => toDetail(1,item.name)}>
                  <p className={styles.title}>
                    <span>{item.name}</span>
                    {
                      item.alias.length !== 0 ?
                        (
                          <span className={styles.diff}>({item.alias.join(',')})</span>
                        ) : null
                    }
                  </p>
                  <span className={styles.split}>-</span>
                  <p className={styles.linkColor}>
                    {
                      item.artists.map((items: any, index: number) => {
                        return (
                          <span key={items.id}>{items.name}{index + 1 !== item.artists.length ? '/' : null}</span>
                        )
                      })
                    }
                  </p>
                </li>
              )
            })
          }

        </ul>
      </div>
      <div className={styles.albums}>
        <p className={styles.commonTitle}>
          <Icon type="instagram"/>
          <span>专辑</span>
        </p>
        <ul>
          {
            searchList.albums && searchList.albums.map((item: any) => {
              return (
                <li className={styles.item} key={item.id} onClick={() => toDetail(10,item.name)}>
                  <span>{item.name}</span>
                  <span className={styles.split}>-</span>
                  <span className={styles.linkColor}>{item.artist.name}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles.mv}>
        <p className={styles.commonTitle}>
          <Icon type="play-square"/>
          <span>视频</span>
        </p>
        <ul>
          {
            searchList.mvs && searchList.mvs.map((item: any) => {
              return (
                <li className={styles.item} key={item.id} onClick={() => toDetail(1014,item.name)}>
                  <span>{item.name}</span>
                  <span className={styles.split}>-</span>
                  <span className={styles.linkColor}>{item.artistName}</span>
                </li>
              )
            })
          }
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
              <Icon type="delete" onClick={onDelete}/>
            </div>

          </div>
          <p className={styles.all} onClick={() => setVisible(!visible)}>{visible ? '收起' : '查看全部'}</p>
        </div>
        <div className={styles.tag}>
          {
            historyTag.map((item: any, index: number) => {
              return (
                <Tag
                  key={item.id}
                  closable
                  onClose={onTag}
                  className={styles.item}
                  visible={index < 9 ? true : visible}
                >
                  {item.name}
                </Tag>
              )
            })
          }
        </div>
      </div>
      <div className={styles.hot}>
        <p className={styles.title}>热搜榜</p>
        <ul>
          {
            hotList.map((item: any, index: number) => {
              return (
                <li className={styles.item} key={item.score * index} onClick={() => toDetail(1,item.searchWord)}>
                  <div className={classnames(styles.number, {[styles.diff]: index < 3})}>{index}</div>
                  <div className={styles.content}>
                    <div className={styles.top}>
                      <span className={styles.song}>{item.searchWord}</span>
                      <span className={styles.hotNumber}>{item.score}</span>
                      {
                        item.iconUrl ? <div className={styles.img}><img src={item.iconUrl}/></div> : null
                      }
                    </div>
                    <p className={styles.bottom}>{item.content}</p>
                  </div>
                </li>
              )
            })
          }

        </ul>
      </div>
    </div>
  )


  // const onSearch = (e:any) => {
  //   run()
  //   console.log(e.target.value)
  // }
  const onEnter = (value: any) => {
    console.log(value)
  }

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      placement="bottomLeft"
      visible={popoverVisible}
      overlayClassName={'_searchPop'}
      getPopupContainer={(): any => document.getElementsByClassName('_search')[0]}
    >
      <Input.Search
        style={{width: 300}}
        placeholder='搜索音乐，视频，歌词，电台'
        onClick={() => setPopoverVisible(!popoverVisible)}
        // onBlur={() => setPopoverVisible(false)}
        onChange={(e) => run(e.target.value)}
        onSearch={onEnter}
      />
    </Popover>
  )
}

export default Search
