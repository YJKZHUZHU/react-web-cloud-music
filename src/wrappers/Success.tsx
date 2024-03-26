/** @format */
import React, {FC, useEffect} from "react"
import {Redirect, useSelector, useLocation, useHistory, UserModelState} from "@umijs/max"
import {IState} from "typings"
import Cookie from "js-cookie"
import Api from "@/api"
import { Outlet } from '@umijs/max';
import styles from "./index.scss"

const Success: FC = ({children}) => {
  const {loginStatus} = useSelector<IState, UserModelState>((state) => state.userModel)
  console.log("cookie", Cookie.defaults, document.cookie, Cookie.get("MUSIC_U"), loginStatus)

  if (!loginStatus) {
    return <div className={styles.wrapContainer}>{children}</div>
  }
  return <Redirect to="/personal-recommendation" />
}

export default Success
