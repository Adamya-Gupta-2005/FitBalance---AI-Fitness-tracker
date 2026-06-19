import React, { useState } from 'react'
import './Profile.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faCalendarDays, faWeightScale, faArrowUpRightDots, faBullseye
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        age: 18,
        weight: 75,
        height: 175,
        goal: "Maintain Weight"
    });

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = use;

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate('/')
    };

    return (
        <div className='profile-container'>

            <div className="profile-header">
                <h1>Profile</h1>
                <h3>Manage your profile</h3>
            </div>

            <div className='profile-log'>

                <div className="profile-log-header">
                    <span className='icon-container'>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <h2>Your Profile</h2>
                </div>

                {!isEditing ? (

                    <>
                        <div className="profile-log-container">
                            <div className='inner-container'>
                                <span className='icon-container'>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                <h5>Age</h5>
                            </div>
                            <p>{profileData.age}</p>
                        </div>

                        <div className="profile-log-container">
                            <div className='inner-container'>
                                <span className='icon-container'>
                                    <FontAwesomeIcon icon={faWeightScale} />
                                </span>
                                <h5>Weight</h5>
                            </div>
                            <p>{profileData.weight} kg</p>
                        </div>

                        <div className="profile-log-container">
                            <div className='inner-container'>
                                <span className='icon-container'>
                                    <FontAwesomeIcon icon={faArrowUpRightDots} />
                                </span>
                                <h5>Height</h5>
                            </div>
                            <p>{profileData.height} cm</p>
                        </div>

                        <div className="profile-log-container">
                            <div className='inner-container'>
                                <span className='icon-container'>
                                    <FontAwesomeIcon icon={faBullseye} />
                                </span>
                                <h5>Goal</h5>
                            </div>
                            <p>{profileData.goal}</p>
                        </div>

                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </>

                ) : (

                    <div className="profile-form">

                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={profileData.age}
                            onChange={handleChange}
                            className="profile-input"
                        />

                        <label>Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={profileData.weight}
                            onChange={handleChange}
                            className="profile-input"
                        />

                        <label>Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={profileData.height}
                            onChange={handleChange}
                            className="profile-input"
                        />

                        <label>Goal</label>
                        <select
                            name="goal"
                            value={profileData.goal}
                            onChange={handleChange}
                            className="profile-input"
                        >
                            <option>Lose Weight</option>
                            <option>Maintain Weight</option>
                            <option>Gain Weight</option>
                        </select>

                        <div className="profile-btns">

                            <button
                                className="cancel-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
};

export default Profile
