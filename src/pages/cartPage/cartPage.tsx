import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './cartPage.css';

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
        window.location.reload();
    };

    const handleRemoveProduct = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    const getItemSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const getDiscount = (price, quantity, discount) => {
        return (price * quantity * discount) / 100;
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + getItemSubtotal(item.price, item.quantity), 0);
    };

    const getTotalDiscount = () => {
        return cart.reduce((acc, item) => acc + getDiscount(item.price, item.quantity, item.discount), 0);
    };

    const total = getTotal() - getTotalDiscount();

    return (
        <div className="cart-page">
            <section className="col">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 ? (
                            <tr>
                                <td colSpan="4">Your cart is empty.</td>
                            </tr>
                        ) : (
                            cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="product-item">
                                            <Link className="prod-flex" to={`/shop/product/${item.id}`}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="product-image"
                                                />
                                                <span>{item.name}</span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="quantity-control">
                                            <div className="group">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{`Rs. ${getItemSubtotal(item.price, item.quantity).toFixed(2)}`}</td>
                                    <td>
                                        <button className="delete-item" onClick={() => handleRemoveProduct(item.id)}>
                                            <i className='bx bxs-trash-alt' style={{ color: '#b88e2f' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
            <section className="col">
                <div className="cart-totals">
                    <div className="group">
                        <h2>Cart Totals</h2>
                    </div>
                    <div className="group">
                        <p className="c-span">
                            <span>Subtotal: </span>
                            <span className="p-sub">
                                Rs. {getTotal().toFixed(2)}
                            </span>
                        </p>
                        <p className="c-span">
                            <span>Discount: </span>
                            <span className="p-discount">
                                - Rs. {getTotalDiscount().toFixed(2)}
                            </span>
                        </p>
                        <p className="c-span">
                            <span>Total: </span>
                            <span className="p-tot">
                                Rs. {total.toFixed(2)}
                            </span>
                        </p>
                    </div>
                    <div className="group">
                        <Link to="/cart/checkout" className="checkout-button">Check Out</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
