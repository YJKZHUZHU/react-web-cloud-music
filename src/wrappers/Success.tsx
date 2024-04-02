/** @format */
import  { FC } from "react"
import { Navigate} from "@umijs/max"
import { Outlet } from '@umijs/max';
import styles from "./index.scss"
import { login } from "@/help/cache"

const Success: FC = () => {
  // const { loginStatus } = useSelector<IState, UserModelState>((state) => state.userModel)
  // console.log("cookie", Cookie.defaults, document.cookie, Cookie.get("MUSIC_U"), loginStatus)

  if (!login()) {
    return <div className={styles.wrapContainer}><Outlet /></div>
  }
  return <Navigate to="/personal-recommendation" replace />
}

export default Success
