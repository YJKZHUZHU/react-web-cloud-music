/** @format */

import React, {useState, FC} from "react"
import {Modal, Space, Input, Checkbox, Button, message} from "antd"
import {useBoolean, useRequest} from "ahooks"
import Draggable from "react-draggable"
import {useDispatch} from "@umijs/max"
import {useDraggable} from "@/hooks"
import API from "@/api"
import styles from "../index.scss"

interface IAddSongList {
  reload?: () => void
}

const AddSongList: FC<IAddSongList> = ({reload}) => {
  const dispatch = useDispatch()
  const {onStart, onMouseOver, draggableed, bounds, draggleRef, onMouseOut} = useDraggable()
  const [visible, {setFalse, setTrue}] = useBoolean(false)
  const [value, setValue] = useState("")
  const [checked, {toggle}] = useBoolean(false)

  const {run, loading} = useRequest(
    () => API.playlistCreate({name: value, privacy: checked ? 10 : 0}),
    {
      manual: true,
      onSuccess: (response) => {
        if (response.code !== 200) return message.info("歌单创建失败，请稍后再试")
        message.success("歌单创建成功")
        setFalse()
        setValue("")
        toggle(false)
        reload && reload()
      }
    }
  )

  return (
    <div className={styles.addSongList}>
      <a onClick={setTrue}>新建歌单</a>
      <Modal
        width={300}
        footer={null}
        visible={visible}
        onCancel={setFalse}
        maskClosable={false}
        title={
          <div className={styles.title} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            创建歌单
          </div>
        }
        onOk={setTrue}
        className={styles.addSongListForm}
        modalRender={(modal) => {
          return (
            <Draggable disabled={draggableed} bounds={bounds} onStart={onStart}>
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )
        }}>
        <Space className={styles.content} direction="vertical">
          <Input
            placeholder="请输入新歌单标题"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Checkbox checked={checked} onChange={(e) => toggle(e.target.checked)}>
            设置为隐私歌单
          </Checkbox>
          <Button type="primary" loading={loading} disabled={!!!value} onClick={run}>
            创建
          </Button>
        </Space>
      </Modal>
    </div>
  )
}

export default AddSongList
