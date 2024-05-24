/** @format */

import {useEffect, useState} from "react"

const useVirtualListHeight = (extraHeight: number = 0, selector: string = "#_contentContainer") => {
  const [virtualHeight, setVirtualHeight] = useState(0)
  const getHeight = () => {
    const ele = document.querySelector<HTMLDivElement>(selector)
    if (ele) {
      // 使用getBoundingClientRect获取元素的位置和尺寸
      const rect = ele?.getBoundingClientRect()!

      // 获取元素的实际样式
      const computedStyle = window.getComputedStyle(ele!)

      // 计算边框宽度
      const borderTopWidth = parseInt(computedStyle.borderTopWidth, 10)
      const borderBottomWidth = parseInt(computedStyle.borderBottomWidth, 10)

      // 计算内边距高度
      const paddingTop = parseInt(computedStyle.paddingTop, 10)
      const paddingBottom = parseInt(computedStyle.paddingBottom, 10)

      // 计算不包括内边距和边框的高度
      const heightWithoutPaddingAndBorder =
        rect.height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth - extraHeight

      console.log("heightWithoutPaddingAndBorder", heightWithoutPaddingAndBorder)
      return heightWithoutPaddingAndBorder
    }
    return 0
  }
  useEffect(() => {
    const height = getHeight()
    setVirtualHeight(height)

    window.addEventListener("resize", () => {
      const height = getHeight()
      setVirtualHeight(height)
    })

    return window.removeEventListener("resize", () => {
      console.log("移除监听")
    })
  }, [])

  return virtualHeight
}

export default useVirtualListHeight
