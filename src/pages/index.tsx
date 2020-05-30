import React from 'react'
import Header from '@/components/Header'
import styles from './index.scss'
import {Link,Redirect} from "umi"
import { Icon } from 'antd'

export default function() {
  return <Redirect to={'/recommend/findMusic'} />
}
