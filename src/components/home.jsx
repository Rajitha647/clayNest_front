import './home.css';
import React, { useState, useEffect } from 'react';
import Slider from "./header/slider";
import Headernav from './header/headernav';
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import Cards from './cards';
import Categories from './categories/categories';
import AboutUs from './aboutus';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Decorslider from './header/decorslider';
import VideoSlider from './videoslider';
import './categories/category.css';

import { Fade, Slide, Zoom } from "react-awesome-reveal";

function Home() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = (scrollTop / scrollHeight) * 100;

      setScrollPercentage(percentage);
      localStorage.setItem('scrollPercentage', percentage); // Save to localStorage
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Headernav />
      <Fade triggerOnce>
        <Slider />
      </Fade>

      <br />
      <Slide direction="up" triggerOnce>
        <h1 className='featured-title'>Traditional Arts</h1>
        <p className='featured-description'>
          Traditional arts bring history to life. Explore the age-old crafts passed
          down through generations, each piece a testament to the skills of artisans
          from the past.<br /> Clay craft, or Mitti art, is an act of communion with nature. The earthy
          smell of freshly dug clay, the cool comfort beneath fingertips, and the
          slow transformation from formless lump to sculpted wonder.
        </p>
      </Slide>

      <Fade direction='left' triggerOnce>
        <Decorslider />
      </Fade>

      <br />
      <Fade direction="left" triggerOnce>
        <Categories />
      </Fade>

      <br />
      <br />
      <div>
        <Slide direction="up" triggerOnce>
          <h4 className="featured-title"> PRODUCTS ON SALES</h4>
          <p className='featured-title'>Discover a stunning selection of handcrafted clay products,
            where traditional craftsmanship meets artistic excellence. <br />
            Each product is thoughtfully designed to bring warmth, culture, and creativity into your home or workspace.</p>
          <br />
          <Cards />
        </Slide>
      </div>
      <hr />

      <Slide triggerOnce>
        <VideoSlider />
      </Slide>

      <br />
      <br /><hr />
      <Zoom triggerOnce>
        <AboutUs />
      </Zoom>

      <footer className="footer">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; {new Date().getFullYear()} ClayNest. All Rights Reserved.</p>
              <p><MailOutlineIcon fontSize="small" /> claynest@gmail.com</p>
              <p><LocalPhoneIcon fontSize="small" /> 8606454877</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Home;
