import React, { Activity } from 'react'
import Home from './sections/Home/Home'
import Food from './sections/Food/Food'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useState } from 'react'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

  return (
    <div className='dashboard'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>

      <div className='dashboard-content'>
        {activeTab === 'home' && <Home />}
        {activeTab === 'food' && <Food />}
        
        </div>
    </div>
  )
}

export default Dashboard
