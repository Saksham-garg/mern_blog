import Header from "../Header/Header.jsx";
import FooterComp from "../Footer/Footer.jsx";
import React from 'react'
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
        <Header />
          <Outlet />
        <FooterComp />
    </>
  )
}

export default Layout