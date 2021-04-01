/** @format */
import React, {FC} from "react"
import {Redirect, useSelector} from "umi"
import {IState} from "typings"
import styles from './index.scss'

const Auth: FC = ({children}) => {
  const {loginStatus} = useSelector((state: IState) => state.userModel)
  if (loginStatus) {
    return <div className={styles.wrapContainer}>{children}</div>
  } else {
    return <Redirect to="/login" />
  }
}

export default Auth
