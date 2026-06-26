import React, { useEffect, useState } from 'react'
import './Home.css'

import axios from 'axios';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger, faFire, faStopwatch, faBicycle, faScaleBalanced, faClipboardList
} from "@fortawesome/free-solid-svg-icons";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const Home = () => {

  const [user, setUser] = useState(null);
  const backendUrl = "http://localhost:5000";

  const [stats, setStats] = useState({
    totalCalories: 0,
    mealsLogged: 0
  });

  const [activityStats, setActivityStats] = useState({
    totalBurned: 0,
    totalMinutes: 0,
    workoutsLogged: 0
  });

  const [weeklyData, setWeeklyData] = useState([]);

  const fetchUser = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/user/profile`,
        {
          withCredentials: true
        });

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    error.message
);
    }
  };

  const fetchDashboard = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/food/dashboard`,
        {
          withCredentials: true
        }
      );

      if (data.success) {
        setStats({
          totalCalories: data.totalCalories,
          mealsLogged: data.mealsLogged
        });
      }

    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    error.message
);
    }
  };

  const fetchActivityDashboard = async () => {

    try {
      const { data } = await axios.get(`${backendUrl}/api/activity/dashboard`,
        {
          withCredentials: true
        }
      );

      if (data.success) {

        setActivityStats({
          totalBurned: data.totalBurned,
          totalMinutes: data.totalMinutes,
          workoutsLogged: data.workoutsLogged
        });

      }

    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    error.message
);
    }
  }

  const fetchWeeklyStats = async () => {

    try {
      const {data} = await axios.get(`${backendUrl}/api/dashboard/weekly`,
        {
          withCredentials: true
        }
      );

      if(data.success) {
        setWeeklyData(data.weeklyData);
      }

    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    error.message
);
    }
  };


  useEffect(() => {
    fetchUser();
    fetchDashboard();
    fetchActivityDashboard();
    fetchWeeklyStats();
  }, []);

  const bmi = user?.weight && user?.height ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1) : 0;

  return (
    <div className='home-container'>
      <div className='title-section'>
        <h1>Welcome</h1>
        <h3>Hi there, {user?.username || "User"}</h3>
      </div>

      {/*limit section */}
      <div className='calorie-limit'>
        <div className='calorie-row'>

          <div className='row1'>
            <h3><span className='icon-container'><FontAwesomeIcon icon={faBurger} /></span> Calories Consumed</h3>
            <h4>Limit</h4>
          </div>

          <div className='row2'>
            <p>{stats.totalCalories}</p>
            <p>{user?.dailyCalorieIntake || 2800}</p>
          </div>

          <progress className='progress-bar gain' value={stats.totalCalories} max={user?.dailyCalorieIntake || 2800} />
        </div>
        <div className='divider'></div>
        <div className='calorie-row'>

          <div className='row1'>
            <h3><span className='icon-container'><FontAwesomeIcon icon={faFire} /></span> Calories Burned</h3>
            <h4>Goal</h4>
          </div>

          <div className='row2'>
            <p>{activityStats.totalBurned}</p>
            <p>{user?.dailyCalorieBurn || 2500}</p>
          </div>

          <progress className='progress-bar burn' value={activityStats.totalBurned} max={user?.dailyCalorieBurn || 2500} />
        </div>
      </div>

      {/* activity time section */}

      <div className='Activity-container'>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faStopwatch} /></span> Active</h3>
          <p className='activity-content-header'>{activityStats.totalMinutes}</p>
          <p className='activity-content'>minutes today</p>
        </div>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faBicycle} /></span> Workout</h3>
          <p className='activity-content-header'>{activityStats.workoutsLogged}</p>
          <p className='activity-content'>activities logged</p>
        </div>
      </div>

      {/**BMI and summary */}
      <div className='Activity-container'>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faScaleBalanced} /></span> Body Metrics</h3>

          <div className='r'>
            <p className='rowp'>Weight</p>
            <p className='rowp'>{user?.weight} kg</p>
          </div>

          <div className='r'>
            <p className='rowp'>Height</p>
            <p className='rowp'>{user?.height} cm</p>
          </div>
          <div className="divider"></div>

          <div className='r'>
            <h5>BMI</h5>
            <h5>{bmi}</h5>
          </div>

          <div className="meter-scale"></div>
          <div className='meter-scale-content'>
            <p>18.5</p>
            <p>25</p>
            <p>30</p>
          </div>
        </div>

        <div className='Activity-time'>
          <h3 className='label summary'><span className="icon-container"><FontAwesomeIcon icon={faClipboardList} /></span> Today's Summary</h3>

          <div className="r">
            <p className='summary-contents'>Meals Logged</p>
            <p className='summary-contents'>{stats.mealsLogged}</p>
          </div>

          <div className="summary-divider"></div>

          <div className="r">
            <p className='summary-contents'>Total Calories</p>
            <p className='summary-contents'>{stats.totalCalories} kcal</p>
          </div>

          <div className="summary-divider"></div>

          <div className="r">
            <p className='summary-contents'>Active Time</p>
            <p className='summary-contents'>{activityStats.totalMinutes} min</p>
          </div>
        </div>
      </div>

      <div className="graph-card">
        <h3 className="graph-title">
          Weekly Progress
        </h3>

        <ResponsiveContainer width="100%" height={320} >
          <BarChart
            data={weeklyData}
            barGap={5}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10
            }}
          >
            <CartesianGrid
              stroke="#555"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#6f6f6f"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12
              }}
            />

            <YAxis
              stroke="#6f6f6f"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 10
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(198, 193, 209, 0.15)"
              }}
              contentStyle={{
                background: "#403f3f",
                border: "1px solid #6f6f6f",
                borderRadius: "12px",
                color: "white"
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#d1d1d1",
                paddingTop: "10px"
              }}
            />

            <Bar
              dataKey="intake"
              name="Intake"
              fill="#b73c3c"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />

            <Bar
              dataKey="burn"
              name="Burned"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}

export default Home
