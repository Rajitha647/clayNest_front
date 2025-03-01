import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './category.css'

import statue from '../images/statue.jpg'
import mudstove from '../images/mudstove.webp'
import cookingpot from '../images/cookingpot.webp'
import lamp from '../images/lamp1.jpg'
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


function Categories (){

  const nav=useNavigate();
    const handlekitchen=()=>{
        nav("/kitchen")
    }

    const handledecor=()=>{
        nav("/gifts")
    }
    const handlelamp=()=>{
        nav("/lamps")
    }
    const handlestove=()=>{
        nav("/stove")
    }


    return (
        <>
        <Container>
            <h4 className="featured-title">FEATURED CATEGORIES</h4>
            <p className="featured-description">A pot of history in every piece.</p>
            <div className="homediv">
                <Row className="homedivRow">
                    <Col lg={8} className="d-flex flex-wrap justify-content-center">
                        <div className="image-item">
                            <img className="category-img" src={statue} alt="Statue"  onClick={handledecor}/>
                            <p className="image-title">Decorating items</p>
                        </div>
                        <div className="image-item">
                            <img className="category-img" src={lamp} alt="Lamp" onClick={handlelamp}/>
                            <p className="image-title">Lamp</p>
                        </div>
                        <div className="image-item">
                            <img className="category-img" src={cookingpot} alt="cookingpot"  onClick={handlekitchen} />
                            <p className="image-title">Kitchenwares</p>
                        </div>
                      
                        <div className="image-item">
                            <img className="category-img" src={mudstove} alt="Mud Stove" onClick={handlestove} />
                            <p className="image-title">Mud Stove</p>
                        </div>
                      
                    </Col>
                </Row>
            </div>
        </Container>
        <footer className="footer">
        <Container>
          <Row className="justify-content-center text-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <p>&copy; {new Date().getFullYear()} ClayNest. All Rights Reserved.</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><MailOutlineIcon fontSize="small" /> claynest@gmail.com</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><LocalPhoneIcon fontSize="small" /> 8606454877</p>
            </Col>
          </Row>
        </Container>
      </footer>
        </>
    );
}

export default Categories;
