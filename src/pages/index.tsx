import React from 'react'
import Redirect from 'umi/redirect'
import Header from '@/components/Header'
import styles from './index.scss'
import Link from 'umi/link'
import { Icon } from 'antd'

export default function() {
  return <Redirect to={'/recommend/findMusic'} />
}
