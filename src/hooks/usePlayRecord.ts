/** @format */

import {useState, useEffect} from "react"
import {useSelector, SongInfoModelState,UserModelState} from "umi"

const usePlayRecord = () => {

  // const {playHistory, playRecord} = state
  const {allPlayRecord} = useSelector((state: any):UserModelState => state.userModel)
  const {playRecord, playHistory} = useSelector((state: any): SongInfoModelState => state.songInfoModel)

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
