/** @format */

import {create} from "zustand"
import {createJSONStorage, devtools, persist} from "zustand/middleware"
import {playlistDetail} from "@/api/playlistDetail"
import {likelist, like} from "@/api/user"
import {IPlaylistDetails} from "@/types/playlistDetails"
import {message} from "antd"

interface Props {
  data: {
    [key: number]: IPlaylistDetails
  } | null
  likelist: number[]
  loading: boolean
  likeLoading: boolean
}

interface Actions {
  // getDetail: (id: number) => Promise<IPlaylistDetails | undefined>
  getDetail: (id: number) => void
  getExistDetail: (id: number) => IPlaylistDetails | false
  updateDetail: (key: number, data: IPlaylistDetails) => void
  getLikelist: () => void
  setLike: (data: {id: number | string; like: boolean}, id?: number | string) => void
}

const initialState: Props = {
  data: null,
  likelist: [],
  loading: false,
  likeLoading: false
}
export const usePlaylistDetail = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setLike: async (data, id) => {
          try {
            set({likeLoading: true}, false, "loading...")
            await like(data)
            await get().getLikelist()
            id && (await get().getDetail(Number(id)))
            set({likeLoading: false}, false, "loading...")
            message.success(data.like ? "已添加到我喜欢的音乐" : "取消喜欢成功")
          } catch (error) {
            set({likeLoading: false}, false, "loading...")
            console.log("error", error)
          }
        },
        getLikelist: async () => {
          try {
            const res = await likelist()
            set({likelist: res.data?.ids}, false, "获取喜欢的列表")
          } catch (error) {
            console.log("error", error)
          }
        },
        getExistDetail: (id) => {
          if (get().data) {
            const result = get().data![id]
            return result || false
          }
          return false
        },
        getDetail: async (id) => {
          try {
            // const detail = get().getExistDetail(id)
            // if (detail) return detail

            set({loading: true}, false, "loading")
            const result = get().data
            const res = await playlistDetail({id})
            set({loading: false, data: {...result, [id]: res.data}}, false, "更新歌单详情")
            const keys = get().data ? Object.keys(get().data!) : []
            if (keys.length > 10) {
              const lastKey = keys.at(-1)
              const copy = JSON.parse(JSON.stringify(get().data))
              delete copy?.[Number(lastKey)]
              set({data: copy}, false, "超过十个删除最后一个")
            }
            // return res.data
          } catch (error) {
            set({loading: true}, false, "loading")
            console.log("error", error)
          }
        },
        updateDetail(key, data) {
          const result = get().data
          if (!result) {
            set({data: {[key]: data}})
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

export const usePlayListDetailData = (id: number) =>
  usePlaylistDetail((state) => state.data && state.data[id])

export const useGetDetail = () => usePlaylistDetail((state) => state.getDetail)

export const useLoading = () => usePlaylistDetail((state) => state.loading)

export const useGetLikelist = () => usePlaylistDetail((state) => state.getLikelist)

export const useLikelist = () => usePlaylistDetail((state) => state.likelist)

export const useSetLike = () => usePlaylistDetail((state) => state.setLike)

export const useLikeLoading = () => usePlaylistDetail((state) => state.likeLoading)
