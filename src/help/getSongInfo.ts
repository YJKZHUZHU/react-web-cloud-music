import {appState} from '@/models/gloable'
import API from '@/api'
import Utils from '@/help/index'
import {message} from 'antd'

//获取音乐地址以及歌词
class Song {
  static getSongUrl = (id: number) =>  {
    if(id === 0){
      console.log('点击了直播')
      return false
    }
    Promise.all(
      [
        API.playSong({id}),
        API.song({ids: id}),
        API.getLyric({id})
      ]
    ).then(async (value: any) => {
      if (value[0].code === 200 && value[1].code === 200 && value[2].code === 200) {
        await appState.setSongObj({
          url: value[0].data[0].url,
          id: value[0].data[0].id,
          backgroundImg: value[1].songs[0].al.picUrl,
          name: value[1].songs[0].name,
          songTime: value[1].songs[0].dt / 1000,
          singerArr: value[1].songs[0].ar
        })
        await appState.setLyric(Utils.formatterLyric(value[2].lrc ? value[2].lrc.lyric : '' ))
        await appState.setPlayHistory(id)
        return appState.setStopPlay(true)
      }
      return message.error('获取歌曲发生异常，请稍后再试')
    })

  }
}

export default Song
