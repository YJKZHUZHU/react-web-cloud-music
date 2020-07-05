/** @format */

import {useState, useEffect} from "react"
import {useSelector} from 'umi'
const usePlayRecord = (state: any) => {
  const {playHistory, playRecord} = state
  const {allPlayRecord} = useSelector((state: any) => state.userModel)
  const [list, setList] = useState<any>([])
  useEffect(() => {
    if (playRecord.length !== 0) {
      setList(playRecord)
    } else if (playHistory.length !== 0) {
      setList(playHistory)
    } else if (allPlayRecord.length !== 0) {
      setList(allPlayRecord)
    }
  }, [playHistory, playHistory, playRecord])
  return list
}
export default usePlayRecord
