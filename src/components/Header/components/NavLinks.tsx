import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
    return (
        <ul className="options-links">
            <li className="link"><Link to="/">Home</Link></li>
            <li className="link"><Link to="/shop">Shop</Link></li>
            <li className="link"><Link to="/about">About</Link></li>
            <li className="link"><Link to="/contact">Contact</Link></li>
        </ul>
    );
};

export default NavLinks;
