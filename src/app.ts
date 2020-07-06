import 'nprogress/nprogress.css'
import Utils from '@/help/index'
import moment from 'moment'
import API from '@/api'
import { appState } from '@/models/gloable'
import store from '@/help/localStorage'
import { message } from 'antd'
import { getUserInfo } from '@/help/getUserInfo'

moment.locale(window.navigator.language)

message.config({
  maxCount: 1
})

