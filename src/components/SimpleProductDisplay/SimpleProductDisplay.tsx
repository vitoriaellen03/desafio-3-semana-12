import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import data from "../../../db.json";
import { Link } from "react-router-dom";

const SimpleProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(data.products.slice(0, 8));
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const handleAddToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      const existingProduct = cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setLoading(false);

      window.location.reload();
    }, 1000);
  };


  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-gb" key={product.id}>
                <Link to={`/shop/product/${product.id}`}>
                  <div>
                    <img
                      className="image"
                      src={product.image}
                      alt={product.name}
                    />
                    <h4 className="name">{product.name}</h4>
                    <p>{product.short_description}</p>
                    <p className="price">${product.price}</p>
                  </div>
                  <div>
                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                    <div>
                      <button>Share</button>
                      <button>Compare</button>
                      <button>Like</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleProductDisplay;
