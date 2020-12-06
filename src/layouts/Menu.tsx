/** @format */

import React, {useState} from "react"
import {
  CloudOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  WifiOutlined,
  StarOutlined
} from "@ant-design/icons"
import {useBoolean, useRequest} from "ahooks"
import {message, Popover, Input, Switch, Button, Space} from "antd"
import {useSelector, useDispatch} from "umi"
import {MenuItem} from "@/components"
import API from "@/api"
import styles from "./index.scss"

const stopPropagation = (e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const MenuList = () => {
  const dispatch = useDispatch()
  const {loginStatus, playList} = useSelector((state: any) => state.userModel)
  const {creator, favorite} = playList
  const [visible, {toggle, setFalse}] = useBoolean(false)
  const [checked, {toggle: toggleChecked}] = useBoolean(false)
  const [value, setValue] = useState("")

  const {run: onAdd, loading} = useRequest(
    () => API.playlistCreate({name: value, privacy: checked ? 10 : 0}),
    {
      manual: true,
      onSuccess: (response) => {
        if (response.code !== 200) return message.info("歌单创建失败，请稍后再试")
        message.success("歌单创建成功")
        setFalse()
        setValue("")
        return dispatch({
          type: "userModel/getPlayList"
        })
      }
    }
  )

  const content = (
    <Space direction="vertical">
      <Input placeholder="请输入新歌单标题" onChange={(e) => setValue(e.target.value)} />
      <Space>
        <Switch
          size="small"
          defaultChecked={checked}
          onChange={(checked) => toggleChecked(checked)}
        />
        <span>设置为隐私菜单</span>
      </Space>
      <Space>
        <Button loading={loading} type="primary" size="small" onClick={onAdd}>
          创建
        </Button>
        <Button size="small" onClick={setFalse}>
          取消
        </Button>
      </Space>
    </Space>
  )

  const recommendMenu = [
    {
      url: "/recommend/findMusic/personal-recommendation",
      text: "发现音乐",
      login: true,
      icon: <CustomerServiceOutlined />
    },
    {
      url: "/recommend/fm",
      text: "私人FM",
      login: loginStatus,
      icon: <WifiOutlined />
    },
    {
      url: "/recommend/video",
      text: "视频",
      login: true,
      icon: <PlayCircleOutlined />
    },
    {
      url: "/recommend/friend",
      text: "朋友",
      login: loginStatus,
      icon: <TeamOutlined />
    }
  ]

  const myMenu = [
    {
      url: "/myMusic/cloud",
      text: "我的音乐云盘",
      login: true,
      icon: <CloudOutlined />
    },
    {
      url: "/myMusic/collect",
      text: "我的收藏",
      login: true,
      icon: <StarOutlined />
    }
  ]

  return (
    <aside>
      <div className={styles.menu}>
        <MenuItem.TopMenu list={recommendMenu.filter((item) => item.login)}>推荐</MenuItem.TopMenu>
        {loginStatus && (
          <>
            <MenuItem.TopMenu list={myMenu}>我的音乐</MenuItem.TopMenu>
            <MenuItem.SongListmenu list={creator} text="创建的歌单" type={0}>
              <Popover
                placement="topRight"
                content={content}
                title="新建歌单"
                trigger="click"
                arrowPointAtCenter
                visible={visible}
                getPopupContainer={() => document.getElementById("_add_song_item") || document.body}
                onVisibleChange={toggle}>
                <PlusOutlined className={styles.iconAdd} onClick={stopPropagation} />
              </Popover>
            </MenuItem.SongListmenu>
            <MenuItem.SongListmenu list={favorite} text="收藏的歌单" type={1} />
          </>
        )}
      </div>
    </aside>
  )
}

export default MenuList
