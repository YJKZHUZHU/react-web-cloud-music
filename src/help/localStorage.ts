const store = window.localStorage

class LocalStorage {
  static setStorage = (key: any, value: any) => {
    store.setItem(key, value)
  }
  static getStorage = (key: any) => store.getItem(key)
  static deleteStorage = (key: any) => store.removeItem(key)
  static clearStorage = () => store.clear()
}

export default LocalStorage
