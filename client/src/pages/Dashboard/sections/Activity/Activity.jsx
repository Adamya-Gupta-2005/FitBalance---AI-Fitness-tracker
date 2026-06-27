import React, { useState } from 'react';
import './Activity.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPersonWalking,
  faPersonRunning,
  faBicycle,
  faDumbbell,
  faFutbol,
  faSpa,
  faBolt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';

const Activity = () => {

  const [activePanel, setActivePanel] = useState(null);

  const [activityData, setActivityData] = useState({
    activityName: "",
    duration: "",
    caloriesBurned: "",
    activityType: ""
  });

  const [activities, setActivities] = useState([]);

  const activityTypes = [
    {
      key: "walking",
      title: "Walking",
      icon: faPersonWalking
    },
    {
      key: "running",
      title: "Running",
      icon: faPersonRunning
    },
    {
      key: "cycling",
      title: "Cycling",
      icon: faBicycle
    },
    {
      key: "gym",
      title: "Gym",
      icon: faDumbbell
    },
    {
      key: "sports",
      title: "Sports",
      icon: faFutbol
    },
    {
      key: "yoga",
      title: "Yoga",
      icon: faSpa
    },
    {
      key: "other",
      title: "Other",
      icon: faBolt
    }
  ];

  useEffect(() => {
    fetchActivities();
  }, []);

  const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";;

  const fetchActivities = async () => {

    try {

      const { data } = await axios.get(`${backendUrl}/api/activity`,
        {
          withCredentials: true
        }
      );

      if (data.success) {
        setActivities(data.activities);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };


  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value
    });
  };

  const addActivity = async () => {

    if (
      !activityData.activityName ||
      !activityData.duration ||
      !activityData.caloriesBurned ||
      !activityData.activityType
    ) {
      toast.error("Fill all details");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/activity`, {
        name: activityData.activityName,
        duration: Number(activityData.duration),
        caloriesBurned: Number(activityData.caloriesBurned),
        activityType: activityData.activityType
      },
        {
          withCredentials: true
        })

      await fetchActivities();

      setActivityData({
        activityName: "",
        duration: "",
        caloriesBurned: "",
        activityType: ""
      });

      setActivePanel(null);

      toast.success("Activity Added");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };


  const deleteActivity = async (id) => {

    try {

      await axios.delete(
        `${backendUrl}/api/activity/${id}`,
        {
          withCredentials: true
        }
      );

      await fetchActivities();

      toast.success("Activity Deleted");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div className='food-container'>

      <div className='food-header'>
        <h1>Activity Tracker</h1>
        <h3>Track workouts and calories burned</h3>
      </div>

      <div className='section-divider'>

        {/* LEFT SECTION */}

        <div className="food-actions">

          {activePanel === null && (
            <div className='action-buttons'>

              <button
                className='food-action-btn'
                onClick={() => setActivePanel('add')}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Activity
              </button>

            </div>
          )}

          {activePanel === "add" && (

            <div className="food-form">

              <h2>New Activity</h2>

              <label className='form-header'>
                Activity Name
              </label>

              <input
                type="text"
                name="activityName"
                placeholder="Activity Name"
                className="form-inp"
                value={activityData.activityName}
                onChange={handleChange}
              />

              <label className='form-header'>
                Duration (minutes)
              </label>

              <input
                type="number"
                name="duration"
                placeholder="Duration"
                className="form-inp"
                value={activityData.duration}
                onChange={handleChange}
              />

              <label className='form-header'>
                Calories Burned
              </label>

              <input
                type="number"
                name="caloriesBurned"
                placeholder="Calories Burned"
                className="form-inp"
                value={activityData.caloriesBurned}
                onChange={handleChange}
              />

              <label className='form-header'>
                Activity Type
              </label>

              <select
                className="form-inp"
                name="activityType"
                value={activityData.activityType}
                onChange={handleChange}
              >
                <option value="">Select Activity Type</option>
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="gym">Gym</option>
                <option value="sports">Sports</option>
                <option value="yoga">Yoga</option>
                <option value="other">Other</option>
              </select>

              <div className='form-btns'>

                <button
                  className="back-btn btn"
                  onClick={() => setActivePanel(null)}
                >
                  Back
                </button>

                <button
                  className="save-btn btn"
                  onClick={addActivity}
                >
                  Add Activity
                </button>

              </div>

            </div>

          )}

        </div>

        {/* RIGHT SECTION */}

        {activities.length > 0 && (

          <div className="food-log-section">

            {activityTypes.map(type => {

              const typeActivities = activities.filter(
                activity => activity.activityType === type.key
              );

              if (typeActivities.length === 0) return null;

              return (

                <div
                  className="meal-card"
                  key={type.key}
                >

                  <h3>
                    <span className="icon-container">
                      <FontAwesomeIcon icon={type.icon} />
                    </span>

                    {type.title}
                  </h3>

                  {typeActivities.map(activity => (

                    <div
                      className="food-item"
                      key={activity._id}
                    >

                      <div>

                        <h4>
                          {activity.name}
                        </h4>

                        <span>
                          {activity.duration} min
                        </span>

                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center"
                        }}
                      >

                        <span>
                          {activity.caloriesBurned} kcal
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteActivity(activity._id)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                          />
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default Activity;