import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../Header/components/NavLinks';
import HelpLinks from './components/HelpLinks';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="cont-conteiner">
      <div className="sec-conteiner">
        <section className="footerSection">
          <div className="footerColumn">
            <Link to="/">
              <h3>Funiro.</h3>
            </Link>
            <p>
              400 University Drive Suite 200 Coral Gables, <br /> FL 33134, USA
            </p>
            <ul className="footerSocialLinks">
              <li >
                <a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i class='bx bxl-facebook'></i>
                </a>
              </li>
              <li >
                <a
                  href="http://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i class='bx bxl-instagram' ></i>
                </a>
              </li>
              <li >
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i class='bx bxl-twitter' ></i>
                </a>
              </li>
              <li >
                <a
                  href="http://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i class='bx bxl-linkedin'></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footerColumn">
            <h5>Links</h5>
            <NavLinks />
          </div>
          <div className="footerColumn">
            <h5>Help</h5>
            <HelpLinks />
          </div>
          <div className="footerColumn">
            <h5>Newsletter</h5>
            <div className="footerInput">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </section>
        <section className="footerBottom">
          <p>2023 Funiro. All rights reserved.</p>
        </section>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
