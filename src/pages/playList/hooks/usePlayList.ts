import { useRef } from "react"
import { message } from "antd"
import { useSelector, useDispatch } from "@umijs/max"
import { useRequest, useBoolean } from "ahooks"
import { IPlayListItem } from '@umijs/max'
import Utils from "@/help"
import API from "@/api"
import { IState } from "typings"


const usePlayList = (id: string) => {
  const dispatch = useDispatch()
  const { playRecord } = useSelector((state: IState) => state.songInfoModel)
  const [isSearch, { toggle }] = useBoolean(true)
  const playAllRef = useRef(true)
  const idsRef = useRef("")

  const { data } = useRequest(() => API.playList({ id }), {
    refreshDeps: [id],
    formatResult: (response) => {
      if (response.code !== 200) {
        message.info("歌单获取异常，请稍后再试")
        return {}
      }
      idsRef.current = response.playlist?.trackIds
        ?.reduce((memo: any, item: any) => memo.concat(item.id), [])
        .toString()
      return response.playlist
    },
    onError: (err) => {
      throw err
    }
  })

  const { data: tableList, loading } = useRequest(() => API.song({ ids: idsRef.current }), {
    refreshDeps: [idsRef.current],
    ready: data?.trackIds.length,
    formatResult: (response) => response.songs || [],
    onError: (err) => {
      throw err
    }
  })

  const onPlayAll = () => {
    if (playAllRef.current) {
      dispatch({ type: "songInfoModel/getSongInfo", payload: { id: tableList[0].id } })
      dispatch({
        type: "songInfoModel/setPlayRecordTip",
        payload: {
          playRecordTip: "歌单已更新"
        }
      })

      dispatch({
        type: "songInfoModel/setPlayRecord",
        payload: {
          playRecord: Utils.removeRepeat(tableList?.concat(playRecord), "id")
        }
      })

      setTimeout(() => {
        dispatch({
          type: "songInfoModel/setPlayRecordTip",
          payload: {
            playRecordTip: ""
          }
        })
      }, 1000)
    }

    playAllRef.current = false
  }

  const label = data?.creator?.expertTags || data?.tags || []

  return {
    isSearch,
    toggle,
    data: data as IPlayListItem,
    tableList,
    loading,
    onPlayAll,
    label,
    commentTabContent: data?.commentCount ? `评论(${Utils.formatCommentNumber(data?.commentCount)})` : "评论"
  }
}

export default usePlayList