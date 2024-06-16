import Header from "../Header/Header.jsx";
import FooterComp from "../Footer/Footer.jsx";
import React from 'react'
import { Outlet } from "react-router-dom";
import {ScrollToTop} from "@/components";
const Layout = () => {
  return (
    <>
        <ScrollToTop />
        <Header />
          <Outlet />
        <FooterComp />
    </>
  )
}

export default Layout