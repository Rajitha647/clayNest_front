import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './category.css'

import statue from '../images/statue.jpg'
import mudstove from '../images/mudstove.webp'
import cookingpot from '../images/cookingpot.webp'
import lamp from '../images/lamp1.jpg'
import { useNavigate } from 'react-router-dom';
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
        </>
    );
}

export default Categories;
