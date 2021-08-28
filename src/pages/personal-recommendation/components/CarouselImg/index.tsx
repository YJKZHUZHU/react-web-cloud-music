/** @format */

import React, {useRef, useMemo} from "react"
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons"
import {Carousel, message} from "antd"
import {useRequest} from "ahooks"
import {useDispatch} from "umi"
import classnames from "classnames"
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
  const {data=[]} = useRequest<IData<IBanner[]>, any[], IBanner[]>(() => API.banner({type: 0}), {
    formatResult: (response) => {
      if (response.code !== 200) return []
      return response?.banners || []
    }
  })

  const onPlay = (id: number | string) => {
    if (id) {
      return dispatch({type: "songInfoModel/getSongInfo", payload: {id}})
    }
    return message.info("该类型无法播放哦")
  }
  

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
        {useMemo(() => {
          return data?.map((item) => {
            return (
              <>
                <img
                  key={item?.imageUrl}
                  src={item?.imageUrl}
                  onDoubleClick={() => onPlay(item?.targetId)}
                />
                <span
                  className={classnames(styles.bg, "_carousel_bg")}
                  style={{background: item?.titleColor}}>
                  {item?.typeTitle}
                </span>
              </>
            )
          })
        }, [JSON.stringify(data)])}
      </Carousel>
      <LeftCircleOutlined onClick={() => slider?.current?.prev()} className={styles.left} />
      <RightCircleOutlined onClick={() => slider?.current?.next()} className={styles.right} />
    </div>
  )
}

export default CarouselImg
