/** @format */

import React, {FC, useEffect, useContext} from "react"
import {message, Space, Button} from "antd"
import {useRequest} from "ahooks"
import {useDispatch} from "@umijs/max"
import QrCode from "qrcode.react"
import {GlobalContext} from "@/layouts"
import API from "@/api"
import styles from "./index.scss"

interface IQrLoginProps {
  callback: (visible: boolean) => void
}
const QrLogin: FC<IQrLoginProps> = ({callback}) => {
  const dispatch = useDispatch()
  const {reloadMenu} = useContext(GlobalContext)
  const {data: key} = useRequest(API.getQrKey, {
    formatResult: (response) => {
      if (response.code !== 200) {
        message.error("二维码生成失败，请稍后再试")
        return null
      }
      return response.data?.unikey
    }
  })
  const {data: qrUrl = ""} = useRequest(() => API.CreateQr({key}), {
    ready: !!key,
    formatResult: (response) => {
      if (response.code !== 200) {
        message.error("二维码生成失败，请稍后再试")
        return ""
      }
      return response.data.qrurl
    }
  })
  const {data, cancel, run} = useRequest(() => API.CheckQr({key}), {
    ready: !!qrUrl,
    pollingInterval: 2000,
    pollingWhenHidden: false,
    onSuccess: async (response) => {
      if (response?.code !== 803) return
      callback(false)
      try {
        await dispatch({
          type: "userModel/getUserInfo"
        })
        reloadMenu && (await reloadMenu())
        return message.success("登录成功")
      } catch (error) {
        callback(false)
        throw Error(error)
      }
    }
  })
  useEffect(() => {
    if (data?.code === 803) {
      cancel()
    }
  }, [data?.code])

  return (
    <>
      {data?.code === 802 ? (
        <Space direction="vertical" className={styles.loginSuccess}>
          <div className={styles.successIcon}></div>
          <span>扫描成功</span>
          <span>请在手机上确认登录</span>
        </Space>
      ) : (
        <Space size={20} className={styles.qrLogin}>
          <div className={styles.phone} />
          <Space direction="vertical" className={styles.code} size={18}>
            <span>扫码登录</span>
            <div className={styles.container}>
              {data?.code === 800 && (
                <div className={styles.failure}>
                  <span>二维码已失效</span>
                  <Button onClick={run} className={styles.reload} size="small" type="primary">
                    点击刷新
                  </Button>
                </div>
              )}

              <QrCode
                value={qrUrl} // 生成二维码的内容
                size={130} // 二维码的大小
                fgColor="#00A799" // 二维码的颜色
              />
            </div>
            <span>使用网易云音乐APP扫码登录</span>
          </Space>
        </Space>
      )}
    </>
  )
}

export default QrLogin
