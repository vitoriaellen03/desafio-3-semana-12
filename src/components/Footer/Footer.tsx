import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../Header/components/NavLinks';
import HelpLinks from './components/HelpLinks';

const Footer = () => {
  return (
    <footer>
      <section>
        <div>
          <Link to="/">
            <h3>Funiro</h3>
          </Link>
          <p>400 University Drive Suite 200 Coral Gables, <br /> FL 33134, USA</p>
          <ul>
            <li><a href="http://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a></li>
            <li><a href="http://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a></li>
            <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a></li>
            <li><a href="http://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4>Links</h4>
          <NavLinks />
        </div>
        <div>
          <h4>Help</h4>
          <HelpLinks />
        </div>
        <div>
          <h4>Newsletter</h4>
          <input type="email" name="" id="" />
          <button type="submit">Subscribe</button>
        </div>
      </section>
      <section>
        <p>2023 Funiro. All rights reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
