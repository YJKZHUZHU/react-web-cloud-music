import React, {FC, useEffect, useState, Fragment, forwardRef, useRef} from 'react'
import {Subscribe} from '@/Appcontainer'
import {Divider, Row, Col, Input, Form, Popover, Button, Tag, Icon, message} from 'antd'
import styles from './index.scss'
import router from 'umi/router'
import API from '@/api'
import Map from '@/help/map'
import {appState} from '@/models/gloable'

const {CheckableTag} = Tag
const MapList = new Map()

type Props = {
  $app?: any,
  location?: any,
  form?: any,
  initTag?: any
}
type SelectedTags = string[]

const AddLabel: FC<Props> = (props, ref) => {

  const {getFieldValue, setFieldsValue} = props.form
  const [visible, setVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState<SelectedTags>([])

  const onTag = (item: string, checked: boolean) => {
    const nextSelectedTags: any = checked ? [...selectedTags, item] : selectedTags.filter((t: any) => t !== item)
    if (nextSelectedTags.length > 3) {
      return false
    }
    setSelectedTags(nextSelectedTags)
  }

  const onAddLabel = () => {
    setVisible(false)
    setFieldsValue({'tags': selectedTags})
  }

  const content = (
    <div className={styles.labelList}>
      <div className={styles.top}>
        <p className={styles.description}>选择合适的标签，最多可选<i className={styles.number}>3</i>个</p>
        {
          MapList.getEditSongList().map((t) => {
            return (
              <div className={styles.item} key={t.id}>
                <p className={styles.left}>{t.name}</p>
                <div className={styles.right}>
                  {
                    t.list.map((item: any) => {
                      return (
                        <CheckableTag
                          className={styles.tag}
                          onChange={checked => onTag(item, checked)}
                          checked={selectedTags.indexOf(item) > -1}
                          key={item}>
                          <i title={item}> {item}</i>
                        </CheckableTag>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.footer}>
        {
          selectedTags.length >= 3 ? (
            <p className={styles.tip}>
              <Icon type="info-circle"/>
              <span>最多可选三个标签</span>
            </p>
          ) : null
        }
        <Button type='primary' onClick={onAddLabel}>完成</Button>
      </div>

    </div>
  )

  useEffect(() => {
    setSelectedTags(props.initTag)
  }, [props.initTag])


  return (
    <div className={styles.addLabel} ref={ref}>
      {
        getFieldValue('tags').map((item: any) => <Tag key={item}>{item}</Tag>)
      }
      <Popover
        content={content}
        title="添加标签"
        trigger="click"
        visible={visible}
        placement='bottomLeft'
        getPopupContainer={() => document.getElementById('_edit_song_list') || document.body}
        onVisibleChange={(visible: boolean) => setVisible(visible)}
      >
        <span className={styles.label}>添加标签</span>
      </Popover>
    </div>
  )
}

// @ts-ignore
const Label = forwardRef(AddLabel)

const EditSongList: FC<Props> = props => {
  const {creator} = props.$app.state.playList
  const {getFieldDecorator} = props.form
  const creatorItem = creator.reduce((memo: any, item: any, index: any) => {
    if (+item.id === +props.location.query.id) {
      memo = item
    }
    return memo
  }, {})
  const onSubmit = (e: any) => {
    e.preventDefault()
    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const Ret: any = await API.playlistUpdate({
          ...values,
          tags: values.tags.join(';'),
          id: props.location.query.id
        })
        const PlayListRet: any = await API.userPlaylist({uid: props.$app.state.userId})

        if (Ret.code !== 200 || PlayListRet.code !== 200) {
          return message.info('稍后再试哦')
        }
        await appState.setPlayList(PlayListRet.playlist)
        message.success('歌单描述更新成功')
        router.push({
          pathname: '/playList',
          query: {
            listId: props.location.query.id
          }
        })
      }
    })
  }
  return (
    <div className={styles._edit_song_list} id='_edit_song_list'>
      <p className={styles.title}>编辑歌单信息</p>
      <Divider className={styles.divider}/>
      <div className={styles.content}>
        <div className={styles.form}>
          <Form onSubmit={onSubmit} labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <Form.Item label='歌单名'>
              {
                getFieldDecorator('name', {
                  initialValue: creatorItem.name
                })(
                  <Input
                    placeholder="歌单名"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label='标签'>
              {
                getFieldDecorator('tags', {
                  initialValue: creatorItem.tags || []
                })(
                  <Label
                    {...props}
                    initTag={creatorItem.tags || []}
                  />
                )
              }
            </Form.Item>
            <Form.Item label='简介'>
              {
                getFieldDecorator('desc', {
                  initialValue: creatorItem.description
                })(
                  <Input.TextArea
                    placeholder="歌单描述"
                    rows={4}
                    maxLength={1000}
                    style={{wordBreak: 'break-all'}}
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <div className={styles.footBtn}>
                <Button type='primary' htmlType="submit">保存</Button>
                <Button onClick={() => router.push(`/playList?listId=${creatorItem.id}`)}>取消</Button>
              </div>
            </Form.Item>
          </Form>

        </div>
        <div className={styles.img}>
          <img src={`${creatorItem.coverImgUrl}?param=250y250`} alt={creatorItem.coverImgUrl}/>
        </div>
      </div>
    </div>
  )
}

const EditSongListForm = Form.create({name: 'EditSongListForm'})(EditSongList)

// @ts-ignore
export default Subscribe(EditSongListForm)
