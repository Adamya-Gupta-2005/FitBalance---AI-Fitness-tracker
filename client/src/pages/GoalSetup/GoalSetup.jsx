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
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const [goalData, setGoalData] = useState({
        age: "",
        weight: "",
        height: "",
        goal: "",
        dailyCalorieIntake: 2000,
        dailyCalorieBurn: 300
    });

    const selectGoal = (selectedGoal) => {
        if (selectedGoal === 'lose') {
            setGoalData(prev => ({
                ...prev,
                goal: selectedGoal,
                dailyCalorieIntake: 1800,
                dailyCalorieBurn: 400,
            }));
        }
        if (selectedGoal === "maintain") {
            setGoalData(prev => ({
                ...prev,
                goal: selectedGoal,
                dailyCalorieIntake: 2200,
                dailyCalorieBurn: 300,
            }));
        }
        if (selectedGoal === "gain") {
            setGoalData(prev => ({
                ...prev,
                goal: selectedGoal,
                dailyCalorieIntake: 2800,
                dailyCalorieBurn: 200,
            }));
        }
    };

    const nextStep = () => {
        if (step === 1) {
            const ageNum = Number(goalData.age);
            if (!goalData.age || isNaN(ageNum) || ageNum < 1 || ageNum > 85) {
                toast.error("Please enter a valid age (1 - 85 years)");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            const weightNum = Number(goalData.weight);
            const heightNum = Number(goalData.height);
            if (!goalData.weight || isNaN(weightNum) || weightNum < 1 || weightNum > 300) {
                toast.error("Weight should be between 1 and 300 kg");
                return;
            }
            if (!goalData.height || isNaN(heightNum) || heightNum < 1 || heightNum > 250) {
                toast.error("Height should be between 1 and 250 cm");
                return;
            }
            setStep(3);
        }
    };

    const handleFinish = async () => {
        const agePayload = Number(goalData.age);
        const weightPayload = Number(goalData.weight);
        const heightPayload = Number(goalData.height);
        const goalPayload = goalData.goal;

        if (!agePayload || !weightPayload || !heightPayload || !goalPayload) {
            toast.error("Complete all fields and select a goal");
            return;
        }

        try {
            const { data } = await axios.put(
                `${backendUrl}/api/user/goal-setup`,
                {
                    age: agePayload,
                    weight: weightPayload,
                    height: heightPayload,
                    goal: goalPayload,
                    dailyCalorieIntake: Number(goalData.dailyCalorieIntake),
                    dailyCalorieBurn: Number(goalData.dailyCalorieBurn)
                },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success("Profile setup complete");
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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

                    {step === 1 && (
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
                                onChange={(e) => setGoalData({ ...goalData, age: e.target.value })}
                            />
                            <button className='goal-continue-btn' onClick={nextStep}>
                                Continue
                            </button>
                        </>
                    )}

                    {step === 2 && (
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
                                onChange={(e) => setGoalData({ ...goalData, weight: e.target.value })}
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
                                onChange={(e) => setGoalData({ ...goalData, height: e.target.value })}
                            />
                            <button className='goal-continue-btn' onClick={nextStep}>
                                Continue
                            </button>
                        </>
                    )}

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
                                    className={goalData.goal === "lose" ? "goal-btn goal-selected" : "goal-btn"}
                                    onClick={() => selectGoal("lose")}
                                >
                                    <FontAwesomeIcon icon={faFire} /> Lose Weight
                                </button>
                                <button
                                    className={goalData.goal === "maintain" ? "goal-btn goal-selected" : "goal-btn"}
                                    onClick={() => selectGoal("maintain")}
                                >
                                    <FontAwesomeIcon icon={faScaleBalanced} /> Maintain Weight
                                </button>
                                <button
                                    className={goalData.goal === "gain" ? "goal-btn goal-selected" : "goal-btn"}
                                    onClick={() => selectGoal("gain")}
                                >
                                    <FontAwesomeIcon icon={faWeightScale} /> Gain Muscle
                                </button>
                            </div>

                            <div className="goal-slider-box">
                                <label>
                                    <span className="goal-label">Daily Calorie Intake:</span> {goalData.dailyCalorieIntake} kcal
                                </label>
                                <input
                                    className="goal-slider"
                                    type="range"
                                    min="1500"
                                    max="3500"
                                    value={goalData.dailyCalorieIntake}
                                    onChange={(e) => setGoalData({ ...goalData, dailyCalorieIntake: Number(e.target.value) })}
                                />
                            </div>

                            <div className="goal-slider-box">
                                <label>
                                    <span className="goal-label">Daily Burn Target:</span> {goalData.dailyCalorieBurn} kcal
                                </label>
                                <input
                                    className="goal-slider"
                                    type="range"
                                    min="100"
                                    max="2500"
                                    value={goalData.dailyCalorieBurn}
                                    onChange={(e) => setGoalData({ ...goalData, dailyCalorieBurn: Number(e.target.value) })}
                                />
                            </div>

                            <button className="goal-continue-btn" onClick={handleFinish}>
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