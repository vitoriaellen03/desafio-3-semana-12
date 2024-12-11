import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import data from "../../../db.json";
import { Link } from "react-router-dom";
import FilterShop from "./FilterShop";
import './shopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState(data.products);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [inputValue, setInputValue] = useState(16);
  const [sortOrder, setSortOrder] = useState("default");
  const [cart, setCart] = useState([]);
  const [layout, setLayout] = useState("grid");

  const categories = data.categories;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const filterByCategory = (categoryId) => {
    setLoading(true);
    setTimeout(() => {
      if (categoryId) {
        setProducts(data.products.filter((product) => product.category_id === categoryId));
      } else {
        setProducts(data.products);
      }
      setLoading(false);
      setShowFilterPopup(false);
      setCurrentPage(1);
    }, 1000);
  };

  const handleAddToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      const existingProduct = cart.find((item) => item.id === product.id);
      const updatedCart = existingProduct
        ? cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
        : [...cart, { ...product, quantity: 1 }];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setLoading(false);
      window.location.reload();
    }, 1000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLoading(false);
      }, 1000);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setLoading(false);
      }, 1000);
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage === totalPages) {
      for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const handleProductsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInputValue(value);
    setLoading(true);
    setTimeout(() => {
      if (value > 0) {
        setProductsPerPage(value);
        setCurrentPage(1);
      } else {
        setProductsPerPage(0);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    setLoading(true);
    setTimeout(() => {
      if (order === "default") {
        setProducts(data.products);
      } else {
        const sortedProducts = [...products];
        if (order === "asc") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div id="c-shop-page">
      <FilterShop
        showFilterPopup={showFilterPopup}
        setShowFilterPopup={setShowFilterPopup}
        categories={categories}
        filterByCategory={filterByCategory}
        inputValue={inputValue}
        handleProductsPerPageChange={handleProductsPerPageChange}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
        productsLength={products.length}
        setLayout={setLayout} 
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="cont-conteiner">
          <div className="sec-conteiner">
            <div className={`products ${layout}`}>
              {productsPerPage === 0 ? (
                <p>No products available.</p>
              ) : currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  const discountPrice = product.price - (product.price * product.discount / 100);
                  return (
                    <div className="product-gb" key={product.id}>
                      <Link to={`/shop/product/${product.id}`}>
                        <img className="product-image" src={product.image} alt={product.name} />
                        <div className="group">
                          <h4 className="product-name">{product.name}</h4>
                          <p className="short-description">{product.short_description}</p>
                          <p className="description">{product.description}</p>
                          <p className="description large">{product.large_description}</p>
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
                              <i className="bx bx-heart"></i>
                              Like
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
