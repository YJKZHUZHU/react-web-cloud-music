/** @format */

import React, {useEffect, useState, FC} from "react"
import {Button, Row, Col, message, Tag, Divider, Popover, Descriptions} from "antd"
import {RightOutlined, GlobalOutlined} from "@ant-design/icons"
import {history} from "umi"
import API from "@/api"
import {removeNewlines} from "@/help"
import {formatCatList, CatListItemInterface, CatListInterface} from "@/help"
import styles from "./index.scss"

const {Item} = Descriptions

const {CheckableTag} = Tag

interface PlaylistTagInterface {
  id: number
  name: string
  category: number
  usedCount: number
  type: number
  position: number
  createTime: number
  highQuality: number
  highQualityPos: number
  officialPos: number
}

interface HotItemInterface {
  playlistTag: PlaylistTagInterface
  activity: boolean
  usedCount: number
  hot: boolean
  position: number
  category: number
  createTime: number
  name: string
  id: number
  type: number
}

interface SongListChooseProps {
  getTag: (tag: string, hot: boolean) => void
}

const onLink = (listId: number) => {
  history.push({
    pathname: "/playList",
    query: {listId}
  })
}

const SongListChoose: FC<SongListChooseProps> = ({getTag}) => {
  const [data, setData] = useState<CatListInterface[]>([])
  const [all, setAll] = useState<CatListItemInterface>({} as CatListItemInterface)
  const [hotData, setHotData] = useState<HotItemInterface[]>([])
  const [selectTag, setSelectTag] = useState("")
  const [highQuality, setHighQuality] = useState<any>({})
  const [visible, setVisible] = useState(false)

  const getHighquality = async (cat: string) => {
    try {
      const Ret = await API.getHighQuality({limit: 1, cat})
      setHighQuality({})
      if (Ret.code !== 200 || Ret.playlists.length === 0) return
      return setHighQuality(Ret.playlists[0])
    } catch (error) {
      return error
    }
  }

  const getData = async () => {
    try {
      const Ret = await API.getCatlist()
      const HotRet = await API.getCatlistHot()
      if (Ret.code !== 200 || HotRet.code !== 200) message.info("歌单获取异常，稍后再试...")
      setAll(Ret.all)
      setData(formatCatList(Ret.sub, Ret.categories))
      setHotData(HotRet.tags)
      setSelectTag(Ret.all.name)
      getTag(Ret.all.name, Ret.all.hot)
      getHighquality(Ret.all.nam)
    } catch (error) {
      return error
    }
  }

  const onlanguageTag = (name: string, hot: boolean, checked: boolean) => {
    setVisible(false)
    if (checked) {
      setSelectTag(name)
      getHighquality(name)
      getTag(name, hot)
    }
  }
  const content = (
    <Descriptions column={1}>
      {data.map((items) => (
        <Item label={items.name} key={items.name} className={styles.catItem}>
          <ul className={styles.select}>
            {items.list.map((item, index) => (
              <li key={item.name} className={styles.item}>
                <CheckableTag
                  className={styles.chooseTag}
                  key={item.name}
                  checked={selectTag.indexOf(item.name) > -1}
                  onChange={(checked) => onlanguageTag(item.name, item.hot, checked)}>
                  {item.name}
                </CheckableTag>
                {index !== items.list.length - 1 ? <Divider type="vertical" /> : null}
              </li>
            ))}
          </ul>
        </Item>
      ))}
    </Descriptions>
  )

  useEffect(() => {
    getData()
  }, [])

  return (
    <Row className={styles.listChoose}>
      {Object.keys(highQuality).length > 0 ? (
        <Col span={24}>
          <div className={styles.highQuality} onClick={() => onLink(highQuality.id)}>
            <div className={styles.content}>
              <div className={styles.img}>
                <img src={`${highQuality?.coverImgUrl}?param=280y280`} alt={highQuality.name} />
              </div>
              <div className={styles.desc}>
                {Object.keys(highQuality).length !== 0 && (
                  <Button shape="round" className={styles.icon}>
                    <GlobalOutlined />
                    精品歌单
                  </Button>
                )}
                <p className={styles.title}>{highQuality.name}</p>
                <p className={styles.name}>{highQuality.copywriter}</p>
                <p className={styles.detail}>{removeNewlines(highQuality?.description)}</p>
              </div>
            </div>
            <div
              className={styles.background}
              style={{backgroundImage: `url(${highQuality.coverImgUrl})`}}></div>
            <div className={styles.mask}></div>
          </div>
        </Col>
      ) : null}
      {data.length !== 0 ? (
        <Col span={3}>
          <Popover
            visible={visible}
            onVisibleChange={(visible) => setVisible(visible)}
            getPopupContainer={(): any => document.getElementsByClassName(styles.listChoose)[0]}
            overlayClassName={styles.catPopover}
            content={content}
            title={
              <CheckableTag
                key={all?.name}
                checked={selectTag.indexOf(all.name) > -1}
                onChange={(checked) => onlanguageTag(all.name, all.hot, checked)}>
                {all.name}
              </CheckableTag>
            }
            placement="bottom"
            trigger="click">
            <Button shape="round" className={styles.chooseBtn}>
              {selectTag}
              <RightOutlined />
            </Button>
          </Popover>
        </Col>
      ) : null}

      <Col xxl={{span: 14, offset: 7}} xl={{span: 19, offset: 2}} className={styles.hotList}>
        <ul className={styles.select}>
          {hotData.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <CheckableTag
                key={item.id}
                checked={selectTag.indexOf(item.name) > -1}
                onChange={(checked) => onlanguageTag(item.name, item.hot, checked)}>
                {item.name}
              </CheckableTag>
              {index !== hotData.length - 1 ? <Divider type="vertical" /> : null}
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  )
}

export default SongListChoose
