/** @format */

export {default as Album} from "./Album"
export {default as Singer} from "./Singer"
export {default as Video} from "./Video"

export interface Props {
  virtualListHeight: number
  loading: boolean
  setLoading: (loading: boolean) => void
  getCount?: (count: number) => void
}
