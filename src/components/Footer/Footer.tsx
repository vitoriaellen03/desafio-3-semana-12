import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../Header/components/NavLinks';
import HelpLinks from './components/HelpLinks';
import './Footer.css';
import FooterMain from './components/FooterMain';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
    } else {
      setErrorMessage('');
      console.log('Subscribed:', email);
    }
  };

  return (
    <>
      <FooterMain />
      <footer className="footer">
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
                  <li>
                    <a
                      href="http://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <i className="bx bxl-linkedin"></i>
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
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                  />
                  <button type="submit" onClick={handleSubscribe}>
                    Subscribe
                  </button>
                </div>
                {errorMessage && (
                  <span className='error-message'>{errorMessage}</span>
                )}
              </div>
            </section>
            <section className="footerBottom">
              <p>2023 Funiro. All rights reserved.</p>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
