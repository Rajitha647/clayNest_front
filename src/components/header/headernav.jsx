import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
=======
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
<<<<<<< HEAD
import logo from '../images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
=======
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from '../images/logo.png';
import './headernav.css';  // Import CSS for styling
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570

function Headernav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [slideIn, setSlideIn] = useState(false);
<<<<<<< HEAD
=======
  const [showAccountMenu, setShowAccountMenu] = useState(false);
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570

  const nav = useNavigate();

  const handleCart = () => nav("/cart");

  const handleLogout = () => {
<<<<<<< HEAD
    // localStorage.clear();
=======
    localStorage.clear();
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
    setIsLoggedIn(false);
    setUsername("");
    nav("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name || user.phoneOrEmail);
      setIsLoggedIn(true);
<<<<<<< HEAD
    } else {
      setIsLoggedIn(false);
    }

    setTimeout(() => {
      setSlideIn(true);
    }, 100);
  }, []);

  const headerStyle = {
    fontFamily: "serif",
    fontStyle: "italic",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    backgroundColor: "rgb(134, 15, 15)",
    color: "whitesmoke",
    padding: "10px",
  };

  return (
    <>
      <div style={headerStyle}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            transform: slideIn ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 1s ease-in-out",
          }}
        >
          <h4
            style={{
              fontSize: "25px",
              fontFamily: "serif",
              transform: slideIn ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 1s ease-in-out",
            }}
          >
            BIG SALE
          </h4>
          <p>Use code FIRST to Get Free Delivery on your First order</p>
          <span>
            <WhatsAppIcon /> 8606454877
          </span>
          <span className="ms-3">
=======
    }
    setSlideIn(true);
  }, []);

  return (
    <>
      {/* Top Header Section */}
      <div className="top-header">
        <div className={`top-header-content ${slideIn ? "slide-in" : ""}`}>
          <h4 className="sale-text">BIG SALE</h4>
          <p className="promo-text">Use code FIRST to Get Free Delivery on your First order</p>
          <span className="contact-info">
            <WhatsAppIcon /> 8606454877
          </span>
          <span className="contact-info">
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            <EmailIcon /> claynest@gmail.com
          </span>
        </div>
      </div>
<<<<<<< HEAD
      <Navbar expand="lg" style={{ backgroundColor: "hsl(0, 29.60%, 61.60%)" }}>
        <Container>
          <Navbar.Brand
            style={{ fontFamily: "cursive", fontSize: "25px", fontStyle: "italic" }}
          >
=======

      {/* Main Navbar */}
      <Navbar expand="lg" className="main-navbar">
        <Container>
          <Navbar.Brand>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            <img height={70} src={logo} alt="Company Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
<<<<<<< HEAD
            <Nav
              className="me-auto"
              style={{
                fontFamily: "serif",
                fontSize: "20px",
                fontStyle: "italic",
                color: "black",
              }}
            >
              <Nav.Link href="/home"><b>Home</b></Nav.Link>
              <Nav.Link href="/shop"><b>Shop</b></Nav.Link>
              <Nav.Link href="/kitchen"><b>Kitchenwares</b></Nav.Link>
              <Nav.Link href="/gifts"><b>Gifting/Decor</b></Nav.Link>
            </Nav>
            <Nav>
              <Button variant="button" onClick={()=>nav("/myorders")} className="me-2">
                <ShoppingCartIcon /> Cart
              </Button>
              <Button variant="button" onClick={handleCart} className="me-2">
                <ShoppingCartIcon /> Cart
              </Button>
              
                  <Button variant="button" onClick={handleLogout} className="me-2">
                    Logout<AccountCircleIcon fontSize='large'/>
                  </Button>
                
=======
            <Nav className="me-auto nav-links">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="/kitchen">Kitchenwares</Nav.Link>
              <Nav.Link href="/gifts">Gifting/Decor</Nav.Link>
            </Nav>
            <Nav className="nav-buttons">
              <Button variant="button" onClick={handleCart} className="me-2">
                <ShoppingCartIcon /> Cart
              </Button>
              {/* <Button variant="button" onClick={() => nav('/myorders')} className="me-2">
                <ShoppingBagIcon /> My Orders
              </Button> */}
              <Dropdown show={showAccountMenu} onToggle={setShowAccountMenu} align="end">
                <Dropdown.Toggle as={Button} variant="button" onClick={() => setShowAccountMenu(!showAccountMenu)} className="me-2">
                  <AccountCircleIcon fontSize="large" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/myorders">My Orders</Dropdown.Item>
                  <Dropdown.Divider /> */}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Headernav;
