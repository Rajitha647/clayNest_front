import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import p1 from './images/gifts/budhan.jpeg';
import p2 from './images/gifts/gujaraticouple2.jpg';
import p3 from './images/gifts/durga.jpg';
import p4 from './images/gifts/flowervase.jpg';
import p5 from './images/gifts/ganapati.jpeg';
import p6 from './images/gifts/gujaraticouple.jpg';
import p7 from './images/gifts/krishna.jpeg';
import p8 from './images/gifts/lordbudha.jpeg';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './cards.css';  
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

function Cards() {
     const nav=useNavigate()
      const [title, setTitle] = useState("");
  
  const giftItems = [
    { idno: 1, title: 'Buddha Sculpture', price: "830", description: 'A serene and beautiful clay Buddha sculpture, perfect for home decoration and spiritual spaces.', imageUrl: p1 },
    { idno: 2, title: 'Gujarati Couple Sculpture ', price: "650", description: 'Another variation of the Gujarati couple sculpture, perfect for adding cultural representation of a Gujarati couple', rating: 4, stock: 'In Stock', imageUrl: p2 },
    { idno: 3, title: 'Durga Goddess Statue', price: "450", description: 'A detailed clay sculpture of Goddess Durga, ideal for religious altars.clay sculpture of Goddess Durga..', imageUrl: p3 },
    { idno: 4, title: 'Flower Vase', price: "400", description: 'A beautifully crafted flower vase made from clay, adding a rustic charm to your home decor.', imageUrl: p4 },
    { idno: 5, title: 'Lord Ganesha Sculpture', price: "750", description: 'A divine and intricate clay sculpture of Lord Ganesha, perfect for celebrations.', imageUrl: p5 },
    { idno: 6, title: 'Gujarati Couple Sculpture', price: "650", description: 'A traditional representation of a Gujarati couple, showcasing cultural artistry.', imageUrl: p6 },
    { idno: 7, title: 'Lord Krishna Sculpture', price: "500", description: 'A charming clay sculpture of Lord Krishna playing the flute, symbolizing peace.', imageUrl: p7 },
    { idno: 8, title: 'Lord Buddha Statue', price: "600", description: 'A peaceful and calming clay statue of Lord Buddha, perfect for meditation spaces.', imageUrl: p8 },
  ];

  return (
    <>

    <Row className="d-flex justify-content-center">
    {giftItems.length > 0 ? (
        giftItems.filter((rec) => rec.title.toLowerCase().match(title.toLowerCase())).map((list) => (
            <Col lg={3} md={4} sm={6} xs={12} key={list.idno} className="mb-4">
                <Card className="product-card">
                    <Card.Img 
                        variant="top" 
                        src={list.imageUrl} 
                        className="product-image" 
                    />
                    <Card.Body className="text-center">
                        <Card.Title className="product-title">{list.title}</Card.Title>
                        <Card.Text className="product-price">
                            <CurrencyRupeeIcon fontSize="small" /> {list.price}
                        </Card.Text>
                        <Card.Text className="product-description">{list.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    ) : (
        <p className="text-center" style={{ fontSize: '18px' }}>No Products Found</p>
    )}
    <button style={{height:"50px",width:"200px",border:"none"}} onClick={()=>nav("/shop")}>see all products...<KeyboardArrowDownIcon/></button>
</Row>
</>
  );
}

export default Cards;
