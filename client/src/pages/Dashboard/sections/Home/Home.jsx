import React from 'react'
import './Home.css'

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

  const weeklyData = [
    { day: "Mon", intake: 2200, burn: 400 },
    { day: "Tue", intake: 1900, burn: 350 },
    { day: "Wed", intake: 2500, burn: 500 },
    { day: "Thu", intake: 2100, burn: 450 },
    { day: "Fri", intake: 2300, burn: 600 },
    { day: "Sat", intake: 2800, burn: 700 },
    { day: "Sun", intake: 2000, burn: 300 },
  ];

  return (
    <div className='home-container'>
      <div className='title-section'>
        <h1>Welcome</h1>
        <h3>Hi there, Username</h3>
      </div>

      {/*limit section */}
      <div className='calorie-limit'>
        <div className='calorie-row'>

          <div className='row1'>
            <h3><span className='icon-container'><FontAwesomeIcon icon={faBurger} /></span> Calories Consumed</h3>
            <h4>Limit</h4>
          </div>

          <div className='row2'>
            <p>0</p>
            <p>2800</p>
          </div>

          <progress className='progress-bar gain' value="1120" max="2200" />
        </div>
        <div className='divider'></div>
        <div className='calorie-row'>

          <div className='row1'>
            <h3><span className='icon-container'><FontAwesomeIcon icon={faFire} /></span> Calories Burned</h3>
            <h4>Goal</h4>
          </div>

          <div className='row2'>
            <p>0</p>
            <p>475</p>
          </div>

          <progress className='progress-bar burn' value="50" max="475" />
        </div>
      </div>

      {/* activity time section */}

      <div className='Activity-container'>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faStopwatch} /></span> Active</h3>
          <p className='activity-content-header'>0</p>
          <p className='activity-content'>minutes today</p>
        </div>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faBicycle} /></span> Workout</h3>
          <p className='activity-content-header'>0</p>
          <p className='activity-content'>activities logged</p>
        </div>
      </div>

      {/**BMI and summary */}
      <div className='Activity-container'>

        <div className='Activity-time'>
          <h3 className='label'><span className="icon-container"><FontAwesomeIcon icon={faScaleBalanced} /></span> Body Metrics</h3>

          <div className='r'>
            <p className='rowp'>Weight</p>
            <p className='rowp'>78</p>
          </div>

          <div className='r'>
            <p className='rowp'>Height</p>
            <p className='rowp'>175</p>
          </div>
          <div className="divider"></div>

          <div className='r'>
            <h5>BMI</h5>
            <h5>22.5</h5>
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
            <p className='summary-contents'>0</p>
          </div>

          <div className="summary-divider"></div>

          <div className="r">
            <p className='summary-contents'>Total Calories</p>
            <p className='summary-contents'>0 kcal</p>
          </div>

          <div className="summary-divider"></div>

          <div className="r">
            <p className='summary-contents'>Active Time</p>
            <p className='summary-contents'>0 min</p>
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
