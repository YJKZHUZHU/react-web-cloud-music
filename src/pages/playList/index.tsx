/** @format */

import {useState} from "react"
import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined,
  EditOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons"
import {Button, Tabs, Input, Space, Avatar} from "antd"
import {history, useParams} from "@umijs/max"
import dayjs from "dayjs"
import {HotComment, NewComment} from "@/components"
import {ListTable, Collection} from "./components"
import usePlayList from "./hooks/usePlayList"
import Utils from "@/help"
import classNames from "classnames"
import styles from "./index.scss"

const {Search} = Input

const PlayList = () => {
  const params: any = useParams()

  const {id} = params
  const {isSearch, toggle, data, tableList, loading, onPlayAll, label, commentTabContent} =
    usePlayList(id)
  const [searchValue, setSearchValue] = useState("")

  const items = [
    {
      label: "歌曲列表",
      key: "1",
      children: <ListTable data={tableList} loading={loading} searchValue={searchValue} />
    },
    {
      label: commentTabContent,
      key: "2",
      children: (
        <>
          <HotComment type={2} id={id} />
          <NewComment type={2} id={id} />
        </>
      )
    },
    {
      label: "收藏者",
      key: "3",
      children: <Collection subscribedCount={data?.subscribedCount} />
    }
  ]

  return (
    <Space direction="vertical" className={styles._playList} size={0}>
      <Space className={styles.top} size={16}>
        <Avatar
          icon={<CustomerServiceOutlined />}
          size={200}
          shape="square"
          alt="资源加载异常"
          src={`${data?.creator.backgroundUrl}?param=200y200`}
        />

        <Space direction="vertical" size={12}>
          <Space className={styles.name}>
            <span className={styles.colorLabel}>歌单</span>
            <span className={styles.markTitle}>{data?.name}</span>
            {!data?.subscribed ? (
              <EditOutlined onClick={() => history.push(`/edit-song-list?id=${data?.id}`)} />
            ) : null}
          </Space>
          <Space className={styles.name}>
            <Avatar
              icon={<CustomerServiceOutlined />}
              size={40}
              shape="square"
              alt="资源加载异常"
              src={`${data?.creator.avatarUrl}?param=40y40`}
            />
            <a onClick={() => history.push(`/homepage?uid=${data?.userId}`)}>
              {data?.creator.nickname}
            </a>
            <Space>
              <span>{dayjs(data?.createTime).format("YYYY-MM-DD")}</span>
              <i>创建</i>
            </Space>
          </Space>
          <Space>
            <Button icon={<PlayCircleOutlined />} onClick={onPlayAll} type="primary">
              <div className=" inline-flex gap-[4px] items-center">
                <span> 播放全部</span>
                <PlusOutlined />
              </div>
            </Button>
            <Button
              icon={data?.subscribed ? <CheckOutlined /> : <FolderAddOutlined />}
              type="primary">
              {data?.subscribed ? "已收藏" : "收藏"}({Utils.tranNumber(data?.subscribedCount, 0)})
            </Button>
            <Button icon={<ShareAltOutlined />} type="primary">
              分享({Utils.tranNumber(data?.shareCount, 0)})
            </Button>
          </Space>
          {label && (
            <Space>
              <span>标签:</span>
              <Space split="/">
                {label.map((item: any, index: number) => {
                  return (
                    <a onClick={() => history.push(`/find-music/song-list?tag=${item}`)} key={item}>
                      {item}
                    </a>
                  )
                })}
              </Space>
            </Space>
          )}
          <Space>
            <span>歌曲数：{data?.trackCount || 0}</span>
            <span>播放数：{Utils.tranNumber(+data?.playCount, 0) || 0}</span>
          </Space>
          <Space className={styles.introduction}>
            <span>简介：</span>
            <span className={classNames(styles.des, "leading-[18px]")}>{data?.description}</span>
          </Space>
        </Space>
      </Space>

      <Tabs
        defaultActiveKey="1"
        // tabBarExtraContent={
        //   isSearch && (
        //     <Search placeholder="搜索歌单音乐" onChange={(e) => setSearchValue(e.target.value)} />
        //   )
        // }
        className={styles.tabs}
        tabBarStyle={{margin: 0}}
        items={items}
        onChange={(key) => toggle(+key === 1)}></Tabs>
    </Space>
  )
}

export default PlayList
