import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./routes/ProtectedRoutes";

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
    </Route>
  </Routes>
);

export default App;
