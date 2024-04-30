/** @format */

import {FC} from "react"
import {Navigate, Outlet} from "@umijs/max"
import {login} from "@/help/cache"

const Auth: FC = () => {
  if (login()) {
    return <Outlet />
  }
  return <Navigate to="/login" replace />
}

export default Auth
