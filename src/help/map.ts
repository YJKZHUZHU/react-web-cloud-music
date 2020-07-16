interface EditInterface {
  language: string[],
  style: string[],
  scenes: string[],
  emotion: string[],
  theme: string[]
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

// 语种
export const LANGUAGE = [
  {
    id: -1,
    value: "全部"
  },
  {
    id: 7,
    value: "华语"
  },
  {
    id: 96,
    value: "欧美"
  },
  {
    id: 8,
    value: "日本"
  },
  {
    id: 16,
    value: "韩国"
  },
  {
    id: 0,
    value: "其他"
  }
]
// 分类
export const CLASSIFICATION = [
  {
    id: -1,
    value: "全部"
  },
  {
    id: 1,
    value: "男歌手"
  },
  {
    id: 2,
    value: "女歌手"
  },
  {
    id: 3,
    value: "乐队"
  }
]
// 筛选
export const SELECT = [
  {
    id: -1,
    value: "热门"
  },
  {
    id: 'a',
    value: "A"
  },
  {
    id: 'b',
    value: "B"
  },
  {
    id: 'c',
    value: "C"
  },
  {
    id: 'd',
    value: "D"
  },
  {
    id: 'e',
    value: "E"
  },
  {
    id: 'f',
    value: "F"
  },
  {
    id: 'g',
    value: "G"
  },
  {
    id: 'h',
    value: "H"
  },
  {
    id: 'i',
    value: "I"
  },
  {
    id: 'j',
    value: "J"
  },
  {
    id: 'k',
    value: "K"
  },
  {
    id: 'l',
    value: "L"
  },
  {
    id: 'm',
    value: "M"
  },
  {
    id: 'n',
    value: "N"
  },
  {
    id: 'o',
    value: "O"
  },
  {
    id: 'p',
    value: "P"
  },
  {
    id: 'q',
    value: "Q"
  },
  {
    id: 'r',
    value: "R"
  },
  {
    id: 's',
    value: "S"
  },
  {
    id: 't',
    value: "T"
  },
  {
    id: 'u',
    value: "U"
  },
  {
    id: 'v',
    value: "V"
  },
  {
    id: 'w',
    value: "W"
  },
  {
    id: 'x',
    value: "X"
  },
  {
    id: 'y',
    value: "Y"
  },
  {
    id: 'z',
    value: "Z"
  },
  {
    id: '0',
    value: "#"
  }
]

export default Map


































