import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi'
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