import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './aboutus.css';
import profile from './images/company1.jpg';

function AboutUs() {
    return (
        <Container className="about-us py-5">
            <Row className="mb-5 align-items-center">
                <Col xs={12} md={6} className="mb-4 mb-md-0">
                    <Image src={profile} alt="About Us" fluid className="rounded shadow" />
                </Col>
                <Col xs={12} md={6}>
                    <h1 className="display-4">About ClayNest</h1>
                    <p className="lead text-muted">
                        At ClayNest, we believe in the power of tradition, artistry, and sustainability. Our journey began with a vision to create a meaningful connection between people and the art of handmade craftsmanship.
                    </p>
                    <p>
                        Through our dedication to quality and innovation, we aim to empower artisans and bring their stories to life. Every product we offer is a testament to heritage, creativity, and care.
                    </p>
                </Col>
            </Row>
            
            <Row style={{justifyContent:"center"}}>
              
                <Col xs={12} md={6}>
                    <h2>Contact Information</h2>
                    <p>We value your feedback and inquiries. Please reach out to us through the details below:</p>
                    <ul>
                        <li><strong>Email:</strong> <a href="mailto:claynest@gmail.com">claynest@gmail.com</a></li>
                        <li><strong>Phone:</strong> <a href="tel:+91 9087654312">+91 9087654312</a></li>
                        <li><strong>Address:</strong> 123 Artisans Lane, Heritage City, USA</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutUs;
