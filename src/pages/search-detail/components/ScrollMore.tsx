import React, {FC, useState, useEffect, useCallback, ReactChild} from 'react'
import API from '@/api'
import {List, message, Avatar, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import SingleList from './SingleList'
import SingerList from './SingerList'
import VideoList from './VideoList'
import '../index.scss'

type Props = {
  location?: any,
  type: string | number,
  getCount: any
}


const initDataObj = {
  SingerList: [],
  SingleList: [],
  singerCount: 0,
  singleCount: 0
}

const ScrollMore: FC<Props> = props => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const {keywords} = props.location.query
  const {type, getCount} = props
  const [offset, setOffset] = useState(0)
  const limit = 30

  const mapRes = (res: any) => {
    const resultCount = res.result.artistCount || res.result.songCount || res.result.albumCount || res.result.videoCount || res.result.playlistCount || res.result.userprofileCount
    const resData = res.result.songs || res.result.artists || res.result.albums || res.result.videos || res.result.playlists || res.result.userprofiles
    return {
      resData,
      resultCount
    }
  }



  const handleInfiniteOnLoad = () => {
    setLoading(true)
    setOffset(offset + 1)
    if (data.length > count) {
      message.warning('已经加载完了哦!')
      setLoading(false)
      setHasMore(false)
      return
    }
    API.getSearchByType({
      keywords,
      type,
      offset,
      limit
    }).then((res: any) => {
      if (res.code === 200) {
        setData(data.concat(mapRes(res).resData))
        setCount(mapRes(res).resultCount)
        setLoading(false)
      }
    })
  }

  const ListContent = useCallback(() => {
    switch (+type) {
      case 1:
        return <SingleList data={data} loading={loading} hasMore={hasMore}/>
      case 100:
        return <SingerList data={data} loading={loading} hasMore={hasMore} type={100}/>
      case 10:
        return <SingerList data={data} loading={loading} hasMore={hasMore} type={10}/>
      case 1000:
        return <SingerList data={data} loading={loading} hasMore={hasMore} type={1000}/>
      case 1002:
        return <SingerList data={data} loading={loading} hasMore={hasMore} type={1002}/>
      case 1014:
        return <VideoList data={data} loading={loading} hasMore={hasMore} type={1014}/>
      default:
        return null
    }
  },[data])

  useEffect(() => {
    API.getSearchByType({
      keywords,
      type,
      offset,
      limit,
      loading: true
    }).then((res: any) => {
      if (res.code === 200) {
        setData(mapRes(res).resData)
        setCount(mapRes(res).resultCount)
        getCount(mapRes(res).resultCount)
      }
    })
  }, [keywords])


  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <ListContent/>
      </InfiniteScroll>
    </div>

  )
}

export default ScrollMore
