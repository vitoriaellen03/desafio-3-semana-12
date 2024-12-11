import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SimpleProductDisplay from "../../components/SimpleProductDisplay/SimpleProductDisplay";
import SimpleCategories from "../../components/SimpleCategories/SimpleCategories";
import './homePage.css';
import Carousel from './components/Carousel/Carousel'

const HomePage = () => {
  const totalSlides = 3;
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? totalSlides : prevSlide - 1));
  };

  return (
    <div className="homepage">
      <div className="cont-conteiner">
        <section className="sec-conteiner section-h">
          <section className="column-h">
            <h2>Browse The Range</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </section>
          <section className="column-h">
            <SimpleCategories />
          </section>
        </section>

        <section className="sec-conteiner section-h">
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
          <div className="cont-conteiner">
            <div className="sec-conteiner sec-w">
                <section className="column-h rom">
                  <h2>50+ Beautiful rooms inspiration</h2>
                  <p>Our designer already made a lot of beautiful prototypes of rooms that inspire you</p>
                  <div >
                    <Link to='/shop' className="btn-exp">Explore More</Link>
                  </div>
                </section>
                <section className="column-h cars">
                  <Carousel />
                </section>
            </div>
          </div>
        </section>

        <section className="sec-conteiner section-h">
          <section className="column-h">
            <h4 className="subtitle-h">Share your setup with</h4>
            <h2>#FuniroFurniture</h2>
          </section>
          <section className="column-h">
            <img src="./../assets/img/image.png" alt="image" />
          </section>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
