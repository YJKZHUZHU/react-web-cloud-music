/** @format */

import { FC } from "react"
import { history } from "@umijs/max"
import { UserContent, Search, AddSongList } from "./components"
import styles from "./index.scss"
import classNames from "classnames"

const Header: FC = ({ children }) => {

  return (
    <header className={classNames(styles._header, "flex bg-[#ffffff] h-[max-content]")}>
      <div className="w-[220px] pl-[40px] self-baseline mt-[5px]">
        <img
          onClick={() => history.push("/personal-recommendation")}
          width={144}
          src={require("../../../assets/home.png")}></img>
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
