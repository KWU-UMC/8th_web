import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

interface ProtectedData {
  message: string;
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ProtectedData | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    axiosInstance
      .get<ProtectedData>("/protected/data")
      .then((res: { data: React.SetStateAction<ProtectedData | null> }) =>
        setData(res.data)
      )
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
