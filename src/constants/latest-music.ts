/** @format */

export const enum MAP_TAG_ENUM {
  CLASSIFICATION,
  AREA,
  NEW_SONG_AREA,
  NEW_DISK_AREA,
  NEW_DISK_TYPE
}

export const enum MAP_CLASSIFICATION_TYPE_ENUM {
  newSong = "newSong",
  newDisk = "newDisk",
  ALL = "all",
  ZH = "zh",
  EA = "ea",
  JP = "jp",
  KR = "kr",
  newSongAll = 0,
  newSongZH = 7,
  newSongEA = 96,
  newSongJP = 8,
  newSongKR = 16,
  newDiskALL = "ALL",
  newDiskZH = "ZH",
  newDiskEA = "EA",
  newDiskKR = "KR",
  newDiskJP = "JP",
  newDiskTypeNew = "new",
  newDiskTypeHot = "hot"
}
export const MAP_NEW_SONG_AREA = new Map<
  MAP_CLASSIFICATION_TYPE_ENUM,
  MAP_CLASSIFICATION_TYPE_ENUM
>()
  .set(MAP_CLASSIFICATION_TYPE_ENUM.ALL, MAP_CLASSIFICATION_TYPE_ENUM.newSongAll)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.ZH, MAP_CLASSIFICATION_TYPE_ENUM.newSongZH)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.EA, MAP_CLASSIFICATION_TYPE_ENUM.newSongEA)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.JP, MAP_CLASSIFICATION_TYPE_ENUM.newSongJP)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.KR, MAP_CLASSIFICATION_TYPE_ENUM.newSongKR)

  export const MAP_NEW_DISK_AREA = new Map<
  MAP_CLASSIFICATION_TYPE_ENUM,
  MAP_CLASSIFICATION_TYPE_ENUM
>()
  .set(MAP_CLASSIFICATION_TYPE_ENUM.ALL, MAP_CLASSIFICATION_TYPE_ENUM.newDiskALL)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.ZH, MAP_CLASSIFICATION_TYPE_ENUM.newDiskZH)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.EA, MAP_CLASSIFICATION_TYPE_ENUM.newDiskEA)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.JP, MAP_CLASSIFICATION_TYPE_ENUM.newDiskJP)
  .set(MAP_CLASSIFICATION_TYPE_ENUM.KR, MAP_CLASSIFICATION_TYPE_ENUM.newDiskKR)

export interface ITagItem {
  key: MAP_CLASSIFICATION_TYPE_ENUM
  name: string
}
export const MAP_TAG = new Map<MAP_TAG_ENUM, ITagItem[]>()
  .set(MAP_TAG_ENUM.CLASSIFICATION, [
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSong,
      name: "新歌速递"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDisk,
      name: "新碟上架"
    }
  ])
  .set(MAP_TAG_ENUM.NEW_SONG_AREA, [
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSongAll,
      name: "全部"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSongZH,
      name: "华语"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSongEA,
      name: "欧美"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSongKR,
      name: "韩国"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newSongJP,
      name: "日本"
    }
  ])
  .set(MAP_TAG_ENUM.NEW_DISK_AREA, [
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskALL,
      name: "全部"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskZH,
      name: "华语"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskEA,
      name: "欧美"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskKR,
      name: "韩国"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskJP,
      name: "日本"
    }
  ])
  .set(MAP_TAG_ENUM.AREA, [
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.ALL,
      name: "全部"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.ZH,
      name: "华语"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.EA,
      name: "欧美"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.KR,
      name: "韩国"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.JP,
      name: "日本"
    }
  ])
  .set(MAP_TAG_ENUM.NEW_DISK_TYPE, [
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeNew,
      name: "全部"
    },
    {
      key: MAP_CLASSIFICATION_TYPE_ENUM.newDiskTypeHot,
      name: "热门"
    }
  ])
