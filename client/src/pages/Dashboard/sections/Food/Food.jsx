import React, { useState } from 'react';
import axios from 'axios'
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
import { useEffect } from 'react';

const Food = () => {

  const [activePannel, setActivePannel] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [foodData, setFoodData] = useState({
    foodName: "",
    calories: "",
    mealType: ""
  });

  const [foods, setFoods] = useState([])

  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/food`,
        {
          withCredentials: true
        }
      );

      if (data.success) {
        setFoods(data.foods);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

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

  const addFood = async () => {

    if (
      !foodData.foodName ||
      !foodData.calories ||
      !foodData.mealType
    ) {
      toast.error("Fill all details");
      return;
    }

    try {

      await axios.post(`${backendUrl}/api/food`,
        {
          name: foodData.foodName,
          calories: Number(foodData.calories),
          mealType: foodData.mealType
        },
        {
          withCredentials: true
        }
      );

      await fetchFoods();

      setFoodData({
        foodName: "",
        calories: "",
        mealType: ""
      });

      setActivePannel(null);
      toast.success("Food Added");

    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const deleteFood = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/food/${id}`,
        {
          withCredentials: true
        }
      );

      fetchFoods();

      toast.success("Food Deleted");

    } catch (error) {
      toast.error(error.message);
    }
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

        {foods.length > 0 && (

          <div className="food-log-section">

            {mealTypes.map(meal => {

              const mealFoods = foods.filter(
                food => food.mealType === meal.key
              );

              if (mealFoods.length === 0) return null;

              return (
                <div
                  key={meal.key}
                  className="meal-card"
                >

                  <h3>
                    <span className="icon-container">
                      <FontAwesomeIcon icon={meal.icon} />
                    </span>

                    {meal.title}
                  </h3>

                  {mealFoods.map(food => (

                    <div
                      key={food._id}
                      className="food-item"
                    >

                      <span>{food.name}</span>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}
                      >

                        <span>
                          {food.calories} kcal
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() => deleteFood(food._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
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

export default Food;