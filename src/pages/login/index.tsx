/** @format */

import React, { useState, useEffect } from "react"
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input, message, Form, Row, Col, Tabs, Spin } from "antd"
import md5 from 'md5'
import { history } from "@umijs/max"
import { useBoolean } from "ahooks"
import { QrLogin } from "@/components"
import API from "@/api"
import classNames from "classnames"
import styles from "./index.scss"
import { setLoginCache } from "@/help/cache"
import { anonimous } from "@/api/user"

const LAYOUT = {
  labelCol: {
    span: 4
  }
}
interface IFormData {
  phone: string,
  captcha: string,
  email: string,
  password: string
}
const INIT_FORM = {
  phone: "",
  captcha: "",
  email: "",
  password: "",
}

enum LoginTypeEnum {
  PASSWORD = 'password', // 密码登录
  CODE = 'code' // 验证码登录
}

enum PasswordTypeEnum {
  EMAIL = 'email', // 邮箱
  PHONE = 'phone' // 手机
}



const Login = () => {
  const [form] = Form.useForm<IFormData>()
  const [loading, { toggle }] = useBoolean(false)
  const [loginType, setLoginType] = useState(LoginTypeEnum.PASSWORD)
  const [passwordType, setPasswordType] = useState(PasswordTypeEnum.EMAIL)
  const [disabled, { setTrue, setFalse }] = useBoolean(false)
  const [time, setTime] = useState(60)
  const [qrLogin, { toggle: qrToggle }] = useBoolean(false)
  const [visitorLoading, setVisitorLoading] = useBoolean(false)


  const onFinish = async (values: IFormData) => {
    try {
      console.log('values', values)
      toggle(true)
      if (loginType === LoginTypeEnum.CODE) {
        const Ret = await API.checkCaptcha({ phone: values.phone, captcha: values.captcha })
        if (Ret.code === 503) return message.info(Ret.message || "验证码错误")
        const LoginRet: any = await API.loginByPhone({
          phone: values.phone,
          captcha: values.captcha,
          loading: true
        })
        toggle(false)
        if (LoginRet.code !== 200) return message.info("密码错误")
        setLoginCache(false, true, LoginRet.profile.userId, LoginRet.cookie)
      }
      // 邮箱登录
      if (passwordType === PasswordTypeEnum.EMAIL) {
        const res: any = await API.loginByEmail({
          email: values.email,
          md5_password: md5(values.password),
          loading: true
        })
        toggle(false)
        if (res.code !== 200) return message.info("账号或密码错误")
        setLoginCache(false, true, res.profile.userId, res.cookie)
      }

      // 手机号登录
      if (passwordType === PasswordTypeEnum.PHONE) {
        const Ret: any = await API.check({ phone: values.phone })
        if (+Ret.exist === -1) return message.error("先注册网易云账号再来体验哦")
        const LoginRet: any = await API.loginByPhone({
          phone: values.phone,
          md5_password: md5(encodeURIComponent(values.password)),
          loading: true
        })
        toggle(false)
        if (LoginRet.code !== 200) return message.info("密码错误")
        LoginRet.
          setLoginCache(false, true, LoginRet.profile.userId, LoginRet.cookie)
      }

      // dispatch({
      //   type: "userModel/getUserInfo"
      // })
      // loginSuccessCallback()
      // toggle(false)
      // reloadMenu && reloadMenu()
      message.success("登录成功")
      return history.push('/')
    } catch (error) {
      toggle(false)
      throw error
    }
  }

  const onCaptcha = async () => {
    try {
      const ValidateInfo = await form.validateFields(["phone"])
      setTrue()
      const Ret = await API.sentCaptcha({ phone: ValidateInfo.phone })
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
      throw error
    }
  }



  const renderFormItem = () => {
    if (loginType === LoginTypeEnum.CODE) {
      return <>
        <Form.Item
          name="phone"
          required={false}
          rules={[
            { required: true, message: "手机号不能为空" },
            { message: "手机号格式错误", pattern: /^1[3456789]\d{9}$/ }
          ]}>
          <Input
            autoComplete="off"
            prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入手机号"
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={14}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: "请输入验证码" }]}>
                <Input prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="请输入验证码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Button block onClick={onCaptcha} disabled={disabled}>
                {disabled ? `${time}秒` : "获取验证码"}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </>
    }
    if (loginType === LoginTypeEnum.PASSWORD) {
      return <>
        {
          passwordType === PasswordTypeEnum.EMAIL ? <Form.Item
            name="email"
            required={false}
            rules={[
              { required: true, message: "邮箱账号不能为空" },
              {
                message: "邮箱账号格式错误",
                pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
              }
            ]}>
            <Input
              autoComplete="off"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入网易云邮箱账号"
            />
          </Form.Item> : <Form.Item
            name="phone"
            required={false}

            rules={[
              { required: true, message: "手机号不能为空" },
              { message: "手机号格式错误", pattern: /^1[3456789]\d{9}$/ }
            ]}>
            <Input
              autoComplete="off"
              prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入手机号"
            />
          </Form.Item>
        }
        <Form.Item
          name="password"
          required={false}
          rules={[{ required: true, message: "密码不能为空" }]}>
          <Input.Password
            autoComplete="off"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入密码"
          />
        </Form.Item>
      </>
    }
  }

  const onVisitor = async () => {
    try {
      setVisitorLoading.setTrue()
      const res = await anonimous()
      setVisitorLoading.setFalse()
      if (res.success) {
        setLoginCache(true, false, res.data.userId, res.data.cookie)
        history.push('/')
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const onQrCallback = () => {
    console.log('登录失败')
  }

  useEffect(() => {
    form.resetFields()
  }, [loginType])



  return (
    <div className="bg-[#ffffff] h-[100vh]">
      <div className=" absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden z-1">
        <video className="w-[100%] h-[100%] object-cover" autoPlay playsInline loop crossOrigin="anonymous" src="/login/rain.mp4" />
      </div>
      <div className="flex w-[100%] h-[100%]">
        <div className={classNames(styles.formLayout)}>
          <div className={classNames(styles.form)}>
            {
              qrLogin ? <QrLogin callback={onQrCallback} /> : <div className={classNames('w-[320px]', 'flex', 'flex-col')}>
                <div className="flex flex-col items-center gap-[12px] mb-[40px]">
                  <span className="text-[33px] font-[600]">尛芽音乐</span>
                  <span className="text-[14px]">不早不晚，刚好是你</span>
                </div>
                <Tabs
                  items={[
                    { key: LoginTypeEnum.PASSWORD, label: '密码登录' },
                    { key: LoginTypeEnum.CODE, label: '验证码登录' }
                  ]}
                  centered
                  activeKey={loginType}
                  onChange={(activeKey) => setLoginType(activeKey as LoginTypeEnum)}>

                </Tabs>
                <Form
                  {...LAYOUT}
                  onFinish={onFinish}
                  initialValues={INIT_FORM}
                  form={form}>
                  {renderFormItem()}
                  <div className="flex justify-end items-center mb-[16px]">
                    {
                      loginType === LoginTypeEnum.PASSWORD && <span className="flex-1 cursor-pointer" onClick={() => setPasswordType(passwordType === PasswordTypeEnum.EMAIL ? PasswordTypeEnum.PHONE : PasswordTypeEnum.EMAIL)}>{passwordType === PasswordTypeEnum.EMAIL ? '手机号登录' : '邮箱登录'}</span>
                    }

                    <span className="cursor-pointer">忘记密码</span>
                  </div>


                  <Button type="primary" htmlType="submit" block disabled={visitorLoading} loading={loading}>
                    {loading ? "登录中..." : "登录"}
                  </Button>

                </Form>
              </div>
            }
            <div onClick={() => qrToggle()} className={classNames(styles.bgImage, qrLogin ? styles.desktop : styles.qrCode)}></div>
            <div onClick={onVisitor} className={classNames(styles.visitor)}>{visitorLoading && <Spin size="small" />}游客登录</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login



