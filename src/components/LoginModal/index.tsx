/** @format */

import React, {FC, useState} from "react"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Divider, Input, message, Form} from "antd"
import API from "@/api"
import {getUserInfo} from "@/help/getUserInfo"
import styles from "./index.scss"
import {Store} from "@umijs/hooks/lib/useFormTable"

interface ILoginModal {
  callback: (loginVisible: boolean) => void
}

interface TypeInterface {
  type: number
  title: string
}

const initTYpe: TypeInterface = {
  type: 1,
  title: "手机号登录"
}
const LoginModal: FC<ILoginModal> = ({callback}) => {
  const [form] = Form.useForm()
  const [type, setType] = useState(initTYpe)

  const phoneLogin = (values: Store) => {
    if (type.type === 1) {
      API.check({phone: values.phone}).then((res: any) => {
        if (+res.exist === -1) {
          return message.error("先注册网易云账号再来体验哦")
        }
        API.loginByPhone({
          phone: values.phone,
          password: values.password,
          loading: true
        }).then((res) => {
          if (res.code !== 200) {
            return message.info("密码错误")
          }
        })
      })
    }
    if (type.type === 2) {
      API.loginByEmail({
        email: values.email,
        password: values.password,
        loading: true
      }).then((res: any) => {
        if (res.code !== 200) {
          return message.info("密码错误")
        }
      })
    }
    getUserInfo().then((result) => {
      if (result[0]) {
        callback(false)
        return message.success("登录成功")
      }
      message.info(result[1])
    })
  }

  return (
    <div className={styles._login}>
      <div className={styles.phone}>
        <div className={styles.img}>
          <img src={require("../../assets/platform.png")} />
        </div>
        <div className={styles.btn}>
          <Button
            type={type.type === 1 ? "primary" : "default"}
            block
            onClick={() => setType({type: 1, title: "手机号登录"})}>
            手机号登录
          </Button>
          <Button
            type={type.type === 2 ? "primary" : "default"}
            value={2}
            title={"邮箱登录"}
            block
            onClick={() => setType({type: 2, title: "邮箱登录"})}>
            邮箱登录
          </Button>
        </div>
      </div>
      <Divider type="vertical" className={styles.divider} dashed />
      <div className={styles.type}>
        <h2 className={styles.title}>{type.title}</h2>
        <Form onFinish={phoneLogin} className={styles.phoneForm} form={form}>
          {type.type === 1 ? (
            <Form.Item
              name="phone"
              rules={[
                {required: true, message: "手机号不能为空"},
                {message: "手机号格式错误", pattern: /^1[3456789]\d{9}$/}
              ]}>
              <Input
                autoComplete={"off"}
                prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="请输入手机号"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="email"
              rules={[
                {required: true, message: "邮箱账号不能为空"},
                {
                  message: "邮箱账号格式错误",
                  pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
                }
              ]}>
              <Input
                autoComplete={"off"}
                prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="请输入网易云邮箱账号"
                // addonAfter={'@163.com'}
              />
            </Form.Item>
          )}
          <Form.Item name="password" rules={[{required: true, message: "密码不能为空"}]}>
            <Input
              prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginModal
