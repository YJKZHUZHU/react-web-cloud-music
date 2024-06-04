/** @format */

import {Flex, Spin} from "antd"
import {
  useGetSongList,
  useSongListLoading,
  useCreatorSongList,
  useFavoriteSongList,
  ISongListItem
} from "@/store/user"
import {history} from "@umijs/max"
import {Image} from "@/components"
import {useEffect} from "react"
import {EnumLocalStorage, getItem} from "@/help/cache"
import Utils from "@/help"
import {CaretRightOutlined, UserOutlined} from "@ant-design/icons"

export default function () {
  const uid = getItem(EnumLocalStorage.userId)
  const getSongList = useGetSongList()
  const songListLoading = useSongListLoading()
  const creatorSongList = useCreatorSongList()
  const favoriteSongList = useFavoriteSongList()
  useEffect(() => {
    if (uid) {
      getSongList(Number(uid))
    }
  }, [uid])
  const renderList = (source: ISongListItem[]) => {
    const data = Utils.chunkArray(source, 6)

    return (
      <Flex wrap gap={21}>
        {source.map((item) => {
          return (
            <Flex
              className="w-[170px]"
              key={item.id}
              onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}
              vertical
              gap={8}>
              <div className=" relative cursor-pointer ">
                <Image
                  height={170}
                  width={170}
                  className="w-[170px] h-[170px]"
                  src={item.coverImgUrl}
                  size={[170, 170]}
                  multiple={2}
                />
                {item.playCount !== 0 && (
                  <Flex
                    gap={2}
                    align="center"
                    justify="end"
                    className="text-[#ffffff] text-[14px] absolute w-full left-0  top-[8px] pr-[8px]">
                    <CaretRightOutlined />
                    <span>{Utils.tranNumber(item.playCount)}</span>
                  </Flex>
                )}

                <Flex
                  gap={4}
                  align="center"
                  className="text-[#ffffff] absolute bottom-[10px] w-full px-[8px]">
                  <UserOutlined className="text-[14px]" />
                  <span className=" text-[14px] line-clamp-1">{item.creator?.nickname}</span>
                  <img
                    alt=""
                    className=" h-[12px]"
                    src={`${item?.creator?.avatarDetail?.identityIconUrl}?param=12y12`}
                  />
                </Flex>
              </div>
              <span className=" cursor-pointer text-[14px] line-clamp-2 text-[#333333] leading-[20px] hover:text-[#000000]">
                {item.name}
              </span>
            </Flex>
          )
        })}
      </Flex>
    )
  }
  return (
    <Spin spinning={songListLoading} tip="Loading...">
      <Flex flex={1} vertical gap={24}>
        <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
          <span>创建的歌单</span>

          {renderList(creatorSongList)}
        </Flex>
        <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
          <span>收藏的歌单</span>
          {renderList(favoriteSongList)}
        </Flex>
      </Flex>
    </Spin>
  )
}
