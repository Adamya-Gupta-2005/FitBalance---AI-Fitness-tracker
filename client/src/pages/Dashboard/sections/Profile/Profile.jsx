import React, { useState } from 'react'
import './Profile.css'

import axios from 'axios';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faCalendarDays, faWeightScale, faArrowUpRightDots, faBullseye
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        username: "",
        age: "",
        weight: "",
        height: "",
        goal: ""
    });

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const { data } = await axios.get(`${backendUrl}/api/user/profile`,
                    {
                        withCredentials: true
                    }
                );

                if (data.success) {
                    setProfileData({
                        username: data.user.username || "",
                        age: data.user.age || "",
                        weight: data.user.weight || "",
                        height: data.user.height || "",
                        goal: data.user.goal || ""
                    });
                }

            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    error.message
                );
            }
        }

        fetchProfile();

    }, []);

    const handleLogout = async () => {

        try {
            await axios.post(`${backendUrl}/api/user/logout`, {}, {
                withCredentials: true
            }
            );
            navigate('/');
            toast.success("Logged Out")
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };


    const handleSave = async () => {
        try {

            const { data } = await axios.put(
                `${backendUrl}/api/user/profile`,
                profileData,
                {
                    withCredentials: true
                }
            );

            if (data.success) {
                setProfileData({
                    username: data.user.username,
                    age: data.user.age,
                    weight: data.user.weight,
                    height: data.user.height,
                    goal: data.user.goal
                });
                setIsEditing(false);
                toast.success("Profile Updated");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    }

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
                    <h2>{profileData.username}</h2>
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
                            <p>
                                {profileData.goal === "lose" && "Lose Weight"}
                                {profileData.goal === "maintain" && "Maintain Weight"}
                                {profileData.goal === "gain" && "Gain Weight"}
                            </p>
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
                            <option value="lose">Lose Weight</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="gain">Gain Weight</option>
                        </select>

                        <div className="profile-btns">

                            <button
                                type='button'
                                className="cancel-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type='button'
                                className="save-btn"
                                onClick={handleSave}
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
