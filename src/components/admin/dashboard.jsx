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
          axios.get("https://claynest-back.onrender.com/user/totaluser"),
          axios.get("https://claynest-back.onrender.com/products/totalproduct"),
          axios.get("https://claynest-back.onrender.com/order/totalorder"),
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
    scrollbarWidth: "none", 
    msOverflowStyle: "none", 
    WebkitOverflowScrolling: "touch", 
    overflowY: "scroll", 
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
     <AdminNavbar/>
      <div
        style={{
          padding: "20px",
          width: "calc(100% - 250px)", 
          overflowY: "auto",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#28a745", 
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

          <div
            style={{
              backgroundColor: "#28a745", 
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

          <div
            style={{
              backgroundColor: "#28a745",
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
