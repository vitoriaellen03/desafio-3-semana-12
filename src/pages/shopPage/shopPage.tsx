import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import data from "../../../db.json";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState(data.products);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [inputValue, setInputValue] = useState(16);
  const [sortOrder, setSortOrder] = useState("default");
  const [cart, setCart] = useState([]);

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
      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

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
      <div>
        <button onClick={() => setShowFilterPopup(true)}>
          <img src="../../../../../assets/img/filter.svg" alt="" />
          Filter
        </button>
      </div>

      {showFilterPopup && (
        <div>
          <div>
            <h3>Filter by Category</h3>
            <button onClick={() => filterByCategory("")}>All Categories</button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filterByCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
            <button onClick={() => setShowFilterPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <div>
        <label>
          Products per Page:
          <input
            type="number"
            value={inputValue}
            onChange={handleProductsPerPageChange}
            min="0"
          />
        </label>
      </div>

      <div>
        <p>
          Showing {indexOfFirstProduct + 1}–{indexOfLastProduct} of {products.length} results
        </p>
      </div>

      <div>
        <label>
          Sort by Price:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="products">
          {productsPerPage === 0 ? (
            <p>No products available.</p>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="product-gb" key={product.id}>
                <Link to={`/shop/product/${product.id}`}>
                  <div>
                    <img className="image" src={product.image} alt={product.name} />
                    <h4 className="name">{product.name}</h4>
                    <p>{product.short_description}</p>
                    <p className="price">Rs{product.price}</p>
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
            <p>No products found.</p>
          )}

          <div>
            {currentPage > 1 && (
              <button onClick={prevPage}>
                Prev
              </button>
            )}

            {generatePageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            {currentPage < totalPages && (
              <button onClick={nextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
