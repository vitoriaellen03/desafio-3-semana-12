import React, { useEffect } from 'react';
import { Splide } from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './Carousel.css';
import { SmoothTransition } from './SmoothTransition.js';

const Carousel = () => {
  const images = [
    "/assets/img/car-1.jpg",
    "/assets/img/car-2.jpg",
    "/assets/img/car-3.jpg",
    "/assets/img/car-4.jpg",
  ];

  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'loop',
      perPage: 2,
      perMove: 1,
      gap: '1rem',
      speed: 600,
      easing: 'ease',
      breakpoints: {
        640: {
          perPage: 1,
        },
      },
    });

    splide.mount({}, SmoothTransition);

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div id="custom-cards" className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          {images.map((src, index) => (
            <li className="splide__slide" key={index}>
              <img src={src} alt={`Car Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
