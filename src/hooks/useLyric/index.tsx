import React, {FC, useState, useEffect} from 'react'
import API from '@/api'

const useLyric = (id: number | string) => {
  const [lyric, setLyric] = useState({})
  const getLyric = () => {
    id && API.getLyric({id}).then((res: any) => {
      if (res.code === 200) {
      }
    })
  }
  useEffect(() => {
    getLyric()
  }, [])
  return lyric
}

export default useLyric
