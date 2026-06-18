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

const Activity = () => {

  const [activePanel, setActivePanel] = useState(null);

  const [activityData, setActivityData] = useState({
    activityName: "",
    duration: "",
    caloriesBurned: "",
    activityType: ""
  });

  const [activityItems, setActivityItems] = useState({
    walking: [],
    running: [],
    cycling: [],
    gym: [],
    sports: [],
    yoga: [],
    other: []
  });

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

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value
    });
  };

  const addActivity = () => {

    if (
      !activityData.activityName ||
      !activityData.duration ||
      !activityData.caloriesBurned ||
      !activityData.activityType
    ) {
      toast.error("Fill all details");
      return;
    }

    const newActivity = {
      name: activityData.activityName,
      duration: Number(activityData.duration),
      calories: Number(activityData.caloriesBurned)
    };

    setActivityItems(prev => ({
      ...prev,
      [activityData.activityType]: [
        ...prev[activityData.activityType],
        newActivity
      ]
    }));

    setActivityData({
      activityName: "",
      duration: "",
      caloriesBurned: "",
      activityType: ""
    });

    toast.success("Activity Added");
    setActivePanel(null);
  };

  const deleteActivity = (type, index) => {

    setActivityItems(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));

    toast.success("Activity Deleted");
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

        {Object.values(activityItems).some(
          item => item.length > 0
        ) && (

          <div className="food-log-section">

            {activityTypes.map(type => (

              activityItems[type.key].length > 0 && (

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

                  {activityItems[type.key].map((item, index) => (

                    <div
                      className="food-item"
                      key={index}
                    >

                      <div>
                        <h4>{item.name}</h4>
                        <span>
                          {item.duration} min
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
                          {item.calories} kcal
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteActivity(
                              type.key,
                              index
                            )
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

              )

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Activity;