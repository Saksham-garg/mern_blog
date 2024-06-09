import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, Outlet,useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa6'

const Header = () => {
  const path = useLocation()
  return (
    <>
      <Navbar>
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Saksham's
          </span>
          blog
        </Link>
        <form>
            <TextInput type="text" placeholder="Search ..." rightIcon={AiOutlineSearch} className="hidden lg:inline">
            </TextInput>
        </form>
     
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="hidden sm:inline" color="gray" pill>
                <FaMoon />
            </Button>
            <Button gradientDuoTone="purpleToBlue">
                Sign In
            </Button>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Navbar.Link active={path.pathname === "/"} as={"div"}>
                <Link to="/">
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path.pathname === "/about"} as={"div"}>
                <Link to="/about">
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path.pathname === "/projects"} as={"div"}>
                <Link to="/projects">
                    Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
