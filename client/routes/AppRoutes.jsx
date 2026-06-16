import { Routes, Route } from "react-router-dom";

import Auth from "../src/pages/Auth/Auth";
import GoalSetup from "../src/pages/GoalSetup/GoalSetup";
import Dashboard from "../src/pages/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/setup-goal" element={<GoalSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;