import React, { useState } from 'react'
import './Food.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus, faFile,faMugHot,faSun,faMoon, faCookieBite
} from "@fortawesome/free-solid-svg-icons";

import { toast } from 'react-toastify';



const Food = () => {


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

  const [activePannel, setActivePannel] = useState(null);

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
      toast.error("Fill all details")
      return;
    }

    const newFood = {
      name: foodData.foodName,
      calories: Number(foodData.calories)
    };

    setFoodItems((prev) => ({
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

    setActivePannel(null);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className='food-container'>

      <div className='food-header'>
          <h1>Food Tracker</h1>
          <h3>Track you calorie intake here</h3>
        </div>

      <div className='section-divider'>

        <div className="food-actions">
          {activePannel === null && (
            <div className='action-buttons'>
              <button className='food-action-btn' onClick={() => setActivePannel('add')}> <span><FontAwesomeIcon icon={faPlus} className='i' /></span>
                Add Food Entry
              </button>

              <button className="food-action-btn" onClick={() => setActivePannel("ai")}> <span></span>
                AI Food Snap
              </button>
            </div>
          )}

          {activePannel === "add" && (
            <div className="food-form">

              <h2>New Food Entry</h2>

              <label className='form-header'>Food Name </label>
              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                className="form-inp"
                value={foodData.foodName}
                onChange={handleChange}
              />

              <label className='form-header'>Calories</label>
              <input
                type="number"
                name="calories"
                placeholder="Calories"
                className="form-inp"
                value={foodData.calories}
                onChange={handleChange}
              />

              <label className='form-header'>Meal Type </label>
              <select className="form-inp"
                name="mealType"
                value={foodData.mealType}
                onChange={handleChange}>
                <option value="">Select meal type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snack">Snack</option>
                <option value="dinner">Dinner</option>
              </select>



              <div className='form-btns'>
                <button
                  className="back-btn btn"
                  onClick={() => setActivePannel(null)}
                >
                  Back
                </button>
                <button onClick={addFood} className="save-btn btn">
                  Add Entry
                </button>

              </div>

            </div>
          )}


          {activePannel === "ai" && (
            <div className="food-form">

              <h3>AI Food Snap</h3>

              <label className="upload-label" htmlFor="file-inp">
                <span><FontAwesomeIcon icon={faFile} className='i' /></span>{selectedFile ? selectedFile.name : "Choose a file"}
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
                  onClick={() => setActivePannel(null)}
                >
                  Back
                </button>

                <button className="save-btn btn" onClick={() => setSelectedFile(null)}>
                  Analyze Food
                </button>
              </div>
            </div>
          )}


        </div>

        {/**Right section for food */}

        <div className="food-log-section">

          <div className="meal-card">
            <h3><span className="icon-container"><FontAwesomeIcon icon={faMugHot} /></span>Breakfast</h3>

            {foodItems.breakfast.length === 0 ? (
              <p className="empty-text">No foods added</p>
            ) : (
              foodItems.breakfast.map((item, index) => (
                <div key={index} className="food-item">
                  <span>{item.name}</span>
                  <span>{item.calories} kcal</span>
                </div>
              ))
            )}
          </div>

          <div className="meal-card">
            <h3><span className="icon-container"><FontAwesomeIcon icon={faSun} /></span>Lunch</h3>

            {foodItems.lunch.length === 0 ? (
              <p className="empty-text">No foods added</p>
            ) : (
              foodItems.lunch.map((item, index) => (
                <div key={index} className="food-item">
                  <span>{item.name}</span>
                  <span>{item.calories} kcal</span>
                </div>
              ))
            )}
          </div>

          <div className="meal-card">
            <h3><span className="icon-container"><FontAwesomeIcon icon={faCookieBite} /></span> Snack</h3>

            {foodItems.snack.length === 0 ? (
              <p className="empty-text">No foods added</p>
            ) : (
              foodItems.snack.map((item, index) => (
                <div key={index} className="food-item">
                  <span>{item.name}</span>
                  <span>{item.calories} kcal</span>
                </div>
              ))
            )}
          </div>

          <div className="meal-card">
            <h3><span className="icon-container"><FontAwesomeIcon icon={faMoon} /></span> Dinner</h3>

            {foodItems.dinner.length === 0 ? (
              <p className="empty-text">No foods added</p>
            ) : (
              foodItems.dinner.map((item, index) => (
                <div key={index} className="food-item">
                  <span>{item.name}</span>
                  <span>{item.calories} kcal</span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Food
