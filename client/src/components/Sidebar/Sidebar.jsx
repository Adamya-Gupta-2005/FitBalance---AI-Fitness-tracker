import React from 'react'
import './Sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUtensils,
  faDumbbell,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ activeTab, setActiveTab  }) => {
  return (
    <div className='sidebar'>
        <div className='logo'>
            <h2>FitBalance</h2>
        </div>
      
        <div className='nav-links'>
            <div className={activeTab === 'home' ? "nav-item active" : "nav-item"} onClick={() => setActiveTab('home')}><FontAwesomeIcon icon={faHouse} className='i' /> Home</div>
            <div className={activeTab === 'food' ? "nav-item active" : "nav-item"} onClick={() => setActiveTab('food')}><FontAwesomeIcon icon={faUtensils} className='i' /> Food</div>
            <div className={activeTab === 'activity' ? "nav-item active" : "nav-item"} onClick={() => setActiveTab('activity')}><FontAwesomeIcon icon={faDumbbell} className='i' /> Activity</div>
            <div className={activeTab === 'profile' ? "nav-item active" : "nav-item"} onClick={() => setActiveTab('profile')}><FontAwesomeIcon icon={faUser} className='i' /> Profile</div>
        </div>
    </div>
  )
}

export default Sidebar
