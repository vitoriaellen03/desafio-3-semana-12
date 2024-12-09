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
    <div className="aling-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => {
              const discountPrice = product.price - (product.price * product.discount / 100);
              return (
                <div className="product-gb" key={product.id}>
                  <Link to={`/shop/product/${product.id}`}>
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="group">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="short-description">{product.short_description}</p>
                      <div className="price">
                        {product.isNew === true ? (
                          <>
                            <div className="new-label">New</div>
                            {product.discount > 0 ? (
                              <>
                                <div className="discounted-price">Rs. {(product.price - (product.price * product.discount) / 100).toFixed(2)}</div>
                                <div className="total-price">Rs. {product.price}</div>
                                <div className="discount-percentage">-{product.discount}%</div>
                              </>
                            ) : (
                              <div className="total-price">Rs. {product.price}</div>
                            )}
                          </>
                        ) : product.discount > 0 ? (
                          <>
                            <div className="discounted-price">Rs. {(product.price - (product.price * product.discount) / 100).toFixed(2)}</div>
                            <div className="total-price">Rs. {product.price}</div>
                            <div className="discount-percentage">-{product.discount}%</div>
                          </>
                        ) : (
                          <div className="total-price">Rs. {product.price}</div>
                        )}
                      </div>
                    </div>
                    <div className="product-price">
                      <button className="btncart" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                      <div className="hoverbtns">
                        <button>
                          <i className="bx bxs-share-alt"></i>
                          Share
                        </button>
                        <button>
                          <i className="bx bxs-bar-chart-alt-2"></i>
                          Compare
                        </button>
                        <button>
                          <i className='bx bx-heart'></i>
                          Like
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleProductDisplay;
