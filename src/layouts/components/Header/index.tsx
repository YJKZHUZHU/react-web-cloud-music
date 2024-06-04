/** @format */

import {FC, useEffect, useState} from "react"
import {history, useLocation} from "@umijs/max"
import {UserContent, Search, AddSongList} from "./components"
import classNames from "classnames"
import home from "@/assets/home.png"
import {unsub2, useHistoryStore} from "@/store/history"
import {useShowPlayer, useSetShowPlayer} from "@/store/player"
import styles from "./index.scss"
import {Flex} from "antd"
import {DownOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons"

const Header: FC = ({children}) => {
  const location = useLocation()
  const historyList = useHistoryStore((state) => state.historyList)
  const showPlayer = useShowPlayer()
  const setShowPlayer = useSetShowPlayer()

  return (
    <header className={classNames("flex bg-[#ffffff] h-[60px]")}>
      <Flex justify="center" align="center" className=" w-[220px] pl-[24px]">
        <img
          alt=""
          onClick={() => history.push("/personal-recommendation")}
          className=" w-[120px]"
          src={home}
        />

        <Flex align="center" flex={1} justify="end" gap={8}>
          {showPlayer ? (
            <Flex
              onClick={() => setShowPlayer(false)}
              align="center"
              justify="center"
              className={classNames(
                "w-[30px] h-[30px] cursor-pointer hover:bg-[#E2E2E4] hover:rounded-[50%]"
              )}>
              <DownOutlined />
            </Flex>
          ) : (
            <>
              <Flex
                onClick={() => {
                  // if (historyList?.length <= 1) return
                  history.back()
                }}
                align="center"
                justify="center"
                className={classNames("w-[30px] h-[30px] cursor-pointer", {
                  // "text-[#C7C7C8]": historyList?.length <= 1,
                  "hover:bg-[#E2E2E4]": historyList.length > 1,
                  "hover:rounded-[50%]": historyList.length > 1,
                  "cursor-pointer": historyList.length > 1
                })}>
                <LeftOutlined />
              </Flex>

              <Flex
                onClick={() => {
                  console.log("history", history.listen)
                  const index = historyList.findIndex((item) => item.pathname === location.pathname)
                  console.log("index--", index)
                  // if (historyList?.length <= 1 || (index !== -1 && index !== historyList.length - 1)) {
                  //   return
                  // }
                  // history.go(1)
                  history.forward()
                }}
                align="center"
                justify="center"
                className={classNames(
                  "w-[30px] h-[30px] cursor-pointer hover:bg-[#E2E2E4] hover:rounded-[50%]",
                  {
                    // "text-[#C7C7C8]":
                    //   historyList?.length <= 1 ||
                    //   historyList.at(-1)?.pathname === location.pathname,
                    "hover:bg-[#E2E2E4]": historyList.length > 1,
                    "hover:rounded-[50%]": historyList.length > 1,
                    "cursor-pointer": historyList.length > 1
                  }
                )}>
                <RightOutlined />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
      <Flex gap={12} align="center" flex={1} justify="end" className="  pr-[20px]">
        {children}

        <Search />
        <AddSongList />
      </Flex>
    </header>
  )
}

export default Header
