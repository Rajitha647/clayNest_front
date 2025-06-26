// Import necessary dependencies
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {


    const nav=useNavigate();

  const handleLogout = () => {
  nav("/adminlogin")
  };

  return (
    <Nav className="flex-column bg-light text-dark vh-100 p-3"  style={{ width:"max-content"}}>
        <Navbar><h2>Admin Dashboard</h2></Navbar>
        <Nav.Item className="mb-2">
        <Button 
          variant="outline-success" 
          className="w-100" 
          onClick={()=>{nav("/dashboard")}}
        >
          Dashboard
        </Button>
      </Nav.Item>
      <Nav.Item className="mb-2">
        <Button 
          variant="outline-success" 
          className="w-100" 
          onClick={()=>{nav("/add")}}
        >
          Add Products
        </Button>
      </Nav.Item>
      <Nav.Item className="mb-2">
        <Button 
          variant="outline-success" 
          className="w-100" 
          onClick={() =>{nav("/view")}}
        >
          View Products 
        </Button>
      </Nav.Item>
      <Nav.Item className="mt-auto">
        <Button 
          variant="success" 
          className="w-100" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Nav.Item>
    </Nav>
  );
}

export default AdminNavbar;
