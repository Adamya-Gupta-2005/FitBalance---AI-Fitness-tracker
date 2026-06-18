import React, { useState } from 'react';
import './Food.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFile,
  faMugHot,
  faSun,
  faMoon,
  faCookieBite,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { toast } from 'react-toastify';

const Food = () => {

  const [activePannel, setActivePannel] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [foodData, setFoodData] = useState({
    foodName: "",
    calories: "",
    mealType: ""
  });

  const [foodItems, setFoodItems] = useState({
    breakfast: [],
    lunch: [],
    snack: [],
    dinner: [],
  });

  const mealTypes = [
    {
      key: "breakfast",
      title: "Breakfast",
      icon: faMugHot
    },
    {
      key: "lunch",
      title: "Lunch",
      icon: faSun
    },
    {
      key: "snack",
      title: "Snack",
      icon: faCookieBite
    },
    {
      key: "dinner",
      title: "Dinner",
      icon: faMoon
    }
  ];

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value
    });
  };

  const addFood = () => {

    if (
      !foodData.foodName ||
      !foodData.calories ||
      !foodData.mealType
    ) {
      toast.error("Fill all details");
      return;
    }

    const newFood = {
      name: foodData.foodName,
      calories: Number(foodData.calories)
    };

    setFoodItems(prev => ({
      ...prev,
      [foodData.mealType]: [
        ...prev[foodData.mealType],
        newFood
      ]
    }));

    setFoodData({
      foodName: "",
      calories: "",
      mealType: ""
    });

    toast.success("Food Added");
    setActivePannel(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const deleteFood = (mealType, index) => {

    setFoodItems(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(
        (_, i) => i !== index
      )
    }));

    toast.success("Food Deleted");
  };

  return (
    <div className='food-container'>

      <div className='food-header'>
        <h1>Food Tracker</h1>
        <h3>Track your calorie intake here</h3>
      </div>

      <div className='section-divider'>

        {/* LEFT SECTION */}

        <div className="food-actions">

          {activePannel === null && (

            <div className='action-buttons'>

              <button
                className='food-action-btn'
                onClick={() => setActivePannel('add')}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Food Entry
              </button>

              <button
                className='food-action-btn'
                onClick={() => setActivePannel('ai')}
              >
                AI Food Snap
              </button>

            </div>

          )}

          {/* ADD FOOD FORM */}

          {activePannel === "add" && (

            <div className="food-form">

              <h2>New Food Entry</h2>

              <label className='form-header'>
                Food Name
              </label>

              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                className="form-inp"
                value={foodData.foodName}
                onChange={handleChange}
              />

              <label className='form-header'>
                Calories
              </label>

              <input
                type="number"
                name="calories"
                placeholder="Calories"
                className="form-inp"
                value={foodData.calories}
                onChange={handleChange}
              />

              <label className='form-header'>
                Meal Type
              </label>

              <select
                className="form-inp"
                name="mealType"
                value={foodData.mealType}
                onChange={handleChange}
              >
                <option value="">
                  Select meal type
                </option>

                <option value="breakfast">
                  Breakfast
                </option>

                <option value="lunch">
                  Lunch
                </option>

                <option value="snack">
                  Snack
                </option>

                <option value="dinner">
                  Dinner
                </option>

              </select>

              <div className='form-btns'>

                <button
                  className="back-btn btn"
                  onClick={() => setActivePannel(null)}
                >
                  Back
                </button>

                <button
                  className="save-btn btn"
                  onClick={addFood}
                >
                  Add Entry
                </button>

              </div>

            </div>

          )}

          {/* AI FOOD SNAP */}

          {activePannel === "ai" && (

            <div className="food-form">

              <h3>AI Food Snap</h3>

              <label
                className="upload-label"
                htmlFor="file-inp"
              >
                <FontAwesomeIcon icon={faFile} />

                {" "}

                {selectedFile
                  ? selectedFile.name
                  : "Choose Food Image"}
              </label>

              <input
                id="file-inp"
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />

              <div className='form-btns'>

                <button
                  className="back-btn btn"
                  onClick={() => {
                    setActivePannel(null);
                    setSelectedFile(null);
                  }}
                >
                  Back
                </button>

                <button
                  className="save-btn btn"
                >
                  Analyze Food
                </button>

              </div>

            </div>

          )}

        </div>

        {/* RIGHT SECTION */}

        {Object.values(foodItems).some(
          meal => meal.length > 0
        ) && (

          <div className="food-log-section">

            {mealTypes.map(meal => (

              foodItems[meal.key].length > 0 && (

                <div
                  key={meal.key}
                  className="meal-card"
                >

                  <h3>
                    <span className="icon-container">
                      <FontAwesomeIcon
                        icon={meal.icon}
                      />
                    </span>

                    {meal.title}
                  </h3>

                  {foodItems[meal.key].map(
                    (item, index) => (

                      <div
                        key={index}
                        className="food-item"
                      >

                        <span>
                          {item.name}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                          }}
                        >

                          <span>
                            {item.calories} kcal
                          </span>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteFood(
                                meal.key,
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

                    )
                  )}

                </div>

              )

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Food;