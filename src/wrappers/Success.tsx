/** @format */
import React, { FC, useEffect } from "react"
import { Navigate, useSelector, useLocation } from "@umijs/max"
import { IState } from "typings"
import Cookie from "js-cookie"
import Api from "@/api"
import { Outlet } from '@umijs/max';
import styles from "./index.scss"
import { UserModelState } from "@/models/userStore"

const Success: FC = () => {
  const { loginStatus } = useSelector<IState, UserModelState>((state) => state.userModel)
  // console.log("cookie", Cookie.defaults, document.cookie, Cookie.get("MUSIC_U"), loginStatus)

  if (!loginStatus) {
    return <div className={styles.wrapContainer}><Outlet /></div>
  }
  return <Navigate to="/personal-recommendation" replace />
}

export default Success
