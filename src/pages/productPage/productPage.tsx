import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../../../db.json";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const selectedProduct = data.products.find((prod) => prod.id === id);
    setProduct(selectedProduct);
  }, [id]);

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingProductIndex === -1) {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    } else {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Recarregar a página após adicionar ao carrinho
    window.location.reload();
  };

  if (!product) {
    return null;
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-short-description">{product.short_description}</p>
          <p className="product-additional-info">{product.additional_information}</p>
          <p className="product-price">
            Price: ${product.price}{" "}
            {product.discount && (
              <span className="product-discount">
                (Discount: {product.discount}%)
              </span>
            )}
          </p>
          <p className="product-sku">SKU: {product.sku}</p>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-sizes">
        <h2>Available Sizes</h2>
        {Object.entries(product.sizes).map(([size, colors]) => (
          <div key={size} className="size">
            <h3>Size: {size}</h3>
            {Object.entries(colors).map(([color, quantity]) => (
              <p key={color}>
                {color}: {quantity} available
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
