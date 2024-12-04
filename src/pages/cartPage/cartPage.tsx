import React from "react";

const CartPage = () => {
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="product-item">
                                    <img
                                        src="sofa-image-url"
                                        alt="Asgaard sofa"
                                        className="product-image"
                                    />
                                    <span>Asgaard sofa</span>
                                </div>
                            </td>
                            <td>Rs. 250,000.00</td>
                            <td>
                                <div className="quantity-control">
                                    <button>-</button>
                                    <input type="text" value="1" readOnly />
                                    <button>+</button>
                                </div>
                            </td>
                            <td>Rs. 250,000.00</td>
                            <td>
                                <button className="delete-item"><box-icon type='solid' name='trash-alt'></box-icon></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <div className="cart-totals">
                    <h2>Cart Totals</h2>
                    <p>
                        <span>Subtotal:</span> Rs. 250,000.00
                    </p>
                    <p>
                        <span>Total:</span> Rs. 250,000.00
                    </p>
                    <button>Check Out</button>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
