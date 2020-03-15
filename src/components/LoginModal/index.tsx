import React, {FC, useState} from 'react'
import {Modal, Button, Divider, Icon, Form, Input,message} from 'antd'
import API from '@/api'
import {Subscribe} from '@/Appcontainer'
import {appState} from '@/models/gloable'

import styles from './index.scss'

type Props = {
  form: any,
  $app:any
}

interface TypeInterface {
  type: number,
  title: string
}

const initTYpe: TypeInterface = {
  type: 0,
  title: '登录'
}

const Login: FC<Props> = props => {
  const {getFieldDecorator, validateFields} = props.form

  const [type, setType] = useState(initTYpe)

  const onLoginType = (e: any) => {
    setType({
      type: +e.target.value,
      title: e.target.title
    })
  }
  const LoginFooter = () => {
    return (
      <div className={styles.switchType} onClick={() => setType({type: 0, title: '登录'})}>
        <Icon type="left"/>
        <span>其他登录方式</span>
      </div>
    )
  }
  const phoneLogin = (e: any) => {
    e.preventDefault()
    validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
        API.loginByPhone(values).then((res:any) => {
          console.log(res)
          if(res.code === 200) {
            return message.success('登录成功')
          }
        })
      }
    })
  }

  return (
    <div>
      <Modal
        visible={true}
        title={type.title}
        centered={true}
        // width={400}
        footer={type.type !== 0 && <LoginFooter/>}
      >
        {
          type.type === 0 ? (
            <div className={styles._login}>
              <div className={styles.phone}>
                <div className={styles.img}>
                  <img src={require('../../assets/platform.png')}/>
                </div>
                <div className={styles.btn}>
                  <Button type="primary" value={1} title={'手机号登录'} block onClick={onLoginType}>
                    手机号登录
                  </Button>
                  <Button type="primary" value={1} title={'手机号登录'} block onClick={onLoginType}>
                    邮箱登录
                  </Button>
                  {/*<Button block value={4} title={'注册'} onClick={onLoginType}>*/}
                  {/*  注册*/}
                  {/*</Button>*/}
                </div>
              </div>
              <Divider type='vertical' className={styles.divider} dashed/>
              <div className={styles.type}>
                <Form onSubmit={phoneLogin} className={styles.phoneForm}>
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
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: '密码不能为空'}]
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                  </Form.Item>

                </Form>
                {/*<p className={styles.code} onClick={() => setType({type: 2, title: '验证码登录'})}>*/}
                {/*  <i className={styles.codeBg}/>*/}
                {/*  <span className={styles.name}>验证码登录</span>*/}
                {/*</p>*/}
                {/*<p className={styles.email} onClick={() => setType({type: 3, title: '邮箱登录'})}>*/}
                {/*  <i className={styles.emailBg}/>*/}
                {/*  <span className={styles.name}>邮箱登录</span>*/}
                {/*</p>*/}

              </div>
            </div>
          ) : null
        }

        {
          type.type === 1 ?
            (
              <Form onSubmit={phoneLogin} className={styles.phoneForm}>
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
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: '密码不能为空'}]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </Form.Item>

              </Form>
            ) : null
        }
        {
          type.type === 2 ?
            (
              <div>验证码登录，这不显示，，，</div>
            ) : null
        }
        {
          type.type === 3 ?
            (
              <div>邮箱登录，这不显示，，，</div>
            ) : null
        }


      </Modal>
    </div>
  )
}


// @ts-ignore
export default Form.create({name: 'login_form'})(Subscribe(Login))
