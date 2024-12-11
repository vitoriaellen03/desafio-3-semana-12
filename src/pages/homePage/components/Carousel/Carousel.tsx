import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'; 

const Carousel = () => {
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    focusOnSelect: true, 
    centerMode: true, 
    nextArrow: <div className="slick-next"></div>, 
  };

  const images = [
    "/assets/img/car-1.jpg",
    "/assets/img/car-2.jpg",
    "/assets/img/car-3.jpg",
    "/assets/img/car-4.jpg",
  ];

  return (
    <div className="px-4 py-5 w-100 h-auto" id="custom-cards">
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index} className="item-image">
            <img 
              src={imageUrl} 
              alt={`Image ${index + 1}`} 
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
