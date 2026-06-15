import { Routes, Route } from "react-router-dom";

import Auth from "../src/pages/Auth/Auth";
import GoalSetup from "../src/pages/GoalSetup/GoalSetup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/setup-goal" element={<GoalSetup />} />
    </Routes>
  );
};

export default AppRoutes;