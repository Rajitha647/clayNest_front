import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          axios.get("http://localhost:9000/user/totaluser"),
          axios.get("http://localhost:9000/products/totalproduct"),
          axios.get("http://localhost:9000/order/totalorder"),
        ]);
  
        console.log('Users:', usersResponse.data);
        console.log('Products:', productsResponse.data);
        console.log('Orders:', ordersResponse.data);
  
        setTotalUsers(usersResponse.data.total);
        setTotalProducts(productsResponse.data.total);
        setTotalOrders(ordersResponse.data.total);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
  
    fetchDashboardData();
  }, []);
  

  const hideScrollbarStyles = {
    scrollbarWidth: "none", // Firefox specific
    msOverflowStyle: "none", // IE specific
    WebkitOverflowScrolling: "touch", // Smooth scrolling for mobile
    overflowY: "scroll", // Ensure scrollability
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
     <AdminNavbar/>
      <div
        style={{
          padding: "20px",
          width: "calc(100% - 250px)", // Take remaining width
          overflowY: "auto", // Scrollable content
          backgroundColor: "#f4f4f4", // Light background color
        }}
      >
        {/* Dashboard Metrics Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "30px",
          }}
        >
          {/* Total Users Card */}
          <div
            style={{
              backgroundColor: "#28a745", // Green color for all cards
              padding: "20px",
              borderRadius: "10px",
              color: "#fff",
              width: "30%",
              textAlign: "center",
            }}
          >
            <h3>Total Users</h3>
            <p style={{ fontSize: "2rem" }}>{totalUsers}</p>
          </div>

          {/* Total Products Card */}
          <div
            style={{
              backgroundColor: "#28a745", // Green color for all cards
              padding: "20px",
              borderRadius: "10px",
              color: "#fff",
              width: "30%",
              textAlign: "center",
            }}
          >
            <h3>Total Products</h3>
            <p style={{ fontSize: "2rem" }}>{totalProducts}</p>
          </div>

          {/* Total Orders Card */}
          <div
            style={{
              backgroundColor: "#28a745", // Green color for all cards
              padding: "20px",
              borderRadius: "10px",
              color: "#fff",
              width: "30%",
              textAlign: "center",
            }}
          >
            <h3>Total Orders</h3>
            <p style={{ fontSize: "2rem" }}>{totalOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
