export const EDIT_SONG_LIST = [
  {
    name: '语种',
    list: ['华语', '欧美', '日语', '汉语', '粤语', '小语种'],
    id: 0
  },
  {
    name: '风格',
    list: ['流行', '摇滚', '民谣', '电子', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类/异类', 'New Age', '古风', 'Bossa Nova', '后摇', '舞曲', '音乐剧'],
    id: 1
  },
  {
    name: '场景',
    list: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧'],
    id: 2
  },
  {
    name: '情感',
    list: ['怀旧', '清新', '浪漫', '性感', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念'],
    id: 3
  },
  {
    name: '主题',
    list: ['校园', '影视原声', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', 'ACG', '00后', '钢琴', '器乐', '儿童', '榜单'],
    id: 4
  }
]

export const MAP_TAB: Record<string, string> = {
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

export const enum LANGUAGE_ENUM {
  all = -1,
  china = 7,
  europeAndAmerica = 96,
  japan = 8,
  korea = 16,
  other = 0
}

// 语种
export const LANGUAGE = [
  {
    id: LANGUAGE_ENUM.all,
    value: "全部"
  },
  {
    id: LANGUAGE_ENUM.china,
    value: "华语"
  },
  {
    id: LANGUAGE_ENUM.europeAndAmerica,
    value: "欧美"
  },
  {
    id: LANGUAGE_ENUM.japan,
    value: "日本"
  },
  {
    id: LANGUAGE_ENUM.korea,
    value: "韩国"
  },
  {
    id: LANGUAGE_ENUM.other,
    value: "其他"
  }
]

export const enum CLASSIFICATION_ENUM {
  all=-1,
  man=1,
  woman,
  band
}
// 分类
export const CLASSIFICATION = [
  {
    id: CLASSIFICATION_ENUM.all,
    value: "全部"
  },
  {
    id: CLASSIFICATION_ENUM.man,
    value: "男歌手"
  },
  {
    id: CLASSIFICATION_ENUM.woman,
    value: "女歌手"
  },
  {
    id: CLASSIFICATION_ENUM.band,
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

export const enum MAP_SINGER_TAG_ENUM {
  LANGUAGE,
  CLASSIFICATION,
  SELECT
}

export const MAP_SINGER_TAG = [
  { key: MAP_SINGER_TAG_ENUM.LANGUAGE, name: '语种', list: LANGUAGE },
  { key: MAP_SINGER_TAG_ENUM.CLASSIFICATION, name: '分类', list: CLASSIFICATION },
  { key: MAP_SINGER_TAG_ENUM.SELECT, name: '筛选', list: SELECT }
]

// 最新音乐
export const NEW_SONGS_TAB_MAP = [
  {
    name: "全部",
    key: "0"
  },
  {
    name: "华语",
    key: "7"
  },
  {
    name: "欧美",
    key: "96"
  },
  {
    name: "韩国",
    key: "16"
  },
  {
    name: "日本",
    key: "8"
  }
]

export const NEW_DISK_TAB_MAP = [
  {
    name: "全部",
    key: "ALL"
  },
  {
    name: "华语",
    key: "ZH"
  },
  {
    name: "欧美",
    key: "EA"
  },
  {
    name: "韩国",
    key: "KR"
  },
  {
    name: "日本",
    key: "JP"
  }
]

// MV
export const MV_AREA = [
  {
    id: '全部',
    value: '全部'
  },
  {
    id: '内地',
    value: '内地'
  },
  {
    id: '港台',
    value: '港台'
  },
  {
    id: '欧美',
    value: '欧美'
  },
  {
    id: '韩国',
    value: '韩国'
  },
  {
    id: '日本',
    value: '日本'
  }
]

export const MV_TYPE = [
  {
    id: '全部',
    value: '全部'
  },
  {
    id: '官方版',
    value: '官方版'
  },
  {
    id: '原生',
    value: '原生'
  },
  {
    id: '现场版',
    value: '现场版'
  },
  {
    id: '网易出品',
    value: '网易出品'
  }
]

export const MV_SORT = [
  {
    id: '上升最快',
    value: '上升最快'
  },
  {
    id: '最新',
    value: '最新'
  },
  {
    id: '最热',
    value: '最热'
  }
]



































