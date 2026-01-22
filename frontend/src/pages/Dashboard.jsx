import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/protected/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        toast.error("Session expired");
        navigate("/", { replace: true });
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    toast.info("Logged out successfully 👋");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard 🔐</h1>

        {user ? (
          <div className="user-info">
            <p>
              <span>Name:</span> {user.name}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p className="loading">Loading user data...</p>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
