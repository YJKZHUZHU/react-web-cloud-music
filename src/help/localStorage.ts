const store = window.localStorage

type StorageKey = 'volume' | 'keywords'  | 'searchHistory' | 'theme' |'playHistory'

interface HistoryInterface {
  id: number
  keywords: string
}


class LocalStorage {
  static setStorage = (key: StorageKey, value: string) => {
    store.setItem(key, value)
  }
  static getStorage = (key: StorageKey) => store.getItem(key)
  static deleteStorage = (key: StorageKey) => store.removeItem(key)
  static clearStorage = () => store.clear()
  static getValue = (key: StorageKey): HistoryInterface[] => JSON.parse(LocalStorage.getStorage(key) as string)
  static setValue = (key: StorageKey,value:any) => store.setItem(key,JSON.stringify(value))
}

export default LocalStorage
