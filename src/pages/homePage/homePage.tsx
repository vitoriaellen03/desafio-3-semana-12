import React from "react";
import { Link } from 'react-router-dom';
import SimpleProductDisplay from "../../components/SimpleProductDisplay/SimpleProductDisplay";
import SimpleCategories from "../../components/SimpleCategories/SimpleCategories";
import './homePage.css';

const HomePage = () => {
  return (
    <>
      <section className="section-h" >
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
      <section className="section-h">
        <section className="column-h">
          <h2>50+ Beautiful rooms 
          inspiration</h2>
          <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
          <div>
            <Link to='/shop'>Explore More</Link>
          </div>
        </section>
        <section className="column-h">
          <div>
            <div>
              <img src="" alt="" /><img src="" alt="" /><img src="" alt="" />
            </div>
            <div>
              navgator
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
