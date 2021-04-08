/** @format */

import React, {useEffect, useState, FC} from "react"
import {Button, Row, Col, message, Tag, Divider, Popover, Descriptions} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {useLocation} from "umi"
import BoutiqueSongListDesc from "./BoutiqueSongListDesc"
import API from "@/api"
import {formatCatList, CatListItemInterface, CatListInterface} from "@/help"
import styles from "../index.scss"

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

interface ITagData {
  data: CatListInterface[]
  all: CatListItemInterface
  hotData: HotItemInterface[]
}

const INNIT_TAG_DATA: ITagData = {
  data: [],
  all: {} as CatListItemInterface,
  hotData: []
}

const SongListChoose: FC<SongListChooseProps> = ({getTag}) => {
  const location: any = useLocation()
  const {tag = "全部歌单"} = location.query
  const [{data, all, hotData}, setTagData] = useState<ITagData>(INNIT_TAG_DATA)
  const [selectTag, setSelectTag] = useState(tag)
  const [visible, setVisible] = useState(false)

  const getData = async () => {
    try {
      const Ret = await API.getCatlist()
      const HotRet = await API.getCatlistHot()
      if (Ret.code !== 200 || HotRet.code !== 200) return message.info("标签获取异常，稍后再试...")
      setTagData({
        data: formatCatList(Ret.sub, Ret.categories),
        all: Ret.all,
        hotData: HotRet.tags
      })
      return getTag(Ret.all.name, Ret.all.hot)
    } catch (error) {
      throw Error(error)
    }
  }

  const onlanguageTag = (name: string, hot: boolean, checked: boolean) => {
    setVisible(false)
    if (checked) {
      setSelectTag(name)
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
      <Col span={24}>
        <BoutiqueSongListDesc cat={selectTag} />
      </Col>
      {!!data.length && (
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
      )}

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
