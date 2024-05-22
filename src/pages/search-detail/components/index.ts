/** @format */

export interface ComponentProps<T> {
  data: T[]
  height: number
  keywords: string
  onScroll?: React.UIEventHandler<HTMLElement>
}

export {default as Album} from "./Album"
export {default as Playlist} from "./Playlist"
export {default as Singer} from "./Singer"
export {default as Single} from "./Single"
export {default as User} from "./User"
export {default as Video} from "./Video"
