/** @format */

import { useState, useEffect } from "react"
import { usePlayRecord as usePlayRecordStore, usePlayHistory } from '@/store/player'
import { useAllPlayRecord } from "@/store/user"

const usePlayRecord = () => {

  const playRecord = usePlayRecordStore()
  const playHistory = usePlayHistory()
  const allPlayRecord = useAllPlayRecord()

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
