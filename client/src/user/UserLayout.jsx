import { Outlet } from "react-router-dom"
import {ToastContainer} from "react-toastify"
import UserHeader from "./UserHeader"

import 'react-toastify/dist/ReactToastify.min.css';

export default function UserLayout() {
  return (
    <>
      <ToastContainer />
    {/* <UserHeader /> */}
    <Outlet />
    </>
  )
}
