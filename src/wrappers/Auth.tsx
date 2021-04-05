/** @format */
import React, {FC, useEffect} from "react"
import {Redirect, useSelector, useLocation, useHistory} from "umi"
import {IState} from "typings"
import Cookie from "js-cookie"
import Api from "@/api"
import styles from "./index.scss"

const Auth: FC = ({children}) => {
  const {loginStatus} = useSelector((state: IState) => state.userModel)

  if (Cookie.get("MUSIC_U")) {
    return <div className={styles.wrapContainer}>{children}</div>
  }
  return <Redirect to="/login" />
}

export default Auth
