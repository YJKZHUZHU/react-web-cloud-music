/** @format */

import React, {useRef} from "react"
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons"
import {Carousel} from "antd"
import {useRequest} from "ahooks"
import {useDispatch} from "umi"
import API from "@/api"
import styles from "./index.scss"

interface IBanner {
  adDispatchJson: string | null
  adLocation: string | null
  adSource: string | null
  adid: string | null
  encodeId: string | null
  event: string | null
  exclusive: boolean
  extMonitor: string | null
  extMonitorInfo: string | null
  imageUrl: string
  monitorBlackList: string | null
  monitorClick: string | null
  monitorClickList: string | null
  monitorImpress: string | null
  monitorImpressList: string | null
  monitorType: string | null
  program: string | null
  scm: string | null
  song: string | null
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: string | null
  video: string | null
}

interface IData<T = []> {
  banners: T
  code: number
}

const CarouselImg = () => {
  const dispatch = useDispatch()
  const slider = useRef<any>(null)
  const {data} = useRequest<IData<IBanner[]>, any[], IBanner[]>(() => API.banner({type: 0}), {
    formatResult: (response) => {
      if (response.code !== 200) return []
      return response.banners
    }
  })
  return (
    <div className={styles.carousel}>
      <Carousel
        dots
        autoplay={false}
        centerMode
        infinite
        focusOnSelect
        className="center"
        centerPadding="60px"
        slidesToShow={3}
        ref={slider}>
        {data?.map((item) => {
          return (
            <div
              className={styles.item}
              key={item.targetId}
              onDoubleClick={() =>
                dispatch({type: "songInfoModel/getSongInfo", payload: {id: item.targetId}})
              }>
              <img src={item.imageUrl} />
              <span className={styles.bg} style={{background: item.titleColor}}>
                {item.typeTitle}
              </span>
            </div>
          )
        })}
      </Carousel>
      <LeftCircleOutlined onClick={() => slider?.current?.prev()} className={styles.left} />
      <RightCircleOutlined onClick={() => slider?.current?.next()} className={styles.right} />
    </div>
  )
}

export default CarouselImg
