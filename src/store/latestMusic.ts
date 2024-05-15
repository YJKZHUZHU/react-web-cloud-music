import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"


export enum LatestMusicTypeEnum {
  all,
  china
}

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

export const useLatestMusic = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

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

