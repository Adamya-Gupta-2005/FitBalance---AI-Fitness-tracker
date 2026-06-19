import { Routes, Route } from "react-router-dom";

import Auth from "../src/pages/Auth/Auth";
import GoalSetup from "../src/pages/GoalSetup/GoalSetup";
import Dashboard from "../src/pages/Dashboard/Dashboard";

import ProtectedRoute from "./protectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Auth />
        </ProtectedRoute>
        } />
      <Route path="/goal-setup" element={
        <ProtectedRoute>
          <GoalSetup />
        </ProtectedRoute>
        } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;