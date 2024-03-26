/** @format */

import { useState, useEffect } from "react"
import { useSelector } from "@umijs/max"
import { IState } from 'typings'

const usePlayRecord = () => {
  const { userModel, songInfoModel } = useSelector((state: IState) => state)
  const { allPlayRecord } = userModel
  const { playRecord, playHistory } = songInfoModel

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
