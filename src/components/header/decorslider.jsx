import React, { useEffect, useState } from 'react';
import './decorslider.css'; 
import { Button } from 'react-bootstrap';  

// Importing product images
import image1 from '../images/decors/ballbell.webp';
import image2 from '../images/decors/balloonbell.webp';
import image3 from '../images/decors/capedbell.webp';
import image4 from '../images/decors/chalkbell.webp';
import image5 from '../images/decors/claybell.webp';
import image6 from '../images/decors/dancingbell.webp';
import image7 from '../images/decors/designerbell.webp';
import image8 from '../images/decors/greenybell.webp';
import image9 from '../images/decors/kandangibell.webp';
import image10 from '../images/decors/rangolibell.webp';
import image11 from '../images/decors/starbell.webp';
import image12 from '../images/decors/vintagebell.webp';

// Array of products
const products = [
  { id: 1, src: image1, alt: 'Ball Bell', title: 'Ball Bell', description: 'Elegant bell design shaped like a ball, perfect for decor.' },
  { id: 2, src: image2, alt: 'Balloon Bell', title: 'Balloon Bell', description: 'A decorative bell in the shape of a balloon, light and airy.' },
  { id: 3, src: image3, alt: 'Caped Bell', title: 'Caped Bell', description: 'Stylish bell with a unique cape design for a charming look.' },
  { id: 4, src: image4, alt: 'Chalk Bell', title: 'Chalk Bell', description: 'Rustic bell with a chalky finish, perfect for vintage decor.' },
  { id: 5, src: image5, alt: 'Clay Bell', title: 'Clay Bell', description: 'Handcrafted bell made from clay, bringing earthy charm.' },
  { id: 6, src: image6, alt: 'Dancing Bell', title: 'Dancing Bell', description: 'A bell with an elegant dancing movement, captivating and graceful.' },
  { id: 7, src: image7, alt: 'Designer Bell', title: 'Designer Bell', description: 'A designer bell that adds a unique artistic touch to any space.' },
  { id: 8, src: image8, alt: 'Green Bell', title: 'Green Bell', description: 'Bell with a refreshing green design, inspired by nature.' },
  { id: 9, src: image9, alt: 'Kandangi Bell', title: 'Kandangi Bell', description: 'Traditional bell inspired by Kandangi art, full of culture.' },
  { id: 10, src: image10, alt: 'Rangoli Bell', title: 'Rangoli Bell', description: 'Bell featuring Rangoli patterns, bringing a festive touch.' },
  { id: 11, src: image11, alt: 'Star Bell', title: 'Star Bell', description: 'A bell shaped like a star, radiating elegance and charm.' },
  { id: 12, src: image12, alt: 'Vintage Bell', title: 'Vintage Bell', description: 'A beautifully crafted vintage-style bell with timeless appeal.' },
];

function Decorslider() {
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleProducts((prevProducts) => {
        const nextProduct = products[(products.indexOf(prevProducts[prevProducts.length - 1]) + 1) % products.length];
        return [...prevProducts.slice(1), nextProduct];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="product-slider">
        {visibleProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.src} alt={product.alt} className="product-image" />
            <div className="product-info">
              <h5>{product.title}</h5>
              <p>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Decorslider;