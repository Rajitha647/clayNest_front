import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import '../cards.css'
import {useNavigate} from 'react-router-dom';
import Headernav from "../header/headernav";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Kitchenwares = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const nav=useNavigate()
  useEffect(() => {
    axios
      .get("https://claynest-back.onrender.com/products/getproductbycategory/kitchenwares")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCart = async (product) => {
    try {
        const userId = localStorage.getItem("userId"); 
        
        if (!userId) {
            alert("User is not logged in.");
            return;
        }

        const response = await axios.post("https://claynest-back.onrender.com/cart", {
            userId: userId,
            productId: product._id,
            quantity: 1,
            price: product.price,
            productName: product.title,
            image: product.image,
        });

        if (response.data.message === "Added to cart") {
            alert("Product added to cart");
            nav("/cart")
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

  return (
    <>
    <Headernav/>
    <Container className="my-5">
    <h1 className="text-center font-monospace" style={{ fontSize: '20px', color: '#2D2D2D' }}>KITCHENWARES</h1>
    <p className="featured-description">Cooking in clay is more than a method; it's a connection to our roots.<br/> Let the richness of tradition and the purity of nature transform your kitchen into a space of timeless elegance and wholesome meals.</p>
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
                                        src={`https://claynest-back.onrender.com/uploads/${product.image}`} 
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
                                        
                                        <Button variant='' onClick={()=>handleCart(product)} className="btn-cart">
                                            <ShoppingCartIcon /> Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                ) :  (
                    <p className="text-center">No products found</p>
                )}

      </Row>
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
};

export default Kitchenwares;