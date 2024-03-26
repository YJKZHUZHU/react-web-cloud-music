/** @format */

import React, {useEffect, useState} from "react"
import API from "@/api"

const mapData = (idList: number[]) => {
  return idList.map((id) => {
    return API.getAlbumContent({id})
  })
}

const useAlbumContent = (albList: number[]) => {
  const [data, setData] = useState([])
  const getData = () => {
    Promise.all(mapData(albList)).then((values: any) => {
      setData(values)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return {albumCotentList: data}
}

export default useAlbumContent
