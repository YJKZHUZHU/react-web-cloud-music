/** @format */

import {MutableRefObject, useCallback, useRef, useState} from "react"

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = useCallback(() => setIsHovering(true), [])
  const handleMouseOut = useCallback(() => setIsHovering(false), [])

  const nodeRef = useRef<HTMLDivElement>()

  const callbackRef = useCallback<any>(
    (node: HTMLDivElement) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener("mouseover", handleMouseOver)
        nodeRef.current.removeEventListener("mouseout", handleMouseOut)
      }

      nodeRef.current = node

      if (nodeRef.current) {
        nodeRef.current.addEventListener("mouseover", handleMouseOver)
        nodeRef.current.addEventListener("mouseout", handleMouseOut)
      }
    },
    [handleMouseOver, handleMouseOut]
  )

  return [callbackRef, isHovering]
}

export default useHover
