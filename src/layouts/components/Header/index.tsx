/** @format */

import {FC} from "react"
import {history} from "@umijs/max"
import {UserContent, Search, AddSongList} from "./components"
import classNames from "classnames"
import home from "@/assets/home.png"
import styles from "./index.scss"

const Header: FC = ({children}) => {
  return (
    <header className={classNames(styles._header, "flex bg-[#ffffff] h-[max-content]")}>
      <div className="w-[220px] pl-[40px] self-baseline mt-[5px]">
        <img
          onClick={() => history.push("/personal-recommendation")}
          className=" w-[144px]"
          src={home}
        />
      </div>
      <div className="flex-1 flex flex-col pr-[20px]">
        <div className="h-[60px] flex items-center gap-[24px]">
          <Search />
          <AddSongList />
          <UserContent />
        </div>
        {children}
      </div>
    </header>
  )
}

export default Header
