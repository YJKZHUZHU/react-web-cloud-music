/** @format */

import {useEffect, useRef, useState} from "react"
import {DeleteOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons"
import {AutoComplete, Flex, Modal, Spin, Tag} from "antd"
import {history} from "@umijs/max"
import classNames from "classnames"
import {useGetSongInfo} from "@/store/player"
import {
  SearchResponse,
  useGetHotList,
  useHotList,
  useKeywords,
  useSearchHistoryList,
  useUpdateKeywords,
  useUpdateSearchHistoryList,
  useLoading,
  useSuggestList,
  Album,
  Artist,
  Song,
  Playlist,
  SUGGEST_TYOE_ENUM,
  SEARCH_TYPE_ENUM
} from "@/store/search"
import song from "@/assets/song.png"
import album from "@/assets/album.png"
import playlist from "@/assets/playlist.png"
import {HighlightText} from "@/components"

const {confirm} = Modal

const Search = () => {
  const loading = useLoading()
  const keywords = useKeywords()
  const getSongInfo = useGetSongInfo()
  const updateKeywords = useUpdateKeywords()
  const getHotList = useGetHotList()
  const suggestList = useSuggestList()
  const hotList = useHotList()
  const searchHistoryList = useSearchHistoryList()
  const updateSearchHistoryList = useUpdateSearchHistoryList()
  const [open, setOpen] = useState(false)
  const alwaysShow = useRef(false)
  const hasFetchHot = useRef(false)

  const onDelete: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    alwaysShow.current = true
    confirm({
      title: "搜索历史",
      content: "确认删除全部搜索历史记录吗？",
      okText: "确认",
      cancelText: "取消",
      centered: true,
      maskClosable: false,
      onOk: () => {
        alwaysShow.current = false
        updateSearchHistoryList([])
      },
      onCancel: () => {
        alwaysShow.current = false
      }
    })
  }

  const onHistory = (keywords: string) => {
    setOpen(false)
    updateKeywords(keywords, true)
    history.push(`/search-detail/single?keywords=${keywords}&type=1`)
  }

  const onSearch: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key.toLocaleLowerCase() === "enter") {
      setOpen(false)
      updateSearchHistoryList([...searchHistoryList, keywords])
      history.push(`/search-detail/single?keywords=${keywords}&type=${1}`)
    }
  }
  const onChange = (newValue: string) => {
    console.log("onChange", newValue)

    updateKeywords(newValue, !!newValue)
  }

  const onTopLink = (item: SearchResponse) => {
    setOpen(false)
    updateKeywords(item.searchWord)
    updateSearchHistoryList([...searchHistoryList, item.searchWord])
    history.push(`/search-detail/single?keywords=${item.searchWord}&type=${1}`)
  }

  const onSuggestLink = (searchType: SEARCH_TYPE_ENUM, name: string, id: string | number) => {
    setOpen(false)
    updateSearchHistoryList([...searchHistoryList, keywords])

    if (searchType == SEARCH_TYPE_ENUM.single) {
      return getSongInfo(Number(id))
    }
    if (searchType === SEARCH_TYPE_ENUM.singer) {
      return history.push(`/artists-detail?id=${id}&name=${name}`)
    }
    if (searchType === SEARCH_TYPE_ENUM.album) {
      return history.push(`/album/${id}`)
    }
    if (searchType === SEARCH_TYPE_ENUM.playlist) {
      return history.push(`playList/${id}`)
    }
    return history.push(`/search-detail/single?keywords=${name}&type=${searchType}`)
  }

  const renderSong = (item: Song) => {
    return (
      <>
        <HighlightText content={item.name} pattern={new RegExp(keywords, "g")} />
        {item.alias && Array.isArray(item.alias) && item.alias.length !== 0 && (
          <HighlightText
            className=" text-[#888888] px-[2px]"
            content={`(${item.alias.join()})`}
            pattern={new RegExp(keywords, "g")}
          />
        )}
        {item.transNames && Array.isArray(item.transNames) && item.transNames.length !== 0 && (
          <HighlightText
            className=" text-[#888888] px-[2px]"
            content={`(${item.transNames.join()})`}
            pattern={new RegExp(keywords, "g")}
          />
        )}
        <span>-</span>
        <HighlightText
          className=" line-clamp-1 flex-1"
          content={item.artists?.map((d) => d.name).join()}
          pattern={new RegExp(keywords, "g")}
        />
      </>
    )
  }

  const renderArtist = (item: Artist) => {
    return <HighlightText content={item?.name} pattern={new RegExp(keywords, "g")} />
  }
  const renderAlbum = (item: Album) => {
    return (
      <>
        <HighlightText content={item?.name} pattern={new RegExp(keywords, "g")} />
        <span>-</span>
        <HighlightText content={item.artist?.name} pattern={new RegExp(keywords, "g")} />
      </>
    )
  }
  const renderPlaylist = (item: Playlist) => {
    return <HighlightText content={item?.name} pattern={new RegExp(keywords, "g")} />
  }

  const renderTopList = () => {
    return (
      <Flex vertical gap={12}>
        {searchHistoryList.length !== 0 && (
          <Flex vertical gap={12} className="px-[12px]">
            <Flex justify="space-between">
              <Flex gap={4}>
                <span>搜索历史</span>
                <DeleteOutlined onClick={onDelete} />
              </Flex>
              {searchHistoryList.length > 5 && (
                <span className=" text-[#535454] cursor-pointer hover:text-[#1E1E1F]">
                  查看全部
                </span>
              )}
            </Flex>

            <Flex wrap>
              {searchHistoryList?.map((item) => {
                return (
                  <Tag
                    color="green"
                    closable
                    className=" cursor-pointer"
                    key={item}
                    onClick={() => onHistory(item)}
                    onClose={() =>
                      updateSearchHistoryList(searchHistoryList.filter((d) => d !== item))
                    }>
                    {item}
                  </Tag>
                )
              })}
            </Flex>
          </Flex>
        )}
        <Flex vertical gap={18}>
          <span className="px-[12px] text-[#545455]">热搜榜</span>
          <Flex vertical gap={12} className="">
            {hotList.map((item, index) => {
              return (
                <Flex
                  onClick={() => onTopLink(item)}
                  className="cursor-pointer px-[12px] py-[6px] hover:bg-[#EDEDEF]"
                  gap={8}
                  align="center"
                  key={item.searchWord}>
                  <span
                    className={classNames(
                      "text-[17px]",
                      index <= 2 ? "text-[#FB202D]" : "text-[#B3B3B3]",
                      "mr-[10px]"
                    )}>
                    {index + 1}
                  </span>
                  <span
                    className={classNames(
                      index <= 2 ? "text-[#252525] font-[600]" : "text-[#272828]"
                    )}>
                    {item.searchWord}
                  </span>
                  <span className="text-[#C1C1C1]">{item.score}</span>
                  {item.iconUrl && <img className="h-[12px]" src={`${item.iconUrl}`} />}
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </Flex>
    )
  }

  const renderSearchList = () => {
    return (
      <Flex vertical gap={12} className="px-[12px]">
        <HighlightText content={`搜“${keywords}”相关的结果`} pattern={new RegExp(keywords, "g")} />
        <Flex vertical gap={12}>
          {suggestList.map((item) => {
            return (
              <Flex vertical key={item.key} gap={8}>
                <Flex align="center" gap={4}>
                  {item.key === SUGGEST_TYOE_ENUM.songs && (
                    <img className="h-[16px] w-[16px]" src={song} />
                  )}
                  {item.key === SUGGEST_TYOE_ENUM.artists && (
                    <UserOutlined className="text-[16px] text-[#8A8A8A]" />
                  )}
                  {item.key === SUGGEST_TYOE_ENUM.albums && (
                    <img className="h-[16px] w-[16px]" src={album} />
                  )}
                  {item.key === SUGGEST_TYOE_ENUM.playlists && (
                    <img className="h-[16px] w-[16px]" src={playlist} />
                  )}
                  <span className="text-[#878788]">{item.name}</span>
                </Flex>
                <Flex vertical>
                  {item.list.map((d) => {
                    return (
                      <Flex
                        onClick={() => onSuggestLink(item.searchType, d.name, d.id)}
                        align="center"
                        key={d.id}
                        className=" cursor-pointer py-[6px] pl-[16px] hover:bg-[#EDEDEF]">
                        {item.key === SUGGEST_TYOE_ENUM.songs && renderSong(d)}
                        {item.key === SUGGEST_TYOE_ENUM.artists &&
                          renderArtist(d as unknown as Artist)}
                        {item.key === SUGGEST_TYOE_ENUM.albums &&
                          renderAlbum(d as unknown as Album)}
                        {item.key === SUGGEST_TYOE_ENUM.playlists &&
                          renderPlaylist(d as unknown as Playlist)}
                      </Flex>
                    )
                  })}
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    )
  }

  const dropdownRender = () => {
    return (
      <Spin style={{height: 300}} spinning={loading} tip="搜索中..." delay={500}>
        {keywords ? renderSearchList() : renderTopList()}
      </Spin>
    )
  }

  useEffect(() => {
    if (open && !hasFetchHot.current && !keywords) {
      hasFetchHot.current = true
      getHotList()
    }
  }, [open, keywords])

  return (
    <AutoComplete
      allowClear
      options={[{value: "占位"}]}
      open={open}
      value={keywords}
      onClear={() => {
        alwaysShow.current = true
        setTimeout(() => {
          alwaysShow.current = false
        }, 100)
      }}
      onKeyDown={onSearch}
      onBlur={() => {
        if (alwaysShow.current) {
          setOpen(true)
          return
        }
      }}
      onDropdownVisibleChange={(visible) => {
        if (alwaysShow.current) return
        setOpen(visible)
      }}
      onChange={onChange}
      className={classNames("w-[500px] !ml-[24px] ")}
      popupClassName="!overflow-y-scroll  py-[16px]"
      dropdownStyle={{height: 300}}
      suffixIcon={<SearchOutlined />}
      placeholder="搜索"
      dropdownRender={dropdownRender}
    />
  )
}
export default Search
