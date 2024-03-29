import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"

interface Props {
  email: string
  emaliPassword: string
  emailLoginRember: boolean
  phone: string
  phonePaswordMd5: string
  phoneLoginRember: boolean
  nickName: string
}

interface Actions {
  update: (obj: Partial<Props>) => void
}

const initialState = {
  email: "",
  emaliPassword: "",
  emailLoginRember: false,
  phone: "",
  phonePaswordMd5: "",
  phoneLoginRember: false,
  nickName: "",
}

export const useLoginStore = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        update: (obj) => set({ ...get(), ...obj }, false, "更新登录信息"),
      }),
      {
        name: "loginStore",
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "loginStore",
    }
  )
)

export const useNickName = () => useLoginStore((state) => state.nickName)
