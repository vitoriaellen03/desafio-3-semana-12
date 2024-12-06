import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CartAddProducts.css';

const CartAddProduct = () => {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const location = useLocation();
    const [isEdited, setIsEdited] = useState(false);

    const updateCartFromLocalStorage = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    };

    useEffect(() => {
        updateCartFromLocalStorage();

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (location.pathname.includes('/cart') || location.pathname.includes('/checkout')) {
            setIsOpen(false); 
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            document.documentElement.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    const handleAddProduct = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        let updatedCart;
        if (existingProductIndex === -1) {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        } else {
            updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setIsEdited(true);
    };

    const handleRemoveProduct = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setIsEdited(true);
    };

    const toggleCart = () => {
        if (isOpen && isEdited) {
            window.location.reload();
        } else if (!location.pathname.includes('/cart') && !location.pathname.includes('/checkout')) {
            setIsOpen(!isOpen);
        }
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <div className='c-cart' onClick={toggleCart}>
                <img src="/assets/img/cart.svg" alt="cart" />
                {totalItems > 0 && !location.pathname.includes('/cart') && !location.pathname.includes('/checkout') &&
                    <span className='cont'>{totalItems}</span>}
            </div>

            {isOpen && !location.pathname.includes('/cart') && !location.pathname.includes('/checkout') && (
                <div ref={popupRef} className="popup">
                    <div className='cart-conteiner'>
                        <div>
                            <h3>
                                Shopping Cart
                                <box-icon name='shopping-bag' color="#9f9f9f" onClick={toggleCart}></box-icon>
                            </h3>
                            {cart.length === 0 ? (
                                <div className='c-prod'>
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <div className='c-prod'>
                                    <ul>
                                        {cart.map((item) => (
                                            <li className='item' key={item.id}>
                                                <div className='it-img'>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className='it-item'>
                                                    <p>{item.name}</p>
                                                    <div className='it-price'>
                                                        <p>{item.quantity}</p>
                                                        <span>X</span>
                                                        <p>Rs. {item.price * item.quantity}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleRemoveProduct(item.id)}>
                                                    <box-icon name='x-circle' type='solid' color='#9f9f9f'></box-icon>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p>
                                <span>Subtotal: Rs. {subtotal.toFixed(2)}</span>
                            </p>
                        </div>
                        <div>
                            <Link className='c-btn' to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
                            <Link className='c-btn' to="/cart/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
                            <button className='c-btn'>Comparison</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartAddProduct;
