export interface IShareResource {
  id:string | number
  type: 'song'| 'playlist'| 'mv'| 'djradio'|'djprogram'
  msg:string
}