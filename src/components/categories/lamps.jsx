

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import '../cards.css';
import {useNavigate} from 'react-router-dom';
<<<<<<< HEAD
=======
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570


function Lamps() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const nav=useNavigate()

    useEffect(() => {
        const savedPercentage = localStorage.getItem('scrollPercentage') || 0;
    
<<<<<<< HEAD
        // Apply saved scroll position
=======
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollTop = (savedPercentage / 100) * scrollHeight;
    
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    
<<<<<<< HEAD
        // Fetch products (example)
        fetch('http://localhost:9000/products/getproductbycategory/lamps')
=======
        fetch('https://claynest-back.onrender.com/products/getproductbycategory/lamps')
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error('Error fetching products:', error));
      }, []);
    

      const handleCart = async (product) => {
        try {
<<<<<<< HEAD
            // Correct the retrieval of the userId from localStorage by using a string key
            const userId = localStorage.getItem("userId"); // Assuming the key in localStorage is 'userId'
            
            // Check if userId is available
=======
            const userId = localStorage.getItem("userId"); 
            
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            if (!userId) {
                alert("User is not logged in.");
                return;
            }
    
<<<<<<< HEAD
            const response = await axios.post("http://localhost:9000/cart", {
                userId: userId, // Use the retrieved userId
=======
            const response = await axios.post("https://claynest-back.onrender.com/cart", {
                userId: userId, 
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                productId: product._id,
                quantity: 1,
                price: product.price,
                productName: product.title,
                image: product.image,
            });
    
            if (response.data.message === "Added to cart") {
                alert("Product added to cart");
                nav('/cart')
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
<<<<<<< HEAD
=======

        <>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
        <Container className="my-5">
            <u>
                <h1 className="text-center font-monospace" style={{ fontSize: '20px', color: '#2D2D2D' }}>MUDLAMPS</h1>
            </u>
            <p className="featured-description">
            A mud stove is more than just a heating source; it’s a reminder of simpler times, where cooking was an art passed down through generations.
            </p>

<<<<<<< HEAD
            {/* Search Bar */}
=======
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            <div className="search-container d-flex justify-content-center mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control w-50"
                />
            </div>

<<<<<<< HEAD
            {/* Products Grid */}
=======
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
            <Row>
                {products.length > 0 ? (
                    products
                        .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((product) => (
                            <Col lg={3} md={4} sm={6} xs={12} key={product._id} className="mb-4">
                                <Card className="product-card">
                                    <Card.Img
                                        variant="top"
<<<<<<< HEAD
                                        src={`http://localhost:9000/uploads/${product.image}`} 
=======
                                        src={`https://claynest-back.onrender.com/uploads/${product.image}`} 
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                                        alt={product.title}
                                        style={{ height: '150px', objectFit: 'contain' }}
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <CurrencyRupeeIcon fontSize='small' /> {product.price}
                                        </Card.Text>
                                        <Card.Text>{product.description}</Card.Text>

<<<<<<< HEAD
                                        {/* Product Rating */}
=======
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                                        <div>
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} style={{ color: i < product.rating ? '#FFD700' : '#ccc' }} />
                                            ))}
                                        </div>

                                
                                        <Button variant="secondary" onClick={() => handleCart(product)} className="btn-cart">
                                            <ShoppingCartIcon /> Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                ) : (
                    <p className="text-center">No products found</p>
                )}
            </Row>
        </Container>
<<<<<<< HEAD
=======
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
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
    );
}

export default Lamps;
