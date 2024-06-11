import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'

const SidebarComp = () => {
    const location = useLocation()
    const [tab,setTab] = useState('')
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
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab == 'profile'}
                            label={'User'}
                            labelColor='dark'
                            icon={HiUser}
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item
                        labelColor='dark'
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
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