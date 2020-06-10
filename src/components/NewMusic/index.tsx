import React, {FC} from 'react'
import { CaretRightOutlined, PlaySquareOutlined } from '@ant-design/icons';
import Song from '@/help/getSongInfo'
import styles from './index.scss'

type Props = {
  data: object,
  index: number
}

interface DataInterface {
  picUrl: string,
  name: string,
  song: any,
  id:any
}

const NewMusic: FC<Props> = props => {
  // @ts-ignore
  const data: DataInterface = props.data
  const index = props.index + 1
  // @ts-ignore
  const singer: string = props.data.song.artists[0].name
  return (
    <div className={styles._newMusic} onDoubleClick={() => Song.getSongUrl(data.id)}>
      <span className={styles.number}>{index < 9 ? `0${index}` : index}</span>
      <div className={styles.img}>
        <img src={data.picUrl}/>
        <span className={styles.playIcon}>
          <CaretRightOutlined />
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.name}>
          <PlaySquareOutlined />
          <span>{singer}</span>
        </p>
      </div>
    </div>
  );
}

export default NewMusic
