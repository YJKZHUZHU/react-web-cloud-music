/** @format */

import {create} from "zustand"
import {persist, createJSONStorage, devtools, subscribeWithSelector} from "zustand/middleware"

interface Actions {}

interface Props {
  historyList: Location[]
}

export const useHistoryStore = create<Props & Actions>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        historyList: []
      })),
      {
        name: "historyStore",
        storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "historyStore"
    }
  )
)

// 获取非反应性最新状态
export const historyList = useHistoryStore.getState().historyList

export const unsub2 = useHistoryStore.subscribe((state) => state.historyList, console.log, {
  fireImmediately: true
})

// unsub2()

// 监听所有更改，对每个更改同步触发
export const unsub = useHistoryStore.subscribe((p, ...rest) => {
  console.log("pppp", p, rest)
})
