import { useSetKeywords } from '@/store/player'
import { history } from '@umijs/max'
import { message } from 'antd'

const useToSearchDetail = () => {
  const setKeywords = useSetKeywords()
  const toDetail = (type: number, keywords: string) => {
    if (keywords === "") return message.info("请输入要查询的关键字")
    setKeywords(keywords)

    // appState.setKeywords(keywords)
    //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    history.push({
      pathname: `/search-detail/single?keywords=${keywords}&type=${type}`,

    })
  }

  return toDetail
}

export default useToSearchDetail