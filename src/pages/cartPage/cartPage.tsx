import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    // Função para carregar o carrinho do localStorage
    const loadCartFromLocalStorage = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    };

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    // Função para atualizar a quantidade de produtos no carrinho
    const updateQuantity = (id, quantity) => {
        if (quantity < 0) return;  // Não permite quantidade negativa
        if (quantity === 0) {
            handleRemoveProduct(id);  // Se a quantidade for 0, remove o item
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Função para remover um produto do carrinho
    const handleRemoveProduct = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Função para calcular o subtotal de um item
    const getItemSubtotal = (price, quantity) => {
        return price * quantity;
    };

    // Função para calcular o total do carrinho
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
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                            <span>{item.name}</span>
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
                        <span>Subtotal:</span> {getTotal().toFixed(2)}
                    </p>
                    <p>
                        <span>Total:</span> {getTotal().toFixed(2)}
                    </p>
                    <Link to="/cart/checkout" className="checkout-button">Check Out</Link>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
