/** @format */
import {FC} from "react"
import {Navigate} from "@umijs/max"
import {Outlet} from "@umijs/max"
import styles from "./index.scss"
import {login} from "@/help/cache"

const Success: FC = () => {
  if (!login()) {
    return (
      <div className={styles.wrapContainer}>
        <Outlet />
      </div>
    )
  }
  return <Navigate to="/personal-recommendation" replace />
}

export default Success
