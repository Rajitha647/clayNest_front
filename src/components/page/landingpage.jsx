import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import './landingpage.css';
import banner1 from '../images/company.webp';
import p1 from '../images/gifts/lordbudhan.jpeg';
import p2 from '../images/hangings.jpg';
import p3 from '../images/statue.jpg';
import {useNavigate} from 'react-router-dom'
function LandingPage() {
    const nav = useNavigate("")
    return (
        <div className="landing-page">
            <section className="hero-section">
                <Container className="text-center text-white">
                    <Fade direction="down" triggerOnce>
                        <h1 className="hero-title">Welcome to ClayNest</h1>
                        <p className="hero-subtitle">Handcrafted Clay Items That Add Elegance to Your Home</p>
                        <Button variant="light" onClick={()=>{nav("/signup")}} className="mt-3 btn-explore">Explore Now</Button>
                    </Fade>
                </Container>
            </section>

            <section className="about-section py-5">
                <Container>
                    <Row>
                        <Col md={6} className="d-flex justify-content-center align-items-center">
                            <Slide direction="left" cascade damping={0.2} triggerOnce>
                                <img
                                    src={banner1}
                                    alt="Clay pot"
                                    className="img-fluid rounded shadow"
                                    style={{ maxHeight: '300px' }}
                                />
                            </Slide>
                        </Col>
                        <Col md={6}>
                            <Slide direction="right" cascade damping={0.2} triggerOnce>
                                <h2>About ClayNest</h2>
                                <p>
                                    At ClayNest, we bring to you an exclusive collection of handcrafted clay items made with
                                    love and precision. Each piece tells a story of tradition and artistry, perfect for
                                    adorning your home or gifting to your loved ones.
                                </p>
                                <Button className='btn-about' variant=''  onClick={()=>nav("/about")}>About US</Button>
                            </Slide>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="featured-products py-5 bg-light">
                <Container>
                    <h2 className="text-center mb-4">Our Featured Products</h2>
                    <Row>
                        {[p1, p2, p3].map((item, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Zoom triggerOnce cascade damping={0.3}>
                                    <div className="product-card shadow rounded text-center p-3">
                                        <img
                                            src={item}
                                            alt={`Product ${index + 1}`}
                                            className="img-fluid mb-3"
                                            style={{ maxHeight: '200px' }}
                                        />
                                        <h5>Clay Product {index + 1}</h5>
                                        <p>Beautiful handcrafted clay item for your home.</p>
                                        <Button
                                         onClick={()=>nav("/shop")}
                                            variant=""
                                            style={{ backgroundColor: "rgb(134, 15, 15) ", color: "white" }}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                </Zoom>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="testimonials-section py-5">
                <Container>
                    <h2 className="text-center mb-4">What Our Customers Say</h2>
                    <Row>
                        {[1, 2].map((item, index) => (
                            <Col md={6} key={index} className="mb-4">
                                <Fade direction="up" cascade damping={0.3} triggerOnce>
                                    <div className="testimonial-card p-4 shadow rounded bg-white">
                                        <p>
                                            "I absolutely love the products from ClayNest! The craftsmanship is amazing, and
                                            they add so much warmth to my home decor."
                                        </p>
                                        <h6 className="mt-3">- Happy Customer {item}</h6>
                                    </div>
                                </Fade>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="cta-section py-5 text-white text-center">
                <Container>
                    <Slide direction="up" cascade damping={0.2} triggerOnce>
                        <h2>Bring Home the Charm of ClayNest</h2>
                        <p>Shop our exclusive handcrafted clay products today!</p>
                        <Button onClick={()=>nav("/shop")} variant="" className="btn-shop-now">Shop Now</Button>
                    </Slide>
                </Container>
            </section>
        </div>
    );
}

export default LandingPage;
