/** @format */

import React, {FC, useEffect, useState} from "react"
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons"
import {Carousel} from "antd"
import API from "@/api"
import Song from "@/help/getSongInfo"
import {useDispatch} from "umi"
import styles from "./index.scss"

interface ItemInterFace {
  targetId: number
  imageUrl: string
  typeTitle?: string
  titleColor?: string
}

const CarouselImg = () => {
  const [carouselData, setCarouselData] = useState([])
  const dispatch = useDispatch()
  let slider: any = null
  useEffect(() => {
    API.banner({
      type: 0,
      loading: true
    }).then((res) => {
      if (res.code === 200) {
        setCarouselData(res.banners)
      }
    })
  }, [])
  return (
    <div className={styles.carousel}>
      <Carousel
        dots={true}
        autoplay
        centerMode
        infinite
        focusOnSelect
        className="center"
        centerPadding="60px"
        slidesToShow={3}
        ref={(e) => (slider = e)}>
        {carouselData.map((item: ItemInterFace) => {
          return (
            <div
              className={styles.item}
              key={item.targetId}
              onClick={() =>
                dispatch({type: "songInfoModel/getSongInfo", payload: {id: item.targetId}})
              }>
              <img src={item.imageUrl} />
              <div className={styles.bg} style={{background: item.titleColor}}>
                <i />
                <span>{item.typeTitle}</span>
              </div>
            </div>
          )
        })}
      </Carousel>
      <LeftCircleOutlined onClick={() => slider.slick.slickPrev()} className={styles.left} />
      <RightCircleOutlined onClick={() => slider.slick.slickNext()} className={styles.right} />
    </div>
  )
}

export default CarouselImg
