import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const now = new Date().toISOString();
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(a => a.appointmentDate > now).length;
  const totalRevenue = appointments.reduce((sum, a) => sum + Number(a.cost || 0), 0);
  const completed = appointments.filter(a => a.status === "Completed").length;
  const pending = appointments.filter(a => a.status === "Pending").length;

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  const handleExport = () => {
    const data = {
      patients: JSON.parse(localStorage.getItem("patients") || "[]"),
      appointments: JSON.parse(localStorage.getItem("appointments") || "[]"),
      users: JSON.parse(localStorage.getItem("users") || "[]"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dental-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.patients && data.appointments && data.users) {
          localStorage.setItem("patients", JSON.stringify(data.patients));
          localStorage.setItem("appointments", JSON.stringify(data.appointments));
          localStorage.setItem("users", JSON.stringify(data.users));
          alert("✅ Import successful! Refreshing...");
          window.location.reload();
        } else {
          alert("❌ Invalid file structure.");
        }
      } catch (err) {
        alert("❌ Failed to read file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: 20 }}>📊 Admin Dashboard</h1>

      {/* Navigation */}
      <div style={navContainer}>
        <button onClick={() => navigate("/patients")} style={navBtnStyle}>👥 Patients</button>
        <button onClick={() => navigate("/appointments")} style={navBtnStyle}>🗓 Appointments</button>
        <button onClick={() => navigate("/calendar")} style={navBtnStyle}>📅 Calendar</button>
        <button onClick={handleLogout} style={{ ...navBtnStyle, backgroundColor: "#f44336" }}>🚪 Logout</button>
      </div>

      {/* KPIs */}
      <div style={kpiContainer}>
        <div style={kpiCard}>📁 <strong>Total Appointments:</strong><br /> {totalAppointments}</div>
        <div style={kpiCard}>🟢 <strong>Upcoming:</strong><br /> {upcomingAppointments}</div>
        <div style={kpiCard}>💰 <strong>Total Revenue:</strong><br /> ₹{totalRevenue}</div>
        <div style={kpiCard}>✅ Completed: {completed}<br />🕒 Pending: {pending}</div>
      </div>

      {/* Backup / Restore */}
      <div style={{ marginTop: 40 }}>
        <h3>📦 Backup & Restore</h3>
        <div style={navContainer}>
          <button onClick={handleExport} style={exportBtnStyle}>⬇ Export (.json)</button>
          <label style={importBtnStyle}>
            ⬆ Import
            <input type="file" accept=".json" onChange={handleImport} hidden />
          </label>
        </div>
      </div>
    </div>
  );
};

// 🖌️ Styling
const pageStyle = {
  padding: "30px",
  fontFamily: "Arial, sans-serif",
  color: "#333"
};

const navContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px"
};

const navBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px"
};

const kpiContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "20px"
};

const kpiCard = {
  backgroundColor: "#e3f2fd",
  padding: "20px",
  borderRadius: "8px",
  width: "220px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  fontSize: "16px",
  textAlign: "center"
};

const exportBtnStyle = {
  ...navBtnStyle,
  backgroundColor: "#4caf50"
};

const importBtnStyle = {
  ...navBtnStyle,
  backgroundColor: "#ff9800"
};

export default Dashboard;
