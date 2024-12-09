import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SimpleProductDisplay from "../../components/SimpleProductDisplay/SimpleProductDisplay";
import SimpleCategories from "../../components/SimpleCategories/SimpleCategories";
import './homePage.css';

const HomePage = () => {
  const totalSlides = 3;
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? totalSlides : prevSlide - 1));
  };

  return (
    <>
      <section className="section-h">
        <section className="column-h">
          <h2>Browse The Range</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
        <section className="column-h">
          <SimpleCategories />
        </section>
      </section>

      <section className="section-h">
        <section className="column-h">
          <h2>Our Products</h2>
        </section>
        <section className="column-h">
          <SimpleProductDisplay />
          <div className="sec-more">
            <Link className="show-more" to='/shop'>Show More</Link>
          </div>
        </section>
      </section>

      <section className="section-h cont-room">
        <section className="column-h">
          <h2>50+ Beautiful rooms inspiration</h2>
          <p>Our designer already made a lot of beautiful prototypes of rooms that inspire you</p>
          <div >
            <Link to='/shop' className="btn-exp">Explore More</Link>
          </div>
        </section>
        <section className="column-h">
          <div className="carousel-container">
            {/* Carousel slides */}
            <div className="carousel-slides" style={{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }}>
              <div className={`carousel-slide ${currentSlide === 1 ? 'active' : ''}`}>
                <img src="../../assets/img/car-1.jpg" alt="Image 1" />
              </div>
              <div className={`carousel-slide ${currentSlide === 2 ? 'active' : ''}`}>
                <img src="../../assets/img/car-2.jpg" alt="Image 2" />
              </div>
              <div className={`carousel-slide ${currentSlide === 3 ? 'active' : ''}`}>
                <img src="../../assets/img/car-3.jpg" alt="Image 3" />
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="carousel-nav">
              <label
                htmlFor={`slide${(currentSlide === 1 ? totalSlides : currentSlide - 1)}`}
                className="carousel-arrow-left"
                onClick={prevSlide}
              >
                <i class='bx bx-chevron-right'></i>
              </label>
            </div>

            {/* Radio buttons for slide selection */}
            <div className="carousel-radio">

              <input
                type="radio"
                id="slide1"
                name="carousel"
                checked={currentSlide === 1}
                onChange={() => setCurrentSlide(1)}
              />
              <input
                type="radio"
                id="slide2"
                name="carousel"
                checked={currentSlide === 2}
                onChange={() => setCurrentSlide(2)}
              />
              <input
                type="radio"
                id="slide3"
                name="carousel"
                checked={currentSlide === 3}
                onChange={() => setCurrentSlide(3)}
              />
            </div>
          </div>
        </section>
      </section>

      <section className="section-h">
        <section className="column-h">
          <h4 className="subtitle-h">Share your setup with</h4>
          <h2>#FuniroFurniture</h2>
        </section>
        <section className="column-h">
          <img src="./../assets/img/image.png" alt="image" />
        </section>
      </section>
    </>
  );
};

export default HomePage;
