/** @format */

import React, {useState} from "react"
import {
  CloudOutlined,
  CustomerServiceOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  WifiOutlined,
  DownOutlined,
  UpOutlined,
  StarOutlined
} from "@ant-design/icons"
import {message, Popover, Input, Switch, Button, Popconfirm} from "antd"
import {NavLink, useSelector, useDispatch, history} from "umi"
import {CSSTransition} from "react-transition-group"
import API from "@/api"
import styles from "./index.scss"

const onLink = (listId: string) => {
  history.push({
    pathname: "/playList",
    query: {listId}
  })
}

const MenuList = () => {
  const [show, setShow] = useState(false)
  const [favoriteShow, setFavoriteShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState("")
  const {loginStatus, playList} = useSelector((state: any) => state.userModel)
  const {creator, favorite} = playList
  const dispatch = useDispatch()

  const stopPropagation = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onAdd = async () => {
    const Ret: any = await API.playlistCreate({
      name: value,
      privacy: checked ? 10 : 0
    })
    if (Ret.code !== 200) {
      return message.info("歌单创建失败，请稍后再试")
    }
    message.success("歌单创建成功")
    setVisible(false)
    setValue("")
    dispatch({
      type: "userModel/getPlayList"
    })
  }

  const content = (
    <div className={styles.addSongList}>
      <Input placeholder="请输入新歌单标题" onChange={(e) => setValue(e.target.value)} />
      <div className={styles.bottom}>
        <Switch size="small" defaultChecked={checked} onChange={(checked) => setChecked(checked)} />
        <p className={styles.tip}>设置为隐私菜单</p>
      </div>
      <div className={styles.btnGroup}>
        <Button type="primary" size="small" onClick={onAdd}>
          创建
        </Button>
        <Button size="small" onClick={() => setVisible(false)}>
          取消
        </Button>
      </div>
    </div>
  )

  const onConfirm = async (id: string | number) => {
    const Ret: any = await API.playlistDelete({id})
    if (Ret.code !== 200) {
      return message.info("歌单删除失败")
    }
    message.success("歌单删除成功")
    dispatch({
      type: "userModel/getPlayList"
    })
  }

  return (
    <aside>
      <div className={styles.menu}>
        <div className={styles.recommend}>
          <h2>推荐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink
                to="/recommend/findMusic/personal-recommendation"
                activeClassName={styles.activeRouter}>
                <CustomerServiceOutlined className={styles.icon} />
                <span>发现音乐</span>
              </NavLink>
            </li>
            {loginStatus ? (
              <li>
                <NavLink to="/recommend/fm" activeClassName={styles.activeRouter}>
                  <WifiOutlined className={styles.icon} />
                  <span>私人FM</span>
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink to="/recommend/video" activeClassName={styles.activeRouter}>
                <PlayCircleOutlined className={styles.icon} />
                <span>视频</span>
              </NavLink>
            </li>
            {loginStatus ? (
              <li>
                <NavLink to="/recommend/friend" activeClassName={styles.activeRouter}>
                  <TeamOutlined className={styles.icon} />
                  <span>朋友</span>
                </NavLink>
              </li>
            ) : null}
          </ul>
        </div>
        {loginStatus ? (
          <div className={styles.myMusic}>
            <h2>我的音乐</h2>
            <ul className={styles.list}>
              <li>
                <NavLink to="/myMusic/cloud" activeClassName={styles.activeRouter}>
                  <CloudOutlined className={styles.icon} />
                  <span>我的音乐云盘</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/myMusic/collect" activeClassName={styles.activeRouter}>
                  <StarOutlined className={styles.icon} />
                  <span>我的收藏</span>
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}

        {loginStatus && (
          <div className={styles.songList}>
            <div className={styles.createList} onClick={() => setShow(!show)} id="_add_song_item">
              <span>创建的歌单({creator.length})</span>
              <p className={styles.iconAdd} onClick={stopPropagation}>
                <Popover
                  placement="topRight"
                  content={content}
                  title="新建歌单"
                  trigger="click"
                  arrowPointAtCenter
                  visible={visible}
                  getPopupContainer={() =>
                    document.getElementById("_add_song_item") || document.body
                  }
                  onVisibleChange={() => setVisible(!visible)}>
                  <PlusOutlined className={styles.add} />
                </Popover>
              </p>
              <p className={styles.icon}>{show ? <DownOutlined /> : <UpOutlined />}</p>
            </div>
            <CSSTransition
              in={show}
              timeout={1000}
              classNames="_song_list_an"
              unmountOnExit
              appear={true}>
              <ul className={styles.list}>
                {creator.map((item: any, index: number) => {
                  return (
                    <li key={item.id} className={styles.creator} onClick={() => onLink(item.id)}>
                      <img src={`${item.coverImgUrl}?param=40y40`} alt={item.coverImgUrl} />
                      <div className={styles.title}>
                        <span className={styles.content}>{item.name}</span>
                        <div className={styles.operator}>
                          <span>{item.trackCount}首</span>

                          {item.privacy === 10 && (
                            <EyeInvisibleOutlined title="隐私歌单" className={styles.privacy} />
                          )}

                          {index !== 0 && (
                            <p className={styles.icon} onClick={stopPropagation}>
                              <NavLink to={`/edit-song-list?id=${item.id}`}>
                                <EditOutlined className={styles.left} />
                              </NavLink>
                              <Popconfirm
                                getPopupContainer={(): any =>
                                  document.getElementsByClassName(`_menu_item_${item.id}`)[0]
                                }
                                overlayStyle={{zIndex: 777777}}
                                trigger={"click"}
                                placement="rightBottom"
                                title="确定删除该歌单吗?"
                                onConfirm={() => onConfirm(item.id)}
                                okText="确定"
                                cancelText="取消">
                                <DeleteOutlined className={`_menu_item_${item.id}`} />
                              </Popconfirm>
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </CSSTransition>
          </div>
        )}

        {loginStatus && (
          <div className={styles.songList} onClick={() => setFavoriteShow(!favoriteShow)}>
            <div className={styles.createList}>
              <span>收藏的歌单({favorite.length})</span>
              <p className={styles.icon} onClick={stopPropagation}>
                {favoriteShow ? <DownOutlined /> : <UpOutlined />}
              </p>
            </div>
            <CSSTransition
              in={favoriteShow}
              timeout={1000}
              classNames="_favorite_list_an"
              unmountOnExit
              appear={true}>
              <ul className={styles.list}>
                {favorite.map((item: any) => {
                  return (
                    <li key={item.id} className={styles.creator} onClick={() => onLink(item.id)}>
                      <img src={`${item.coverImgUrl}?param=40y40`} alt={item.coverImgUrl} />
                      <div className={styles.title}>
                        <span className={styles.content}>{item.name}</span>
                        <div className={styles.operator}>
                          <span>{item.trackCount}首</span>
                          <p className={styles.icon}>
                            <Popconfirm
                              title="确定删除该歌单吗?"
                              onConfirm={() => onConfirm(item.id)}
                              okText="确定"
                              cancelText="取消">
                              <DeleteOutlined />
                            </Popconfirm>
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </CSSTransition>
          </div>
        )}
      </div>
    </aside>
  )
}

export default MenuList
