import Carousel from 'react-bootstrap/Carousel';
import Pictureframe from './pictureframe';
import { Button } from 'react-bootstrap';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import bg1 from '../images/slider/offer1.webp';
import bg2 from '../images/slider/offer2.webp';
import bg3 from '../images/slider/slider2.webp';
import bg4 from '../images/slider/slider3.webp';
import bg5 from '../images/slider/slider4.jpg';
import { useNavigate } from 'react-router-dom';
import './slider.css'

function Slider() {
  const nav=useNavigate();

  const handleClick=()=>{
    nav("/shop")
  }
  return (
    <>
    
    <div>
    <Carousel>
  <Carousel.Item interval={3000} className="carousel-item">
    <Pictureframe imageUrl={bg1} alt="Crafting nature’s essence into timeless treasures" />
    <div className="overlay-content top-center">
      <h3 className="carousel-heading">Crafting nature’s essence into timeless treasures.</h3>
      <div className="carousel-contact1">
        <span><WhatsAppIcon /> 8606454877</span>
        <span className="ms-3"><EmailIcon /> claynest@gmail.com</span>
      </div>
      <Button variant="warning" className="mt-3" onClick={handleClick}>
        Shop Now
      </Button>
    </div>
  </Carousel.Item>

  <Carousel.Item interval={3000} className="carousel-item">
    <Pictureframe imageUrl={bg2} alt="Where tradition meets timeless craftsmanship" />
    <div className="overlay-content left-aligned">
      <h3>Where tradition meets timeless craftsmanship.</h3>
      <div className="carousel-contact">
        <span><WhatsAppIcon /> 8606454877</span>
        <span className="ms-3"><EmailIcon /> claynest@gmail.com</span>
      </div>
      <Button variant="warning" className="mt-3" onClick={handleClick}>
        Shop Now
      </Button>
    </div>
  </Carousel.Item>

  <Carousel.Item interval={3000} className="carousel-item">
    <Pictureframe imageUrl={bg3} alt="Every pot tells a story, every shape has a soul" />
    <div className="overlay-content left-aligned">
      <h3>Every pot tells a story, every shape has a soul.</h3>
      <div className="carousel-contact">
        <span><WhatsAppIcon /> 8606454877</span>
        <span className="ms-3"><EmailIcon /> claynest@gmail.com</span>
      </div>
      <Button variant="warning" className="mt-3" onClick={handleClick}>
        Shop Now
      </Button>
    </div>
  </Carousel.Item>

  <Carousel.Item interval={3000} className="carousel-item">
    <Pictureframe imageUrl={bg4} alt="Every pot tells a story, every shape has a soul" />
    <div className="overlay-content left-aligned">
      <h3>Every pot tells a story, every shape has a soul.</h3>
      <div className="carousel-contact">
        <span><WhatsAppIcon /> 8606454877</span>
        <span className="ms-3"><EmailIcon /> claynest@gmail.com</span>
      </div>
      <Button variant="warning" className="mt-3" onClick={handleClick}>
        Shop Now
      </Button>
    </div>
  </Carousel.Item>

  <Carousel.Item interval={3000} className="carousel-item">
    <Pictureframe imageUrl={bg5} alt="Every pot tells a story, every shape has a soul" />
    <div className="overlay-content left-aligned">
      <h3>Every pot tells a story, every shape has a soul.</h3>
      <div className="carousel-contact">
        <span><WhatsAppIcon /> 8606454877</span>
        <span className="ms-3"><EmailIcon /> claynest@gmail.com</span>
      </div>
      <Button variant="warning" className="mt-3" onClick={handleClick}>
        Shop Now
      </Button>
    </div>
  </Carousel.Item>
</Carousel>

  </div>

</>

 );
}

export default Slider; 