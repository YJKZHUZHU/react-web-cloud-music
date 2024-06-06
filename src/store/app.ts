/** @format */

import {create} from "zustand"
import {MenuKeyEnum} from "@/constants/layout"
import {persist, createJSONStorage, devtools, subscribeWithSelector} from "zustand/middleware"

interface Actions {
  setActiveMenu: (menuKey: MenuKeyEnum) => void
}

interface Props {
  activeMenu: MenuKeyEnum | null
}

export const useAppStore = create<Props & Actions>()(
  devtools(
    (set, get) => ({
      activeMenu: null,
      setActiveMenu: (menuKey) => {
        set({activeMenu: menuKey}, false, "setActiveMenu")
      }
    }),
    {
      name: "historyStore"
    }
  )
)

export const useActiveMenu = () => useAppStore((state) => state.activeMenu)

export const useSetActiveMenu = () => useAppStore((state) => state.setActiveMenu)
