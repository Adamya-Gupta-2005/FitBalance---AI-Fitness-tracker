import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './GoalSetup.css';
import Header from '../../components/Header/Header';
import { toast } from 'react-toastify';

import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faScaleBalanced,
    faWeightScale
} from "@fortawesome/free-solid-svg-icons";

const GoalSetup = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const [goalData, setGoalData] = useState({
        age: "",
        weight: "",
        height: "",
        goal: "",
        dailyCalorieIntake: 0,
        dailyCalorieBurn: 0
    });

    const selectGoal = (goal) => {
        setGoalData((prev) => {
            const updated = {
                ...prev,
                goal,
            };

            if (goal === "lose") {
                updated.dailyCalorieIntake = 1800;
                updated.dailyCalorieBurn = 400;
            }

            if (goal === "maintain") {
                updated.dailyCalorieIntake = 2200;
                updated.dailyCalorieBurn = 300;
            }

            if (goal === "gain") {
                updated.dailyCalorieIntake = 2800;
                updated.dailyCalorieBurn = 200;
            }

            return updated;
        });
    };


    const handleFinish = async () => {
        if (
            !goalData.age || !goalData.weight ||
            !goalData.height || !goalData.goal
        ) {
            toast.error("Complete all fields");
            return;
        }

        try {

            const { data } = await axios.put(
                `${backendUrl}/api/user/goal-setup`,
                {
                    age: Number(goalData.age),
                    weight: Number(goalData.weight),
                    height: Number(goalData.height),
                    goal: goalData.goal,
                    dailyCalorieIntake: Number(goalData.dailyCalorieIntake),
                    dailyCalorieBurn: Number(goalData.dailyCalorieBurn)
                },
                {
                    withCredentials: true
                }
            );

            if (data.success) {
                toast.success("Profile setup complete")
                navigate('/dashboard');
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };

    return (
        <>
            <Header />
            <div className='goal-container'>
                <div className='goal-card'>
                    <div className='progress'>
                        Step {step} of 3
                    </div>

                    {/* Step 1 */}
                    {
                        step === 1 && (
                            <>
                                <div className='goal-sep-container'>
                                    <div className='goal-separator goal-active'></div>
                                    <div className='goal-separator'></div>
                                    <div className='goal-separator'></div>
                                </div>

                                <h2 className='goal-title'>How Old Are You?</h2>

                                <p className='goal-text'>Enter your age</p>

                                <input
                                    className='goal-input'
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder='Age'
                                    required
                                    value={goalData.age}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "") {
                                            setGoalData({
                                                ...goalData,
                                                age: ""
                                            });
                                            return;
                                        }

                                        const age = Number(value);

                                        if (isNaN(age) || age < 1 || age > 85) {
                                            toast.error("Enter a valid age (1 - 85 years)");
                                            return;
                                        }

                                        setGoalData({
                                            ...goalData,
                                            age: value
                                        });
                                    }}
                                />

                                <button
                                    className='goal-continue-btn'
                                    onClick={() => {
                                        if (!goalData.age) {
                                            toast.error("Please enter your age.");
                                            return;
                                        }
                                        setStep(2)
                                    }}
                                >
                                    Continue
                                </button>
                            </>
                        )
                    }

                    {/* Step 2 */}
                    {
                        step === 2 && (
                            <>
                                <div className='goal-sep-container'>
                                    <div className='goal-separator goal-active'></div>
                                    <div className='goal-separator goal-active'></div>
                                    <div className='goal-separator'></div>
                                </div>

                                <h2 className='goal-title'>Your Measurements</h2>

                                <p className='goal-text'>Enter your body weight (kg)</p>

                                <input
                                    className='goal-input'
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Weight (kg)"
                                    required
                                    value={goalData.weight}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "") {
                                            setGoalData({
                                                ...goalData,
                                                weight: "",
                                            });
                                            return;
                                        }

                                        const weight = Number(value);

                                        if (
                                            isNaN(weight) ||
                                            weight < 1 ||
                                            weight > 300
                                        ) {
                                            toast.error(
                                                "Weight should be between 1 and 300 kg"
                                            );
                                            return;
                                        }

                                        setGoalData({
                                            ...goalData,
                                            weight: value,
                                        });
                                    }}
                                />

                                <p className='goal-text'>Enter your height (cm)</p>

                                <input
                                    className='goal-input'
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    required
                                    placeholder="Height (cm)"
                                    value={goalData.height}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "") {
                                            setGoalData({
                                                ...goalData,
                                                height: "",
                                            });
                                            return;
                                        }

                                        const height = Number(value);

                                        if (
                                            isNaN(height) ||
                                            height < 1 ||
                                            height > 250
                                        ) {
                                            toast.error(
                                                "Height should be between 1 and 250 cm"
                                            );
                                            return;
                                        }

                                        setGoalData({
                                            ...goalData,
                                            height: value,
                                        });
                                    }}
                                />

                                <button
                                    className='goal-continue-btn'
                                    onClick={() => {
                                        if (!goalData.weight || !goalData.height) {
                                            toast.error("Please enter all details");
                                            return;
                                        }
                                        setStep(3)
                                    }}
                                >
                                    Continue
                                </button>
                            </>
                        )
                    }

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <div className='goal-sep-container'>
                                <div className='goal-separator goal-active'></div>
                                <div className='goal-separator goal-active'></div>
                                <div className='goal-separator goal-active'></div>
                            </div>

                            <h2 className='goal-title'>Select Your Goal</h2>

                            <div className="goal-options">
                                <button
                                    className={
                                        goalData.goal === "lose"
                                            ? "goal-btn goal-selected"
                                            : "goal-btn"
                                    }
                                    onClick={() => selectGoal("lose")}
                                > <FontAwesomeIcon className='i' icon={faFire} />
                                    Lose Weight
                                </button>

                                <button
                                    className={
                                        goalData.goal === "maintain"
                                            ? "goal-btn goal-selected"
                                            : "goal-btn"
                                    }
                                    onClick={() => selectGoal("maintain")}
                                >   <FontAwesomeIcon className='i' icon={faScaleBalanced} />
                                    Maintain Weight
                                </button>

                                <button
                                    className={
                                        goalData.goal === "gain"
                                            ? "goal-btn goal-selected"
                                            : "goal-btn"
                                    }
                                    onClick={() => selectGoal("gain")}
                                >   <FontAwesomeIcon className='i' icon={faWeightScale} />
                                    Gain Muscle
                                </button>
                            </div>

                            <div className="goal-slider-box">
                                <label>
                                    <span className="goal-label">
                                        Daily Calorie Intake:
                                    </span>{" "}
                                    {goalData.dailyCalorieIntake} kcal
                                </label>

                                <input
                                    className="goal-slider"
                                    type="range"
                                    min="1500"
                                    max="3500"
                                    value={goalData.dailyCalorieIntake}
                                    onChange={(e) =>
                                        setGoalData({
                                            ...goalData,
                                            dailyCalorieIntake: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div className="goal-slider-box">
                                <label>
                                    <span className="goal-label">
                                        Daily Burn Target:
                                    </span>{" "}
                                    {goalData.dailyCalorieBurn} kcal
                                </label>

                                <input
                                    className="goal-slider"
                                    type="range"
                                    min="100"
                                    max="2500"
                                    value={goalData.dailyCalorieBurn}
                                    onChange={(e) =>
                                        setGoalData({
                                            ...goalData,
                                            dailyCalorieBurn: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <button
                                className="goal-continue-btn"
                                onClick={handleFinish}
                            >
                                Start Tracking
                            </button>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default GoalSetup;
