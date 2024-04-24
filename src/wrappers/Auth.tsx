/** @format */

import {FC} from "react"
import {Navigate, Outlet} from "@umijs/max"
import styles from "./index.scss"
import {login} from "@/help/cache"

const Auth: FC = () => {

  if (login()) {
    return (
      <div className={styles.wrapContainer}>
        <Outlet />
      </div>
    )
  }
  return <Navigate to="/login" replace />
}

export default Auth
