/** @format */

import {useState, useEffect, FC, createContext} from "react"
import {history} from "@umijs/max"
import {Tabs, Radio, Button, message, Flex, Skeleton, TabsProps} from "antd"
import {
  BorderInnerOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  FolderAddOutlined,
  UserOutlined,
  CheckOutlined
} from "@ant-design/icons"
import {Artist, artistAlbum, artistSub} from "@/api/singer"
import {Image} from "@/components"
import {useRequest} from "ahooks"
import {SingerDetail, SimilarSinger, Mv} from "./components"
import API from "@/api"
import {useQuery, useVirtualListHeight} from "@/hooks"
import {LayoutType} from "./album"

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

const ArtistsDetail: FC = () => {
  const {id, name} = useQuery<{id: number; name: string; source: string}>()

  const [tabKey, setTabKey] = useState(TabEnmu.album)

  const [collect, setCollect] = useState(false)
  const [extraType, setExtraType] = useState<LayoutType>("card")

  const [artistDetail, setArtistDetail] = useState<Artist>({} as Artist)

  const [loading, setLoading] = useState(false)

  const virtualListHeight = useVirtualListHeight(100)

  const getArtistAlbum = async () => {
    try {
      setLoading(true)
      const res = await artistAlbum({id, limit: 0})
      setArtistDetail(res.data.artist)
      setCollect(res.data.artist.followed)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onCollect = async (t: 0 | 1) => {
    try {
      setLoading(true)
      const res = await artistSub({id, t})
      if ((res.code as any) !== 200) {
        message.info(res.data.blockText)
        setLoading(false)
        return
      }
      setCollect(true)
      await getArtistAlbum()
      setLoading(false)
    } catch (error) {
      console.log("error", error)
    }
  }

  // const {run: runColect} = useRequest(
  //   () => API.setArtistsSub({id: data?.id, t: collect ? -1 : 1}),
  //   {
  //     manual: true,
  //     onSuccess: async () => {
  //       await runSub()
  //       if (collect) {
  //         message.success("取消收藏成功")
  //       } else {
  //         message.success("收藏成功")
  //       }
  //     }
  //   }
  // )

  // const {run: runSub} = useRequest(API.artistSublist, {
  //   manual: true,
  //   onSuccess: (response) => {
  //     if (response.data.findIndex((item: any) => +item.id === +query.id) !== -1) {
  //       setCollect(true)
  //     } else {
  //       setCollect(false)
  //     }
  //   }
  // })

  const onTab = (activeKey: any) => {
    setTabKey(activeKey)
  }
  const extra = (
    <Radio.Group
      value={tabKey === "album" && extraType}
      buttonStyle="solid"
      onChange={(e) => setExtraType(e.target.value)}>
      <Radio.Button value="card">
        <BorderInnerOutlined />
      </Radio.Button>
      <Radio.Button value="table">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="tableCard">
        <PicLeftOutlined />
      </Radio.Button>
    </Radio.Group>
  )

  useEffect(() => {
    getArtistAlbum()
  }, [])

  const commonProps = {
    id,
    virtualListHeight
  }

  const items: TabsProps["items"] = [
    {
      label: "专辑",
      key: TabEnmu.album,
      children: false
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
          </Flex>
        </Flex>
      </Flex>

      <Tabs onChange={onTab} items={items} tabBarExtraContent={tabKey === TabEnmu.album && extra} />
    </Flex>
  )
}

export default ArtistsDetail
