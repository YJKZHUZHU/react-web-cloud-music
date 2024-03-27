/** @format */
import React, { FC, useEffect } from "react"
import { useSelector, Link, history } from "@umijs/max"
import { IState } from "typings"
// import Cookie from "js-cookie"
import { Navigate } from '@umijs/max';
import styles from "./index.scss"
import { UserModelState } from "@/models/userStore";

const Auth: FC = ({ children }) => {
  const { loginStatus } = useSelector<IState, UserModelState>((state) => state.userModel)

  if (loginStatus) {
    return <div className={styles.wrapContainer}>{children}</div>
  }
  return <Navigate to="/login" replace />
}

export default Auth
