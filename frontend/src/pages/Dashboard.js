import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ManagerDashboard from "./ManagerDashboard";
import EngineerDashboard from "./EngineerDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;
  if (user.role === "manager") return <ManagerDashboard />;
  if (user.role === "engineer") return <EngineerDashboard />;
  return <div>Unknown role</div>;
};

export default Dashboard;
