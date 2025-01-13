

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import '../cards.css';
import {useNavigate} from 'react-router-dom';

function Mudstove() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const nav=useNavigate()
    useEffect(() => {
        const savedPercentage = localStorage.getItem('scrollPercentage') || 0;
    
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollTop = (savedPercentage / 100) * scrollHeight;
    
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    
        fetch('http://localhost:9000/products/getproductbycategory/stove')
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error('Error fetching products:', error));
      }, []);

      const handleCart = async (product) => {
        try {
            const userId = localStorage.getItem("userId"); 
            
            if (!userId) {
                alert("User is not logged in.");
                return;
            }
    
            const response = await axios.post("http://localhost:9000/cart", {
                userId: userId, 
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
        <Container className="my-5">
            <u>
                <h1 className="text-center font-monospace" style={{ fontSize: '20px', color: '#2D2D2D' }}>MUDSTOVES</h1>
            </u>
            <p className="featured-description">
            A mud stove is more than just a heating source; it’s a reminder of simpler times, where cooking was an art passed down through generations.
            </p>

            <div className="search-container d-flex justify-content-center mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control w-50"
                />
            </div>

            <Row>
                {products.length > 0 ? (
                    products
                        .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((product) => (
                            <Col lg={3} md={4} sm={6} xs={12} key={product._id} className="mb-4">
                                <Card className="product-card">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:9000/uploads/${product.image}`} // Assuming the image is uploaded to this directory
                                        alt={product.title}
                                        style={{ height: '150px', objectFit: 'contain' }}
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <CurrencyRupeeIcon /> {product.price}
                                        </Card.Text>
                                        <Card.Text>{product.description}</Card.Text>

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
    );
}

export default Mudstove;
