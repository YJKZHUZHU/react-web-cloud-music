
import { service } from '@/help/server'
import { SearchResponse, Album, Artist, Song, Playlist, SUGGEST_TYOE_ENUM } from '@/store/search'


enum FetchEnum {
  searchSuggest = '/search/suggest',
  hotDetail = '/search/hot/detail'
}


type ISearchSuggestRes = {
  result: {
    [key in SUGGEST_TYOE_ENUM]: Album[] & Artist[] & Song[] & Playlist[]
  },
  code: number
}

export const searchSuggest = (data: { keywords: string, type?: string }) => {
  return service<ISearchSuggestRes>(FetchEnum.searchSuggest, data)
}



export const hotDetail = () => {
  return service<SearchResponse[]>(FetchEnum.hotDetail, {}, true)
}














