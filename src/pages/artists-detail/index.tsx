/** @format */

import {useState, useEffect, FC, createContext} from "react"
import {history} from "@umijs/max"
import {Tabs, Button, Flex, Skeleton, TabsProps, message} from "antd"
import {FolderAddOutlined, UserOutlined, CheckOutlined} from "@ant-design/icons"
import {artistDetail as artistDetailApi} from "@/api/singer"
import {Image} from "@/components"
import {SingerDetail, SimilarSinger, Mv, Album} from "./components"
import {useQuery, useVirtualListHeight} from "@/hooks"

interface IArtistsDetailContext {
  total: number
}
export const ArtistsDetailContext = createContext<IArtistsDetailContext>({
  total: 0
})

interface IQuery {
  id: number
  name: string
}

export interface IProps {
  query: IQuery
}

enum TabEnmu {
  album = "album",
  mv = "mv",
  singerDetail = "singerDetail",
  similarSinger = "similarSinger",
  show = "show"
}

interface IArtistDetail {
  name: string
  picUrl: string
  alias: string[]
  id: string | number
  musicSize: number
  albumSize: number
  mvSize: number
}

const ArtistsDetail: FC = () => {
  const {id, name} = useQuery<{id: number; name: string; source: string}>()

  const [tabKey, setTabKey] = useState(TabEnmu.album)

  const [collect, setCollect] = useState(false)

  const [artistDetail, setArtistDetail] = useState<IArtistDetail>({
    name: "",
    picUrl: "",
    alias: [],
    id: "",
    musicSize: 0,
    albumSize: 0,
    mvSize: 0
  })

  const [loading, setLoading] = useState(false)

  const virtualListHeight = useVirtualListHeight(100)

  const getDetail = async () => {
    try {
      setLoading(true)
      const res = await artistDetailApi({id})
      setArtistDetail({
        name: res.data.artist?.name,
        picUrl: res.data?.artist?.avatar!,
        alias: res.data?.artist?.alias,
        id: res.data?.artist?.id,
        albumSize: res.data?.artist?.albumSize,
        musicSize: res.data?.artist?.musicSize,
        mvSize: res.data?.artist?.mvSize
      })
      console.log("res---", res)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const onCollect = async (t: 0 | 1) => {
    try {
      return message.info("开发中...")
    } catch (error) {
      console.log("error", error)
    }
  }

  const onTab = (activeKey: string) => {
    setTabKey(activeKey as TabEnmu)
  }

  useEffect(() => {
    getDetail()
  }, [])

  const commonProps = {
    id,
    virtualListHeight
  }

  const items: TabsProps["items"] = [
    {
      label: "专辑",
      key: TabEnmu.album,
      children: <Album {...commonProps} />
    },
    {
      label: "MV",
      key: TabEnmu.mv,
      children: <Mv {...commonProps} />
    },
    {
      label: "歌手详情",
      key: TabEnmu.singerDetail,
      children: <SingerDetail {...commonProps} name={name || artistDetail?.name} />
    },
    {
      label: "相似歌手",
      key: TabEnmu.similarSinger,
      children: <SimilarSinger {...commonProps} />
    }
  ]

  return (
    <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex gap={24}>
        <Image
          className=" w-[200px] h-[200px] cursor-pointer rounded-[5px]"
          src={artistDetail?.picUrl}
          height={200}
          size={[200, 200]}
          multiple={2}
        />
        <Flex flex={1} vertical gap={18}>
          {loading ? (
            <Skeleton.Input style={{height: 18}} size="small" active />
          ) : (
            <span className="text-[18px] font-[600] text-[#262627]">{artistDetail?.name}</span>
          )}
          {loading ? (
            <Skeleton.Input style={{height: 16}} active />
          ) : (
            <span className="text-[#545454]">{artistDetail?.alias?.join("；")}</span>
          )}

          <Flex gap={12}>
            <Button
              className="w-[100px]"
              icon={collect ? <CheckOutlined /> : <FolderAddOutlined className="text-[16px]" />}
              shape="round"
              onClick={() => onCollect(collect ? 0 : 1)}>
              {collect ? "已关注" : "关注"}
            </Button>

            <Button
              icon={<UserOutlined />}
              shape="round"
              onClick={() => history.push(`/homepage/${artistDetail?.id}`)}>
              个人主页
            </Button>
          </Flex>
          <Flex gap={8}>
            <span className="text-[#363D62]">单曲数：{artistDetail?.musicSize || 0}</span>
            <span className="text-[#363D62]">专辑数：{artistDetail?.albumSize || 0}</span>
            <span className="text-[#363D62]">MV数：{artistDetail?.mvSize || 0}</span>
          </Flex>
        </Flex>
      </Flex>

      <Tabs onChange={onTab} items={items} />
    </Flex>
  )
}

export default ArtistsDetail
