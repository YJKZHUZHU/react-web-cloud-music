/** @format */

import React, {useEffect, useState} from "react"
import API from "@/api"

const mapData = (idList: number[]) => {
  return idList.map((id) => {
    return API.getAlbumContent({id})
  })
}

const useAlbumContent = (albumIdList: number[]) => {
  const [data, setData] = useState([])
  const getData = () => {
    Promise.all(mapData(albumIdList)).then((values: any) => {
      console.log(values)
      setData(values)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return {albumCotentList: data}
}

export default useAlbumContent
