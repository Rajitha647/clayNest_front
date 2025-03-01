import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import logo from '../images/logo.png';
import './headernav.css';  // Import CSS for styling

function Headernav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [slideIn, setSlideIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const nav = useNavigate();

  const handleCart = () => nav("/cart");

  const handleLogout = () => {
    localStorage.clear();
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
            <EmailIcon /> claynest@gmail.com
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" className="main-navbar">
        <Container>
          <Navbar.Brand>
            <img height={70} src={logo} alt="Company Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Headernav;
