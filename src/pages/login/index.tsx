/** @format */

import React, {useState, useEffect} from "react"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Input, message, Form, Space, Row, Col, Modal} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {useDispatch, useHistory, Redirect} from "umi"
import {useBoolean} from "ahooks"
import Cookie from "js-cookie"
import Draggable from "react-draggable"
import {QrLogin} from "@/components"
import {useDraggable} from "@/hooks"
import API from "@/api"
import styles from "./index.scss"

const LAYOUT = {
  labelCol: {
    span: 4
  }
}
const INIT_FORM = {
  phone: "",
  captcha: "",
  email: "",
  password: ""
}

const Login = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const {onStart, onMouseOver, draggableed, bounds, draggleRef, onMouseOut} = useDraggable()
  const [loading, {toggle}] = useBoolean(false)
  const [loginPattern, setLoginPattern] = useState(0)
  const [disabled, {setTrue, setFalse}] = useBoolean(false)
  const [loginVisible, {toggle: loginToggle}] = useBoolean(!!!Cookie.get("MUSIC_U"))
  const [time, setTime] = useState(60)
  const [qrLogin, {toggle: qrToggle}] = useBoolean(true)

  const dispatch = useDispatch()

  const loginSuccessCallback = () => {
    history.action === "POP" ? history.push("/personal-recommendation") : history.goBack()
  }

  const onFinish = async (values: any) => {
    try {
      toggle(true)
      if (loginPattern === 1) {
        // 手机号登录
        const Ret: any = await API.check({phone: values.phone})
        if (+Ret.exist === -1) return message.error("先注册网易云账号再来体验哦")
        const LoginRet: any = await API.loginByPhone({
          phone: values.phone,
          password: values.password,
          loading: true
        })
        if (LoginRet.code !== 200) return message.info("密码错误")
      }
      // 验证码登录
      // if (loginPattern === 2) {
      //   const Ret = await API.checkCaptcha({phone: values.phone, captcha: values.captcha})
      //   console.log(Ret)
      //   if (Ret.code === 503) return message.info(Ret.message || "验证码错误")
      // }
      if (loginPattern === 3) {
        // 邮箱登录
        const Ret: any = await API.loginByEmail({
          email: values.email,
          password: values.password,
          loading: true
        })
        if (Ret.code !== 200) return message.info("密码错误")
      }

      const UserRet: any = await dispatch({
        type: "userModel/getUserInfo"
      })
      loginSuccessCallback()
      toggle(false)

      if (!UserRet[0]) message.error(UserRet[1])
      if (UserRet[0]) {
        return message.success("登录成功")
        // return callback(false)
      }
    } catch (error) {
      loginSuccessCallback()
      toggle(false)
      throw error
    }
  }

  const onCaptcha = async () => {
    try {
      const ValidateInfo = await form.validateFields(["phone"])
      setTrue()
      const Ret = await API.sentCaptcha({phone: ValidateInfo.phone})
      if (Ret.code !== 200) return message.error(Ret.message || "稍后再试")
      let timeStop = setInterval(() => {
        setTime((val) => {
          if (val <= 0) {
            clearInterval(timeStop) //清除定时器
            setTime(60)
            setFalse()
          }
          return val - 1
        })
      }, 1000)
    } catch (error) {
      throw Error(error)
    }
  }

  const onCancel = () => {
    loginSuccessCallback()
    loginToggle(false)
  }

  useEffect(() => {
    form.resetFields()
  }, [loginPattern])

  if (Cookie.get("MUSIC_U")) {
    // 已登录
    return <Redirect to="/personal-recommendation" />
  }

  return (
    <Modal
      destroyOnClose
      visible={loginVisible}
      zIndex={99999}
      width={qrLogin ? 500 : 400}
      title={
        <div className={styles.draggable} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          登录
        </div>
      }
      maskClosable={false}
      onCancel={onCancel}
      modalRender={(modal) => {
        return (
          <Draggable disabled={draggableed} bounds={bounds} onStart={onStart}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )
      }}
      footer={null}>
      <div className={styles._login}>
        {qrLogin ? (
          <QrLogin callback={loginToggle} />
        ) : (
          <>
            {loginPattern === 0 ? (
              <Space direction="vertical" className={styles.pattern}>
                <div className={styles.img}>
                  <img src={require("../../assets/platform.png")} />
                </div>
                <Button type="primary" block onClick={() => setLoginPattern(1)}>
                  手机号登录
                </Button>
                <Button block onClick={() => setLoginPattern(3)}>
                  邮箱登录
                </Button>
              </Space>
            ) : (
              <Form
                onFinish={onFinish}
                {...LAYOUT}
                initialValues={INIT_FORM}
                className={styles.form}
                form={form}>
                {(loginPattern === 1 || loginPattern === 2) && (
                  <Form.Item
                    name="phone"
                    // label={null}
                    required={false}
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
                )}
                {loginPattern === 2 && (
                  <Form.Item label="验证码">
                    <Row gutter={8}>
                      <Col span={14}>
                        <Form.Item
                          name="captcha"
                          noStyle
                          rules={[{required: true, message: "请输入验证码"}]}>
                          <Input placeholder="请输入验证码" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Button block onClick={onCaptcha} disabled={disabled}>
                          {disabled ? `${time}秒` : "获取验证码"}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                )}
                {loginPattern === 3 && (
                  <Form.Item
                    name="email"
                    // label="邮箱"
                    required={false}
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
                    />
                  </Form.Item>
                )}
                {(loginPattern === 1 || loginPattern === 3) && (
                  <Form.Item
                    name="password"
                    // label="密码"
                    required={false}
                    rules={[{required: true, message: "密码不能为空"}]}>
                    <Input
                      prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </Form.Item>
                )}
                <Button type="primary" htmlType="submit" block loading={loading}>
                  {loading ? "登录中..." : "登录"}
                </Button>
                <span className={styles.other}>
                  <Space>
                    <span onClick={() => setLoginPattern(0)}>其他登录方式</span>
                    <RightOutlined />
                  </Space>
                </span>
              </Form>
            )}
          </>
        )}
        {qrLogin && (
          <Button shape="round" className={styles.loginTypeBtn} onClick={() => qrToggle(false)}>
            选择其他登录方式
          </Button>
        )}
        {!qrLogin && loginPattern === 0 && (
          <div onClick={() => qrToggle(true)} className={styles.switchQrCode}></div>
        )}
      </div>
    </Modal>
  )
}

export default Login
