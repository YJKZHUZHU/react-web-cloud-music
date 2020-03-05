import store from './localStorage'
import {appState} from '@/models/gloable'

class Utils {
  /**
   * 数字转整数 如 100000 转为10万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   */
  static tranNumber(num: number, point: number) {
    let numStr = num.toString()
    // 十万以内直接返回
    if (numStr.length < 6) {
      return numStr
    }
    //大于8位数是亿
    else if (numStr.length > 8) {
      let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
      return parseFloat(parseInt(String(num / 100000000)) + '.' + decimal) + '亿'
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
      let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
      return parseInt(String(num / 10000)) + '万'
    }
  }

  static async setTheme(theme: string) {
    // @ts-ignore

    await appState.setGlobalLoading(true)
    store.setStorage('theme', theme)
    this.createTheme(theme)
    setTimeout(() => {
      appState.setGlobalLoading(false)
    }, 500)
  }

  static getTheme() {
    const theme: any = store.getStorage('theme')
    this.createTheme(theme)
  }

  static createTheme(theme: string) {

    let styleLink: any = document.getElementById('theme')
    let body = document.getElementsByTagName('body')[0]
    if (styleLink) {//假如存在id为theme 的link标签，直接修改其href
      styleLink.href = `/theme/${theme}.css`  // 切换 antd 组件主题
      body.className = `body-wrap-${theme}`  // 切换自定义组件的主题
    } else { // 不存在的话，则新建一个
      styleLink = document.createElement('link')
      styleLink.type = 'text/css'
      styleLink.rel = 'stylesheet'
      styleLink.id = 'theme'
      styleLink.href = `/theme/${theme}.css`  // 切换 antd 组件主题
      body.className = `body-wrap-${theme}`  // 切换自定义组件的主题
    }
    document.body.append(styleLink)

  }

  static formatSeconds(value: any) {
    let secondTime = parseInt(String(value / 1000))
    let minuteTime = 0
    let hourTime = 0
    let result = ''
    if (secondTime > 60) {
      minuteTime = parseInt(String(secondTime / 60))
      secondTime = parseInt(String(secondTime % 60))
      if (minuteTime > 60) {
        hourTime = parseInt(String(minuteTime / 60))
        minuteTime = parseInt(String(minuteTime % 60))
      }
    }

    result = '' + parseInt(String(secondTime)) + '秒'
    if (minuteTime > 0) {
      result = '' + parseInt(String(minuteTime)) + '分' + result
    }
    if (hourTime > 0) {
      result = '' + parseInt(String(hourTime)) + '小时' + result
    }
    return result
  }

  static formatPlayerTime(result: number) {
    if (!result) return ''
    let interval = Math.floor(result)
    let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
    let second = (interval % 60).toString().padStart(2, '0')
    return `${minute}:${second}`
  }

  //歌词格式化
  static formatterLyric(lyric: string) {
    let result: Array<any> = []
    lyric.split(/[\n]/g).forEach(item => {
      let temp: Array<any> = item.split(/\[(.+?)\]/)
      result.push({
        time: this.formatterLyricTime(temp[1]),
        lyc: temp[2]
      })
    })

    return result.filter(v => v['lyc'])
  }

  //动态计算歌词长度
  static lyricWidth(lyric: Array<any>) {
    //sort排序有问题，
    if (!lyric) {
      return 0
    }
    //八倍
    return Math.max.apply(Math, lyric.map(function(o) {
      return o.lyc.length
    })) * 8
  }

  //歌词时间格式化 00:00.000 -> 128 ms
  static formatterLyricTime(timeStr: string) {
    if (!timeStr) {
      return false
    }
    const sp1 = timeStr.split(':')
    const sp2 = sp1[1].split('.')

    const minute = +sp1[0] * 60
    const seconds = +sp2[0]

    const ms = parseFloat(String(+sp2[1] / 1000))
    // console.log(minute,seconds,ms)
    // console.log(parseInt(minute + seconds) + ms)
    return +(minute + seconds) + ms
  }

  //生成随机不重复ID
  static createRandomId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
  }


}


export default Utils



