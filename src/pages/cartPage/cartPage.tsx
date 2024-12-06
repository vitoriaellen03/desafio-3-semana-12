import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    const loadCartFromLocalStorage = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    };

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    const updateQuantity = (id, quantity) => {
        if (quantity < 0) return;
        if (quantity === 0) {
            handleRemoveProduct(id);
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveProduct = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getItemSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + getItemSubtotal(item.price, item.quantity), 0);
    };

    return (
        <div className="cart-page">
            <section>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 ? (
                            <tr>
                                <td colSpan="5">Your cart is empty.</td>
                            </tr>
                        ) : (
                            cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="product-item">
                                            <Link to={`/shop/product/${item.id}`}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="product-image"
                                                />
                                                <span>{item.name}</span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{`Rs. ${item.price.toFixed(2)}`}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <input type="text" value={item.quantity} readOnly />
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>{`Rs. ${getItemSubtotal(item.price, item.quantity).toFixed(2)}`}</td>
                                    <td>
                                        <button className="delete-item" onClick={() => handleRemoveProduct(item.id)}>
                                            <box-icon type='solid' name='trash-alt'></box-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
            <section>
                <div className="cart-totals">
                    <h2>Cart Totals</h2>
                    <p>
                        <span>Subtotal: Rs.</span> {getTotal().toFixed(2)}
                    </p>
                    <p>
                        <span>Total: Rs.</span> {getTotal().toFixed(2)}
                    </p>
                    <Link to="/cart/checkout" className="checkout-button">Check Out</Link>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
