import store from './localStorage'
import { appState, PlayerRateEnum, AllPlayRecordInterface } from '@/models/gloable'
import moment from 'moment'

export interface ArInterface {
  alias?: any[]
  id?: number | string
  name?: string
  tns?: any[]
  [propsName: string]: any
}
export interface PlayRecordItem {
  name?: string
  ar?: ArInterface[]
  time?: number
  id?: number
  [propName: string]: any
}
export interface LiricInterface {
  lyc?: string
  time?: number
}


class Utils {
  /**
   * 数字转整数 如 100000 转为10万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   */
  static tranNumber(num: number, point: number) {
    const numStr = num.toString()
    const length = numStr.length
    const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    // 十万以内直接返回
    if (length < 6) {
      return numStr
    }

    //大于8位数是亿
    else if (numStr.length > 8) {
      return (num / 100000000).toFixed(0) + '.' + decimal + '亿'
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
      return (num / 10000).toFixed(0) + '万'
    }
  }

  static setTheme(theme: string) {
    // await appState.setGlobalLoading(true)
    store.setStorage('theme', theme)
    this.createTheme(theme)
    // setTimeout(() => {
    //   appState.setGlobalLoading(false)
    // }, 500)
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
    let secondTime = +(value / 1000).toFixed(0)
    let minuteTime = 0
    let hourTime = 0
    let result = ''
    if (secondTime > 60) {
      minuteTime = +(secondTime / 60).toFixed(0)
      secondTime = secondTime % 60
      if (minuteTime > 60) {
        hourTime = +(minuteTime / 60).toFixed(0)
        minuteTime = minuteTime % 60
      }
    }

    result = '' + secondTime + '秒'
    if (minuteTime > 0) {
      result = '' + minuteTime + '分' + result
    }
    if (hourTime > 0) {
      result = '' + hourTime + '小时' + result
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
    let result: LiricInterface[] = []
    lyric.split(/[\n]/g).forEach(item => {
      //去除空的内容
      let temp: string[] = decodeURIComponent(item).split(/\[(.+?)\]/).filter(item => item !== '')
      const lyContent = temp.pop()
      //去除最后一个空数组
      if (temp.length !== 0) {
        temp.forEach((k) => {
          result.push({
            time: this.formatterLyricTime(k) as number,
            lyc: lyContent
          })
        })
      }
    })

    return result.sort((a, b) => (a.time as number) - (b.time as number))
  }

  //动态计算歌词长度
  static lyricWidth(lyric: LiricInterface[]) {
    //sort排序有问题，
    if (!lyric) {
      return 0
    }
    //八倍
    return Math.max.apply(Math, lyric.map(function (o) {
      return (o.lyc as string).length
    })) * 8
  }

  //歌词时间格式化 00:00.000 -> 128 ms
  static formatterLyricTime(timeStr: string): number {
    if (!timeStr) {
      return 0
    }
    const sp1 = timeStr.split(':')
    const sp2 = sp1[1].split('.')

    const minute = +sp1[0] * 60
    const seconds = +sp2[0]
    const ms = parseFloat(String(+sp2[1] / 1000))
    return +(minute + seconds) + ms
  }

  //生成随机不重复ID
  static createRandomId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
  }

  //关键词高亮
  static highLight(content: string) {
    const keywords = String(store.getStorage('keywords'))
    const Reg = new RegExp(keywords, 'gi')
    return content.replace(Reg, `<span style="color: #5D73C5; ">${keywords}</span>`)
  }

  //评论时间格式化
  static commentFormatTime(time: any) {
    return moment(time).calendar(moment(), {
      sameDay: '[今天] HH:MM:ss',
      nextDay: '[明天]',
      nextWeek: 'dddd',
      lastDay: '[昨天] HH:MM:ss',
      lastWeek: '[上个] dddd HH:MM:ss',
      sameElse: 'YYYY-MM-DD HH:MM'
    })
  }

  //歌手序列化['华晨宇'，'张杰] -> 华晨宇/张杰

  static formatName(name: ArInterface[], link = '/', target = 'name') {
    return name.map(item => {
      return item[target]
    }).join(link)
  }
  //播放列表

  static formatPlayRecord(data: PlayRecordItem[]) {
    return data.map((item) => {
      return {
        title: item.name,
        singer: Utils.formatName(item.ar as object[]),
        time: Utils.formatSeconds(item.dt),
        id: item.id
      }
    })
  }

  static formatAllRecord(record: AllPlayRecordInterface[]) {
    return record.map(({ song, playCount, score }) => {
      return {
        playCount,
        score,
        ...song
      }
    })
  }

  // 数组对象去重
  static removeRepeat(source: any[], target: string) {
    let hash: any = {}
    return source.reduce(function (memo, item) {
      hash[item[target]] ? '' : hash[item[target]] = true && memo.push(item);
      return memo
    }, [])
  }
  //评论数格式化
  static formatCommentNumber(commentNumber: number): string | number {
    if (commentNumber < 999) return commentNumber
    if (commentNumber > 100000) return '10w+'
    return '999+'
  }
  static findIndex(source: any[], target: number | string, playMode: number) {
    let result = -1
    const index = source.findIndex(item => item.id === target)
    const arr = [...new Array(source.length).keys()].filter(item => item !== index)
    if (playMode === 0) {// 顺序播放
      result = index
    } else if (playMode === 2) {// 随机播放,只有一首时播放当前歌曲
      result = source.length === 1 ? 0 : arr[parseInt(String(Math.random() * arr.length - 1), 10)]
    }
    return result
  }
}







export default Utils



