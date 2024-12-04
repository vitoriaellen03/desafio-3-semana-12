import React from 'react';
import { Link } from 'react-router-dom';

const HelpLinks = () => {
    return (
        <ul className="options-links">
            <li className="link"><Link to="/">Payment Options</Link></li>
            <li className="link"><Link to="/">Returns</Link></li>
            <li className="link"><Link to="/">Privacy Policies</Link></li>
        </ul>
    );
};

export default HelpLinks;
