import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Headernav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [slideIn, setSlideIn] = useState(false);

  const nav = useNavigate();

  const handleCart = () => nav("/cart");

  const handleLogout = () => {
    // localStorage.clear();
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
            <EmailIcon /> claynest@gmail.com
          </span>
        </div>
      </div>
      <Navbar expand="lg" style={{ backgroundColor: "hsl(0, 29.60%, 61.60%)" }}>
        <Container>
          <Navbar.Brand
            style={{ fontFamily: "cursive", fontSize: "25px", fontStyle: "italic" }}
          >
            <img height={70} src={logo} alt="Company Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Headernav;
