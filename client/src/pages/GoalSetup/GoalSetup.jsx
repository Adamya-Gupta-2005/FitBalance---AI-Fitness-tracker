import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './GoalSetup.css';
import Header from '../../components/Header/Header';
import { toast } from 'react-toastify';

const GoalSetup = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [goalData, setGoalData] = useState({
        age: "",
        weight: "",
        height: "",
        goal: "",
        calorieTarget: 0,
        burnTarget: 0
    });

    const selectGoal = (goal) => {
        if (goal === 'lose') {
            setGoalData({
                ...goalData,
                goal,
                calorieTarget: 1800,
                burnTarget: 400,
            })
        }

        if (goal === "maintain") {
            setGoalData({
                ...goalData,
                goal,
                calorieTarget: 2200,
                burnTarget: 300,
            });
        }

        if (goal === "gain") {
            setGoalData({
                ...goalData,
                goal,
                calorieTarget: 2800,
                burnTarget: 200,
            });
        };
    }

    const handleFinish = () => {
        console.log(goalData);

        navigate('/dashboard')
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
                                <div className='sep-container'>
                                    <div className='seperator active'></div>
                                    <div className='seperator'></div>
                                    <div className='seperator'></div>
                                </div>
                                <h2>How Old Are You?</h2>
                                <p>Enter your age</p>
                                <input className='txtInp' type="text" inputMode="numeric" pattern="[0-9]*" required placeholder='Age' value={goalData.age} onChange={(e) => {
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
                                        toast.error("Enter a valid Age (1 - 85)years")
                                        return;
                                    }

                                    setGoalData({
                                        ...goalData,
                                        age: value
                                    });

                                }} />

                                <button className='continue' onClick={() => setStep(2)}>Continue</button>
                            </>
                        )
                    }

                    {/* Step 2 */}
                    {
                        step === 2 && (
                            <>
                                <div className='sep-container'>
                                    <div className='seperator active'></div>
                                    <div className='seperator active'></div>
                                    <div className='seperator'></div>
                                </div>
                                <h2>Your Measurement</h2>
                                <p>Enter your body weight (kg)</p>
                                <input
                                    className='txtInp'
                                    type="text" inputmode="numeric" pattern="[0-9]*"
                                    placeholder="Weight (kg)"
                                    value={goalData.weight}
                                    onChange={(e) => {
                                        {
                                            const value = e.target.value;

                                            if (value === "") {
                                                setGoalData({
                                                    ...goalData,
                                                    weight: "",
                                                });
                                                return;
                                            }

                                            const weight = Number(value);

                                            if (isNaN(weight) || weight < 1 || weight > 300) {
                                                toast.error("Weight should be greater than 0 less than 300 kg");
                                                return;
                                            }

                                            setGoalData({
                                                ...goalData,
                                                weight: value,
                                            });
                                        }
                                    }
                                    }
                                />

                                <p>Enter your height (cm)</p>
                                <input
                                    className='txtInp'
                                    type="text" inputmode="numeric" pattern="[0-9]*"
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

                                        if (isNaN(height) || height < 1 || height > 250) {
                                            toast.error("Height should be between 1 and 250 cm");
                                            return;
                                        }

                                        setGoalData({
                                            ...goalData,
                                            height: value,
                                        });
                                    }}
                                />

                                <button className='continue' onClick={() => setStep(3)}>
                                    Continue
                                </button>
                            </>
                        )
                    }

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <div className='sep-container'>
                                <div className='seperator active'></div>
                                <div className='seperator active'></div>
                                <div className='seperator active'></div>
                            </div>
                            <h2>Select Your Goal</h2>

                            <div className="goal-options">
                                <button
                                    className={goalData.goal === "lose" ? "select" : ""}
                                    onClick={() => selectGoal("lose")}
                                >
                                    Lose Weight
                                </button>

                                <button
                                    className={goalData.goal === "maintain" ? "select" : ""}
                                    onClick={() => selectGoal("maintain")}
                                >
                                    Maintain
                                </button>

                                <button
                                    className={goalData.goal === "gain" ? "select" : ""}
                                    onClick={() => selectGoal("gain")}
                                >
                                    Gain Weight
                                </button>

                            </div>

                            <div className="slider-box">
                                <label>
                                    <span>Daily Calorie Intake:</span>
                                    {" "}
                                    {goalData.calorieTarget} kcal
                                </label>

                                <input
                                    className='slider'
                                    type="range"
                                    min="1500"
                                    max="3500"
                                    value={goalData.calorieTarget}
                                    onChange={(e) =>
                                        setGoalData({
                                            ...goalData,
                                            calorieTarget: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div className="slider-box">
                                <label>
                                    <span>Daily Burn Target:</span>
                                    {" "}
                                    {goalData.burnTarget} kcal
                                </label>

                                <input
                                    className='slider'
                                    type="range"
                                    min="100"
                                    max="1000"
                                    value={goalData.burnTarget}
                                    onChange={(e) =>
                                        setGoalData({
                                            ...goalData,
                                            burnTarget: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <button className='continue' onClick={handleFinish}>
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
