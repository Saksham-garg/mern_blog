import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import signOutUser from '../../hooks/useSignOut.jsx'
import { useSelector } from 'react-redux'

const SidebarComp = () => {
    const location = useLocation()
    const [tab,setTab] = useState('')
    const handleSignOut = signOutUser()
    const { currentUser } = useSelector((state) => state.user)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row w-56'>
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-3'>
                    {
                        currentUser && currentUser.isAdmin &&
                        <>
                         <Link to="/dashboard?tab=dash">
                            <Sidebar.Item
                                as="div"
                                active={tab == 'dash' || !tab}
                                labelColor='dark'
                                icon={HiChartPie}
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link> 
                        </>
                    }
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            as="div"
                            active={tab == 'profile'}
                            label={currentUser?.isAdmin ? 'Admin'  : 'User'}
                            labelColor='dark'
                            icon={HiUser}
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentUser.isAdmin && 
                        (  
                            <>
                            <Link to="/dashboard?tab=posts">
                                <Sidebar.Item
                                    as="div"
                                    active={tab == 'posts'}
                                    labelColor='dark'
                                    icon={HiDocumentText}
                                    >
                                    Posts
                                </Sidebar.Item>
                            </Link>
                            <Link to="/dashboard?tab=users">
                                <Sidebar.Item
                                    as="div"
                                    active={tab == 'users'}
                                    labelColor='dark'
                                    icon={HiOutlineUserGroup}
                                    >
                                    Users
                                </Sidebar.Item>
                            </Link>
                            <Link to="/dashboard?tab=comments">
                                <Sidebar.Item
                                    as="div"
                                    active={tab == 'comments'}
                                    labelColor='dark'
                                    icon={HiAnnotation}
                                    >
                                    Comments
                                </Sidebar.Item>
                            </Link>
                          </>
                        )
                    }
                    <Sidebar.Item
                        labelColor='dark'
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={() => handleSignOut()}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    </div>
  )
}

export default SidebarComp