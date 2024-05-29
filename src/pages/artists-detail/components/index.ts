/** @format */

export {default as SingerDetail} from "./SingerDetail"
export {default as SimilarSinger} from "./SimilarSinger"
export {default as Mv} from "./Mv"
export {default as Album} from "./Album"

export interface Props {
  id: string | number
  name?: string
  virtualListHeight?: number
}
