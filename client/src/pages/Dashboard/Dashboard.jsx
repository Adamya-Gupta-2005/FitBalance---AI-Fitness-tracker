import React from 'react'
import Home from './sections/Home/Home'
import Food from './sections/Food/Food'
import Activity from './sections/Activity/Activity'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useState } from 'react'
import Profile from './sections/Profile/Profile'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

  return (
    <div className='dashboard'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>

      <div className='dashboard-content'>
        {activeTab === 'home' && <Home />}
        {activeTab === 'food' && <Food />}
        {activeTab === 'activity' && <Activity />}
        {activeTab === 'profile' && <Profile />}
        
        </div>
    </div>
  )
}

export default Dashboard
