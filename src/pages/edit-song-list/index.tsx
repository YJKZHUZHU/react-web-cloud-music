/** @format */

import React, { FC, useEffect, useState, useContext } from "react"
import { InfoCircleOutlined } from "@ant-design/icons"
import { Input, Popover, Button, Tag, message, Form, Row, Col, Space } from "antd"
import styles from "./index.scss"
import { useSelector, history } from "@umijs/max"
import { FormInstance } from "antd/lib/form"
import API from "@/api"
import { GlobalContext } from "@/layouts"
import { EDIT_SONG_LIST } from "@/help/map"
import { IState } from "typings"
import { useBoolean } from "ahooks"
import { useQuery } from '@/hooks'

const { CheckableTag } = Tag

interface ILabel {
  form: FormInstance
}

const mapToForm = (data: any[], id: number) => data?.filter((item) => +item.id === +id)[0]

const Label: FC<ILabel> = ({ form }) => {
  const { setFieldsValue, getFieldValue } = form

  const [visible, { setFalse, toggle }] = useBoolean(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(getFieldValue("tags"))

  const onTag = (item: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, item]
      : selectedTags.filter((t) => t !== item)
    if (nextSelectedTags.length > 3) {
      return false
    }
    setSelectedTags(nextSelectedTags)
    setFieldsValue({ tags: nextSelectedTags })
  }

  const content = (
    <div className={styles.labelList}>
      <div className={styles.top}>
        <Space size={4} className={styles.description}>
          <i>选择合适的标签，最多可选</i>
          <i className={styles.number}>3</i>
          <i>个</i>
        </Space>
        {EDIT_SONG_LIST.map((t) => {
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
                      <i title={item}>{item}</i>
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
          <Space className={styles.tip}>
            <InfoCircleOutlined />
            <span>最多可选三个标签</span>
          </Space>
        ) : null}
        <Button type="primary" onClick={setFalse}>
          完成
        </Button>
      </div>
    </div>
  )

  useEffect(() => {
    setSelectedTags(getFieldValue("tags"))
  }, [getFieldValue("tags")])

  return (
    <div className={styles.addLabel}>
      {selectedTags.map((item: any) => (
        <Tag key={item}>{item}</Tag>
      ))}
      <Popover
        content={content}
        title="添加标签"
        trigger="click"
        open={visible}
        placement="bottomLeft"
        getPopupContainer={() => document.getElementById("_edit_song_list") || document.body}
        onOpenChange={toggle}>
        <span className={styles.label} id="_edit_song_list">
          添加标签
        </span>
      </Popover>
    </div>
  )
}

const EditSongList: FC = () => {
  const { playList } = useSelector((state: IState) => state.userModel)
  const { reloadMenu } = useContext(GlobalContext)
  const query = useQuery()
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  const { id } = query
  const creatorItem = mapToForm(playList?.creator, Number(id))

  setFieldsValue({
    name: creatorItem?.name || "",
    desc: creatorItem?.description || "",
    tags: creatorItem?.tags || []
  })

  const onSubmit = async (values: any) => {
    try {
      const Ret: any = await API.playlistUpdate({
        ...values,
        tags: values.tags.join(";"),
        id
      })
      if (Ret.code !== 200) {
        return message.info("稍后再试哦")
      }
      reloadMenu && (await reloadMenu())
      message.success("歌单编辑成功")
      return history.push(`/playList/${id}?listId=${id}`)
    } catch (error) {
      throw error
    }
  }
  return (
    <Row gutter={32} className={styles.editSongList}>
      <Col span={18}>
        <Form onFinish={onSubmit} form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            required={false}
            label="歌单名"
            name="name"
            rules={[{ required: true, message: "歌单名不能为空" }]}>
            <Input placeholder="歌单名" allowClear />
          </Form.Item>
          <Form.Item label="标签" name="tags">
            <Label form={form} />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea
              showCount
              allowClear
              placeholder="歌单描述"
              rows={4}
              maxLength={996}
              style={{ wordBreak: "break-all" }}
            />
          </Form.Item>
          <Form.Item>
            <Space className={styles.submitFooter}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => history.push(`/playList/${creatorItem?.id}?listId=${creatorItem?.id}`)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={6}>
        <div className={styles.img}>
          <img src={`${creatorItem?.coverImgUrl}?param=250y250`} alt={creatorItem?.coverImgUrl} />
        </div>
      </Col>
    </Row>
  )
}

export default EditSongList
