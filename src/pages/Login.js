import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/portal");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
