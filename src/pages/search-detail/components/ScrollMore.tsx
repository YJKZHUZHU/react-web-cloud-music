import React, {FC, useState, useEffect, useCallback, ReactChild} from 'react'
import API from '@/api'
import {List, message, Avatar, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import SingleList from './Single'
import '../index.scss'

type Props = {
  location?: any,
  type: string | number,
  getCount: any
}

const mapRes = (res: any) => {
  const resultCount = res.result.artistCount || res.result.songCount || res.result.albums || res.result.videos || res.result.playlists || res.result.userprofiles
  const resData = res.result.songs || res.result.artists || res.result.albumCount || res.result.videoCount || res.result.playlistCount || res.result.userprofileCount
  return {
    resData,
    resultCount
  }
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

  const getData = useCallback(() => {
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
  }, [keywords, type])


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

  const ListContent = () => {

    switch (+type) {
      case 1:
        return <SingleList data={data} loading={loading} hasMore={hasMore} />
        break
      default :
        return null
    }
  }

  useEffect(() => {
    getData()
  }, [type,keywords])


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
        {/*<List*/}
        {/*  dataSource={data}*/}
        {/*  renderItem={(item: any) => (*/}
        {/*    <List.Item key={item.id}>*/}
        {/*      <List.Item.Meta*/}
        {/*        avatar={*/}
        {/*          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>*/}
        {/*        }*/}
        {/*        title={<a href="https://ant.design">{item.name.last}</a>}*/}
        {/*        description={item.name}*/}
        {/*      />*/}
        {/*      <div>Content</div>*/}
        {/*    </List.Item>*/}
        {/*  )}*/}
        {/*>*/}
        {/*  {loading && hasMore && (*/}
        {/*    <div className="demo-loading-container">*/}
        {/*      <Spin/>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</List>*/}
      </InfiniteScroll>
    </div>

  )
}

export default ScrollMore
