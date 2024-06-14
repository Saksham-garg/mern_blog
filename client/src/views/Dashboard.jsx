import React,{ useState, useEffect } from 'react'
import { SidebarComp } from '../components'
import { useLocation } from 'react-router-dom'
import { Profile, Posts, Users } from '../components'
const Dashboard = () => {
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* SidebarComp component */}
      <SidebarComp />
      {/* Main Component  */}
      { tab  == 'profile' ? <Profile />  : ''}
      { tab == 'posts' ? <Posts /> : ''}
      { tab == 'users' ? <Users /> : ''}
    </div>
  )
}

export default Dashboard