/** @format */

import {INewSongItem} from "@/store/personalRecommendation"
import {Flex} from "antd"
import classNames from "classnames"
import {Artists, Image, PlayVideoIcon} from "@/components"
import {PlaySquareOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {history} from "@umijs/max"
import {useGetSongInfo} from "@/store/player"
import {useHover} from "@/hooks"

interface Props {
  data: INewSongItem
  index: number
}

const LatestMusicItem = (props: Props) => {
  const {data, index} = props
  const getSongInfo = useGetSongInfo()
  const [hoverRef, isHovering] = useHover()
  return (
    <Flex
      ref={hoverRef}
      gap={15}
      key={data.id}
      className={classNames(" cursor-pointer py-[8px] pr-[8px] hover:bg-[#efefef] rounded-[8px]")}
      onClick={() => getSongInfo(data.id)}>
      <span className=" pl-[16px]  self-center">{Utils.generateIndex(index)}</span>
      <div className="relative w-[64px] h-[64px]">
        <Image
          width={64}
          className="rounded-[5px]"
          src={data.picUrl}
          size={[64, 64]}
          multiple={2}
        />
        <PlayVideoIcon
          iconProps={{className: "!text-[14px] ml-0"}}
          className={classNames(isHovering ? "opacity-1" : "opacity-0", "!w-[25px] !h-[25px]")}
        />
      </div>
      <Flex gap={12} vertical flex={1} justify="center" align="center">
        <span className="line-clamp-1 self-start w-full">{data.name}</span>
        <Artists data={data.song.artists} className="self-start w-full" />
      </Flex>

      {!!data.song.mvid ? (
        <PlaySquareOutlined
          className=" text-[#d33931]"
          onClick={(e) => {
            e.stopPropagation()
            history.push(`/mv-detail/${data.song.mvid}`)
          }}
        />
      ) : null}
    </Flex>
  )
}

export default LatestMusicItem
