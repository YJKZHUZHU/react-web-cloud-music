import { message } from 'antd'
import dayjs from 'dayjs'
import store from '@/help/localStorage'
import Utils from '@/help/index'
import { inject } from '@vercel/analytics';

inject();

message.config({
  duration: 1,
  maxCount: 1
})

dayjs.locale(window.navigator.language)


// toFixed兼容方法
Number.prototype.toFixed = function (len: number) {
  if (len > 20 || len < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }
  // .123转为0.123
  let number = Number(this)
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString()
  }
  if (typeof (len) === 'undefined' || len === 0) {
    return (Math.round(number)).toString()
  }
  let result = number.toString()
  const numberArr = result.split('.')

  if (numberArr.length < 2) {
    //整数的情况
    return padNum(result)
  }
  let intNum = numberArr[0] //整数部分
  let deciNum = numberArr[1]//小数部分
  let lastNum = deciNum.substr(len, 1)//最后一个数字

  if (deciNum.length === len) {
    //需要截取的长度等于当前长度
    return result
  }
  if (deciNum.length < len) {
    //需要截取的长度大于当前长度 1.3.toFixed(2)
    return padNum(result)
  }
  //需要截取的长度小于当前长度，需要判断最后一位数字
  result = intNum + '.' + deciNum.substr(0, len)
  if (parseInt(lastNum, 10) >= 5) {
    //最后一位数字大于5，要进位
    const times = Math.pow(10, len) //需要放大的倍数
    let changedInt = Number(result.replace('.', ''))//截取后转为整数
    changedInt++//整数进位
    changedInt /= times//整数转为小数，注：有可能还是整数
    result = padNum(changedInt + '')
  }
  return result

  //对数字末尾加0
  function padNum(num: any) {
    let dotPos = num.indexOf('.')
    if (dotPos === -1) {
      //整数的情况
      num += '.'
      for (let i = 0; i < len; i++) {
        num += '0'
      }
      return num
    } else {
      //小数的情况
      let need = len - (num.length - dotPos - 1)
      for (let j = 0; j < need; j++) {
        num += '0'
      }
      return num
    }
  }
}

if (!store.getStorage('theme')) store.setStorage('theme', 'red')

//设置默认音量
if (!store.getStorage('volume')) store.setValue('volume', 0.5)
//搜索关键词
if (!store.getStorage('keywords')) store.setValue('keywords', '')

//搜索历史
if (!store.getStorage('searchHistory')) store.setValue('searchHistory', [])

//播放历史
if (!store.getStorage('playHistory')) store.setValue('playHistory', [])

Utils.getTheme()
