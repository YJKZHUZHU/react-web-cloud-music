/** @format */

import {useLikeLoading, useLikelist, useSetLike} from "@/store/playlistDetail"
import {HeartFilled, HeartOutlined} from "@ant-design/icons"
import classNames from "classnames"

interface Props {
  id: string | number
  className?: string
}

const Like = (props: Props) => {
  const {id, className} = props

  const likelist = useLikelist()

  const setLike = useSetLike()
  const likeLoading = useLikeLoading()

  return (
    <>
      {likelist?.includes(Number(id)) ? (
        <HeartFilled
          disabled={likeLoading}
          onClick={(e) => {
            e.stopPropagation()
            setLike({id, like: false})
          }}
          className={classNames("text-[#BF1420]", className)}
        />
      ) : (
        <HeartOutlined
          disabled={likeLoading}
          onClick={(e) => {
            e.stopPropagation()
            setLike({id, like: true})
          }}
          className={className}
        />
      )}
    </>
  )
}

export default Like
