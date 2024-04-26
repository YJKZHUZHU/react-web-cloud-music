import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { playlistDetail } from '@/api/playlistDetail'
import { IPlaylistDetails } from "@/types/playlistDetails"

interface Props {
  data: {
    [key: number]: IPlaylistDetails
  } | null,
  loading: boolean
}

interface Actions {
  getDetail: (id: number) => Promise<IPlaylistDetails | undefined>
  getExistDetail: (id: number) => IPlaylistDetails | false
  updateDetail: (key: number, data: IPlaylistDetails) => void
}

const initialState: Props = {
  data: null,
  loading: false
}
export const usePlaylistDetail = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        getExistDetail: (id) => {
          if (get().data) {
            const result = get().data![id]
            return result || false
          }
          return false


        },
        getDetail: async (id) => {
          try {
            const detail = get().getExistDetail(id)
            if (detail) return detail

            set({ loading: true }, false, 'loading')
            const result = get().data
            const res = await playlistDetail({ id })
            set({ loading: false, data: { ...result, [id]: res.data } }, false, '更新歌单详情')
            return res.data
          } catch (error) {
            set({ loading: true }, false, 'loading')
            console.log('error', error)
          }
        },
        updateDetail(key, data) {
          const result = get().data
          if (!result) {
            set({ data: { [key]: data } })
          } else {
            set({
              data: {
                ...result,
                [key]: data
              }
            })
          }

        }

      }),
      {
        name: "playlistDetailStore",
        storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "playlistDetailStore"
    }
  )
)

export const useUpdateDetail = () => usePlaylistDetail((state) => state.updateDetail)

export const usePlayListDetailData = (id: number) => usePlaylistDetail((state) => state.data && state.data[id])

export const useGetDetail = () => usePlaylistDetail((state) => state.getDetail)

export const useLoading = () => usePlaylistDetail((state) => state.loading)
