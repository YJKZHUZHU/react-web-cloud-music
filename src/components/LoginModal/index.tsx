import React, {FC, useState} from 'react'
import {Modal, Button, Divider, Icon, Form, Input, message} from 'antd'
import API from '@/api'
import {Subscribe} from '@/Appcontainer'
import router from 'umi/router'
import styles from './index.scss'

type Props = {
  form: any,
  $app: any
}

interface TypeInterface {
  type: number,
  title: string
}

const initTYpe: TypeInterface = {
  type: 1,
  title: '手机号登录'
}

message.config({
  maxCount: 1
})
// @ts-ignore
const LoginModal: FC<Props> = props => {
  const {getFieldDecorator, validateFields} = props.form
  const {loginStatus} = props.$app.state

  const [type, setType] = useState(initTYpe)

  if (loginStatus) {
    router.replace('/')
    return message.success('已经登录过了哦')
  }

  const onLoginType = (e: any) => {
    setType({
      type: +e.target.value,
      title: e.target.title
    })
  }
  const phoneLogin = (e: any) => {
    e.preventDefault()
    validateFields(async (err: any, values: {phone: string, password: string, email: string}) => {
      if (!err) {
        //手机登录
        if (type.type === 1) {
          const checkRet: any = await API.check({phone: values.phone})
          if (+checkRet.exist === -1) {
            return message.error('先注册网易云账号再来体验哦')
          }
          API.loginByPhone({
            phone: values.phone,
            password: values.password,
            loading: true
          }).then((res: any) => {
            if (res.code !== 200) {
              return message.info('密码错误')
            }
            message.success('登录成功')
            router.replace({
              pathname: '/'
            })
            window.location.reload()
          })
        }
        //邮箱登录
        if (type.type === 2) {
          API.loginByEmail({
            email: values.email,
            password: values.password,
            loading: true
          }).then((res: any) => {
            if (res.code !== 200) {
              return message.info('密码错误')
            }
            message.success('登录成功')
            router.replace({
              pathname: '/'
            })
            window.location.reload()
          })
        }

      }
    })
  }

  return (
    <div>
      <Modal
        visible={true}
        title={'账号登录'}
        centered={true}
        footer={null}
      >
        <div className={styles._login}>
          <div className={styles.phone}>
            <div className={styles.img}>
              <img src={require('../../assets/platform.png')}/>
            </div>
            <div className={styles.btn}>
              <Button type="primary" value={1} title={'手机号登录'} block onClick={onLoginType}>
                手机号登录
              </Button>
              <Button type="primary" value={2} title={'邮箱登录'} block onClick={onLoginType}>
                邮箱登录
              </Button>
            </div>
          </div>
          <Divider type='vertical' className={styles.divider} dashed/>
          <div className={styles.type}>
            <h2 className={styles.title}>{type.title}</h2>
            <Form onSubmit={phoneLogin} className={styles.phoneForm}>
              {
                type.type === 1 ? (
                  <Form.Item>
                    {getFieldDecorator('phone', {
                      rules: [
                        {required: true, message: '手机号不能为空'},
                        {message: '手机号格式错误', pattern: /^1[3456789]\d{9}$/}
                      ]
                    })(
                      <Input
                        autoComplete={'off'}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="请输入手机号"
                      />
                    )}
                  </Form.Item>
                ) : (
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {required: true, message: '邮箱账号不能为空'},
                        {
                          message: '邮箱账号格式错误',
                          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
                        }
                      ]
                    })(
                      <Input
                        autoComplete={'off'}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="请输入网易云邮箱账号"
                        // addonAfter={'@163.com'}
                      />
                    )}
                  </Form.Item>
                )
              }
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '密码不能为空'}]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>


              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}


// @ts-ignore
export default Form.create({name: 'login_form'})(Subscribe(LoginModal))
