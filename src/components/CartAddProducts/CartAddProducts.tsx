import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CartAddProduct = () => {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const location = useLocation();

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
    };

    const handleRemoveProduct = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const toggleCart = () => {
        if (!location.pathname.includes('/cart') && !location.pathname.includes('/checkout')) {
            setIsOpen(!isOpen);
        }
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div>
            <div onClick={toggleCart}>
                <img src="/assets/img/cart.svg" alt="cart" />
                {totalItems > 0 && !location.pathname.includes('/cart') && !location.pathname.includes('/checkout') && <span>{totalItems}</span>}
            </div>

            {isOpen && !location.pathname.includes('/cart') && !location.pathname.includes('/checkout') && (
                <div ref={popupRef} className="popup">
                    <h3>
                        Your Cart
                        <box-icon name='shopping-bag' color="#9f9f9f" onClick={toggleCart}></box-icon>
                    </h3>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <p>{item.name} (x{item.quantity})</p>
                                        <p>Total: ${item.price * item.quantity}</p>
                                    </div>
                                    <button onClick={() => handleRemoveProduct(item.id)}>
                                        <box-icon name='x-circle' type='solid' color='#9f9f9f'></box-icon>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link to="/cart">Cart</Link>
                    <Link to="/cart/checkout">Checkout</Link>
                    <button>Comparison</button>
                </div>
            )}
        </div>
    );
};

export default CartAddProduct;
