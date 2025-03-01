import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Attempting login with:", username, password);

    if (username === "admin" && password === "admin@123") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please use Username: admin, Password: admin@123.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#ffffff",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "90%",
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "90%",
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <Button
      variant="success"
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login
      </Button>
    </div>
  );
}

export default AdminLogin;
