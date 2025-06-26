import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './aboutus.css'; 
import profile from './images/company1.jpg'
import { useNavigate } from 'react-router-dom';

function AboutUs(){
 const nav=useNavigate()
  return (
    <Container className="about-us">
      <Row className="about-intro">
        <Col xs={12} md={6} className="about-content">
        <h2>Our Mission</h2>
          <p>
            Our mission is to create meaningful, sustainable, and high-quality products that tell a story. We are committed to promoting artisans, preserving traditional methods, and connecting people with authentic handmade pieces.
          </p>
          <h2>Get In Touch</h2>
          <p>
            We would love to hear from you! Whether you have questions, suggestions, or just want to chat, feel free to reach out to us.
          </p>
          <Button variant="warning" onClick={()=>nav("/contact")}>
            Contact Us
          </Button>
        </Col>
        <Col xs={12} md={6} className="about-image">
          <Image src={profile} width={2000} alt="About Us Image" fluid />
        </Col>
      </Row>
<hr/>
      {/* <Row className="about-mission">
        <Col xs={12}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to create meaningful, sustainable, and high-quality products that tell a story. We are committed to promoting artisans, preserving traditional methods, and connecting people with authentic handmade pieces.
          </p>
        </Col>
      </Row>



      <Row className="about-contact">
        <Col xs={12} className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            We would love to hear from you! Whether you have questions, suggestions, or just want to chat, feel free to reach out to us.
          </p>
          <Button variant="warning" href="mailto:claynest@gmail.com">
            Contact Us
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
};

export default AboutUs;
