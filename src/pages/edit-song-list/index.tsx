/** @format */

import React, {FC, useEffect, useState, forwardRef} from "react"
import {Subscribe} from "@/Appcontainer"
import {InfoCircleOutlined} from "@ant-design/icons"
import {Divider, Input, Popover, Button, Tag, message, Form} from "antd"
import styles from "./index.scss"
import {history} from "umi"
import API from "@/api"
import Map from "@/help/map"
import {appState} from "@/models/gloable"
import {Store} from "@umijs/hooks/lib/useFormTable"

const {CheckableTag} = Tag
const MapList = new Map()

type Props = {
  $app?: any
  location?: any
  form?: any
  initTag?: any
}
type SelectedTags = string[]

const AddLabel: FC<Props> = (props, ref) => {
  const {setFieldsValue, getFieldValue} = props.form

  const [visible, setVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState<SelectedTags>(getFieldValue('tags'))

  const onTag = (item: string, checked: boolean) => {
    const nextSelectedTags: any = checked
      ? [...selectedTags, item]
      : selectedTags.filter((t: any) => t !== item)
    if (nextSelectedTags.length > 3) {
      return false
    }
    setSelectedTags(nextSelectedTags)
    setFieldsValue({tags: nextSelectedTags})
  }

  const onAddLabel = () => {
    setVisible(false)
    // setFieldsValue({tags: selectedTags})
  }

  const content = (
    <div className={styles.labelList}>
      <div className={styles.top}>
        <p className={styles.description}>
          选择合适的标签，最多可选<i className={styles.number}>3</i>个
        </p>
        {MapList.getEditSongList().map((t) => {
          return (
            <div className={styles.item} key={t.id}>
              <p className={styles.left}>{t.name}</p>
              <div className={styles.right}>
                {t.list.map((item: any) => {
                  return (
                    <CheckableTag
                      className={styles.tag}
                      onChange={(checked) => onTag(item, checked)}
                      checked={selectedTags.indexOf(item) > -1}
                      key={item}>
                      <i title={item}> {item}</i>
                    </CheckableTag>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.footer}>
        {selectedTags.length >= 3 ? (
          <p className={styles.tip}>
            <InfoCircleOutlined />
            <span>最多可选三个标签</span>
          </p>
        ) : null}
        <Button type="primary" onClick={onAddLabel}>
          完成
        </Button>
      </div>
    </div>
  )

  useEffect(() => {
    setSelectedTags(getFieldValue("tags"))
    // setFieldsValue({tags: props.initTag})
  }, [getFieldValue('tags')])

  return (
    <div className={styles.addLabel} ref={ref}>
      {selectedTags.map((item: any) => (
        <Tag key={item}>{item}</Tag>
      ))}
      <Popover
        content={content}
        title="添加标签"
        trigger="click"
        visible={visible}
        placement="bottomLeft"
        getPopupContainer={() => document.getElementById("_edit_song_list") || document.body}
        onVisibleChange={(visible: boolean) => setVisible(visible)}>
        <span className={styles.label}>添加标签</span>
      </Popover>
    </div>
  )
}

// @ts-ignore
const Label = forwardRef(AddLabel)

const mapToForm = (data: any[], id: number) => {
  console.log(data,id)
  return data.filter(item => +item.id === +id)[0]
}

const EditSongList: FC<Props> = (props) => {
  const {creator} = props.$app.state.playList
  // const {getFieldDecorator} = props.form
  const [form] = Form.useForm()
  const {setFieldsValue,getFieldsValue} = form
  const creatorItem = mapToForm(props.$app.state.playList.creator, history.location.query.id)

  setFieldsValue({
    name: creatorItem?.name || '',
    desc:creatorItem?.description || '',
    tags: creatorItem?.tags || []
  })

  // console.log(creatorItem)
  const onSubmit = async (values: Store) => {
    const Ret: any = await API.playlistUpdate({
      ...values,
      tags: values.tags.join(";"),
      id: history.location.query.id
    })
    const PlayListRet: any = await API.userPlaylist({uid: props.$app.state.userId})
    if (Ret.code !== 200 || PlayListRet.code !== 200) {
      return message.info("稍后再试哦")
    }
    await appState.setPlayList(PlayListRet.playlist)
    message.success("歌单描述更新成功")
    history.push({
      pathname: "/playList",
      query: {
        listId: history.location.query.id
      }
    })
  }
  return (
    <div className={styles._edit_song_list} id="_edit_song_list">
      <p className={styles.title}>编辑歌单信息</p>
      <Divider className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.form}>
          <Form
            onFinishFailed={(err) => {
              console.log(err)
            }}
            onFinish={onSubmit}
            form={form}
            labelCol={{span: 2}}
            wrapperCol={{span: 20}}>
            <Form.Item label="歌单名" name="name">
              <Input placeholder="歌单名" allowClear />
              {/* {getFieldDecorator("name", {
                initialValue: creatorItem.name
              })()} */}
            </Form.Item>
            <Form.Item label="标签" name='tags'>
              {/* <Label {...props} form={form} initTag={creatorItem.tags || []} /> */}
              <Label {...props} form={form} />
            </Form.Item>
            <Form.Item label="简介" name="desc">
              <Input.TextArea
                placeholder="歌单描述"
                rows={4}
                maxLength={1000}
                style={{wordBreak: "break-all"}}
              />
            </Form.Item>
            <Form.Item>
              <div className={styles.footBtn}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <Button onClick={() => history.push(`/playList?listId=${creatorItem.id}`)}>
                  取消
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.img}>
          <img src={`${creatorItem.coverImgUrl}?param=250y250`} alt={creatorItem.coverImgUrl} />
        </div>
      </div>
    </div>
  )
}

// const EditSongListForm = Form.create({name: 'EditSongListForm'})(EditSongList)

// @ts-ignore
export default Subscribe(EditSongList)
