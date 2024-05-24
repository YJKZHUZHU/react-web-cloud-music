/** @format */

import React, {FC, useEffect, useMemo, useRef, useState} from "react"
import {history} from "@umijs/max"
import {Flex} from "antd"
import {Artist} from "@/store/search"
import classNames from "classnames"
import {useSetShowPlayer} from "@/store/player"

export interface IItem extends Partial<Artist> {
  name?: string
  id?: number
  userName?: string
  userId?: string | number
}

interface Props {
  type?: "artist" | "user"
  data: IItem[]
  isJump?: boolean
  gap?: number
  max?: number
  color?: string
  hoverColor?: string
  itemClassName?: string
  className?: string
  split?: string
  splitClassName?: string
  splitColor?: string
}

const HoverText = (props: Pick<Props, "hoverColor" | "color" | "className"> & {name: string}) => {
  const {hoverColor, color, name, className} = props
  const [isHovered, setIsHovered] = React.useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(
        className,
        isHovered ? `text-[${hoverColor}]` : `text-[${color}]`,
        " cursor-pointer"
      )}>
      {name}
    </span>
  )
}

function CharWidthMeasurer({
  character,
  getWidth
}: {
  character: string
  getWidth: (width: number) => void
}) {
  // 创建一个引用，用于稍后引用DOM元素
  const ref = useRef<HTMLElement>(null)

  // 用于存储字符宽度的状态
  const [charWidth, setCharWidth] = useState(0)

  useEffect(() => {
    // 当字符或DOM元素改变时，执行测量
    const measureCharWidth = () => {
      if (ref.current) {
        // 获取临时元素的宽度
        const {width} = ref.current?.getBoundingClientRect()
        // 更新字符宽度状态
        // setCharWidth(width)
        getWidth(width)
      }
    }

    // 测量字符宽度
    measureCharWidth()

    // 清理函数，用于在组件卸载时移除事件监听器
    return () => {
      // 这里可以执行一些清理工作，如移除事件监听器
    }
  }, [character]) // 依赖数组，当character改变时重新测量

  // 渲染一个不可见的元素，用于测量字符宽度
  return (
    <span ref={ref} style={{visibility: "hidden", position: "absolute"}}>
      {character}
    </span>
  )
}

const Artists: FC<Props> = (props) => {
  const {
    data,
    className,
    splitClassName,
    itemClassName,
    type = "artist",
    isJump = true,
    max = 3,
    gap = 2,
    color = "#242425",
    hoverColor = "#515252",
    split = "/",
    splitColor = "#515252"
  } = props

  if (!data || data.length === 0) return null

  const setShowPlayer = useSetShowPlayer()

  const onLink = (e: React.MouseEvent<HTMLElement, MouseEvent>, item: IItem) => {
    if (!isJump) return false
    e.preventDefault()
    e.stopPropagation()
    setShowPlayer(false)
    const url =
      type === "artist"
        ? `/artists-detail?id=${item.id}&name=${item.name}`
        : `/homepage/${item.userId}`
    return history.push(url)
  }
  const containerRef = useRef<HTMLElement | null>(null)

  const maxData = useMemo(() => {
    return data.slice(0, max)
  }, [max, data])

  // const showEllipsis = useMemo(() => {
  //   return maxData.length !== data.length
  // }, [maxData, data])

  return (
    <Flex
      ref={containerRef}
      align="center"
      gap={gap}
      className={classNames("line-clamp-1", className)}>
      {maxData.map((item, index) => (
        <Flex
          align="center"
          gap={gap}
          key={item.id}
          className={classNames(
            itemClassName,
            "leading-[20px]",
            index === maxData.length - 1 ? " flex-1" : ""
          )}
          onClick={(e) => onLink(e, item)}>
          <HoverText
            className={index === maxData.length - 1 ? " flex-1 line-clamp-1" : "line-clamp-1 w-max"}
            color={color}
            hoverColor={hoverColor}
            name={type === "artist" ? item.name! : item.userName!}
          />
          {index !== maxData.length - 1 && (
            <span className={classNames(splitClassName, `text-[${splitColor}]`)}>{split}</span>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export default Artists
