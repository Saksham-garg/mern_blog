import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from '../../stores/theme/themeSlice.js'
import signOutUser from '../../hooks/useSignOut.jsx'
const Header = () => {
  const path = useLocation();
  const dispatch = useDispatch()
  const handleSignOut = signOutUser()
  const { currentUser } = useSelector((state) => state.user);
  const { themes } = useSelector((state) => state.theme)
  const [ searchItem, setSearchItem ] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const seachFromURL = urlParams.get('searchTerm')
    if(seachFromURL){
      setSearchItem(seachFromURL)
    }
  },[location.search])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchItem);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <>
      <Navbar>
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Lex
          </span>
          Coutours
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search ..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          ></TextInput>
        </form>

        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="hidden sm:inline" color="gray" onClick={() => dispatch(toggleTheme())} pill>
            { themes == 'dark' ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="text-sm">{currentUser.username}</span>
              </Dropdown.Header>
              <Dropdown.Header>
                <span className="text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => handleSignOut()}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
            </Link>
          )}
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active={path.pathname === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path.pathname === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path.pathname === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
