import React, {FC, Fragment, useEffect, useState} from 'react'
import styles from './index.scss'
import { CustomerServiceOutlined, PlaySquareOutlined } from '@ant-design/icons';
import Utils from '@/help/index'
import {Link} from "umi"

type Props = {
  data?: object
}

interface DataInterface {
  picUrl: string,
  copywriter: string,
  playCount: number,
  name: string,
  id: any
}

const RecommendedSongList: FC<Props> = (props) => {
  // @ts-ignore
  const data: DataInterface = props.data
  return (
    <Link to={`/playList?listId=${data.id}`}>
      <div className={styles._list}>
        <div className={styles.imgWrap}>
          <img src={data.picUrl}/>
          <span className={styles.number}>
          <CustomerServiceOutlined className={styles.listen} />
          <i>{Utils.tranNumber(data.playCount, 2)}</i>
        </span>
          <div className={styles.descWrap}>
            <span className={styles.desc}>{data.copywriter}</span>
          </div>
          <span className={styles.playIcon}>
          <PlaySquareOutlined />
        </span>
        </div>
        <p className={styles.name}>{data.name}</p>
      </div>
    </Link>
  );
}

export default RecommendedSongList
