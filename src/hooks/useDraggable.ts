import { useState, useRef } from 'react'
import { useBoolean } from 'ahooks'
import Draggable, { DraggableData } from "react-draggable"

// modal拖动hooks
const useDraggable = () => {
  const [draggableed, { toggle: toggleDraggableed }] = useBoolean(false)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<HTMLDivElement>(null)
  const onStart = (_: any, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement
    const targetRect = draggleRef?.current?.getBoundingClientRect()
    if (targetRect) {
      setBounds({
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y)
      })
    }
  }
  const onMouseOver = () => {
    if (draggableed) {
      toggleDraggableed(false)
    }
  }
  // 鼠标离开
  const onMouseOut = () => toggleDraggableed(true)

  return {
    onMouseOver,
    toggleDraggableed,
    draggableed,
    bounds,
    onStart,
    draggleRef,
    onMouseOut
  }
}

export default useDraggable