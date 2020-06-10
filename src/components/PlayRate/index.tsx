import React,{FC,Fragment} from 'react'
import {Subscribe} from '@/Appcontainer'
import { DashboardOutlined, SyncOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import {appState} from '@/models/gloable'
type Props = {
  $app: any
}

const PlayRate:FC<Props> = props => {
  const {playMode} = props.$app.state
  return (
    <Fragment>
      {
        playMode === 0 ? (
          <Tooltip placement="top" title="顺序播放">
            <UnorderedListOutlined onClick={() => appState.setPlayMode(1)} />
          </Tooltip>
        ) : null
      }
      {
        playMode === 1 ? (
          <Tooltip placement="top" title="单曲循环" defaultVisible>
            <SyncOutlined onClick={() => appState.setPlayMode(2)} />
          </Tooltip>
        ) : null
      }
      {
        playMode === 2 ? (
          <Tooltip placement="top" title="随机播放" defaultVisible>
            <DashboardOutlined onClick={() => appState.setPlayMode(0)} />
          </Tooltip>
        ) : null
      }



    </Fragment>
  );
}

// @ts-ignore
export default Subscribe(PlayRate)
