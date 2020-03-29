interface EditInterface {
  language: Array<any>,
  style: Array<any>,
  scenes: Array<any>,
  emotion: Array<any>,
  theme: Array<any>
}

class Map {
  EDIT_SONG_LIST_MAP: EditInterface

  constructor() {
    this.EDIT_SONG_LIST_MAP = {
      language: ['华语', '欧美', '日语', '汉语', '粤语', '小语种'],
      style: ['流行', '摇滚', '民谣', '电子', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类/异类', 'New Age', '古风', 'Bossa Nova', '后摇', '舞曲', '音乐剧'],
      scenes: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧'],
      emotion: ['怀旧', '清新', '浪漫', '性感', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念'],
      theme: ['校园', '影视原声', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', 'ACG', '00后', '钢琴', '器乐', '儿童', '榜单']
    }
  }

  static MAP_TAB: any = {
    '1': '单曲',
    '100': '歌手',
    '10': '专辑',
    '1000': '歌单',
    '1002': '用户',
    '1004': 'mv',
    '1006': '歌词',
    '1009': '电台',
    '1014': '视频',
    '1018': '综合'
  }

  getEditSongList() {
    return [
      {
        name: '语种',
        list: this.EDIT_SONG_LIST_MAP.language,
        id: 0
      },
      {
        name: '风格',
        list: this.EDIT_SONG_LIST_MAP.style,
        id: 1
      },
      {
        name: '场景',
        list: this.EDIT_SONG_LIST_MAP.scenes,
        id: 2
      },
      {
        name: '情感',
        list: this.EDIT_SONG_LIST_MAP.emotion,
        id: 3
      },
      {
        name: '主题',
        list: this.EDIT_SONG_LIST_MAP.theme,
        id: 4
      }
    ]
  }

}

export default Map


































