/** @format */

import React from "react"
import {useLocation} from "@umijs/max"
import {NewComment, HotComment} from "@/components"

const Comment = () => {
  const location: any = useLocation()
  const {id} = location?.query
  return (
    <>
      <HotComment type={3} id={id} />
      <NewComment type={3} id={id} />
    </>
  )
}

export default Comment
