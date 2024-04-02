import { FC } from "react"
import { useSelector } from "@umijs/max"
import { IState } from "typings"
import { Navigate, Outlet } from '@umijs/max';
import styles from "./index.scss"
import { UserModelState } from "@/models/userStore";
import { login } from "@/help/cache";

const Auth: FC = () => {
  // const { loginStatus } = useSelector<IState, UserModelState>((state) => state.userModel)

  if (login()) {
    return <div className={styles.wrapContainer}><Outlet /></div>
  }
  return <Navigate to="/login" replace />
}

export default Auth
