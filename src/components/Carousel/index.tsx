import React, {FC, useEffect, useState} from 'react'
import {Carousel, Icon} from 'antd'
import API from '@/api'
import styles from './index.scss'
import Song from '@/help/getSongInfo'
import {Subscribe} from '@/Appcontainer'

interface ItemInterFace {
  targetId: string,
  imageUrl: string,
  typeTitle?: string,
  titleColor?: string
}

interface ResInterface {
  code: number,
  banners: any
}

const CarouselImg: FC = props => {
  const [carouselData, setCarouselData] = useState([])
  let slider: any = null
  useEffect(() => {
    // @ts-ignore
    API.banner({
      type: 0,
      loading: true
    }).then((res:any) => {
      if (res.code === 200) {
        setCarouselData(res.banners)
      }
    })
  }, [])
  // @ts-ignore
  return (
    <div className={styles.carousel}>
      <Carousel
        dots={true}
        autoplay
        centerMode
        infinite
        focusOnSelect
        className='center'
        centerPadding='60px'
        slidesToShow={3}
        ref={e => (slider = e)}
      >
        {
          carouselData.map((item: ItemInterFace) => {
            return (
              <div className={styles.item} key={item.targetId} onClick={() => Song.getSongUrl(item.targetId)}>
                <img src={item.imageUrl}/>
                <div className={styles.bg} style={{background: item.titleColor}}>
                  <i/>
                  <span>{item.typeTitle}</span>
                </div>

              </div>
            )
          })
        }
      </Carousel>
      <Icon type="left-circle" onClick={() => slider.slick.slickPrev()} className={styles.left}/>
      <Icon type="right-circle" onClick={() => slider.slick.slickNext()} className={styles.right}/>
    </div>

  )
}

export default CarouselImg
