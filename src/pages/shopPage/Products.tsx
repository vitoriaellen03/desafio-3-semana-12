import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({
  products,
  handleAddToCart,
  currentPage,
  productsPerPage,
  loading
}: {
  products: any[];
  handleAddToCart: (product: any) => void;
  currentPage: number;
  productsPerPage: number;
  loading: boolean;
}) => {
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  
  return (
    <div className="products">
      {loading ? (
        <p>Loading...</p>
      ) : currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <div className="product-gb" key={product.id}>
            <Link to={`/shop/product/${product.id}`}>
              <div>
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-name">
                <p>{product.name}</p>
              </div>
            </Link>
            <div className="product-price">
              <p>Rs. {product.price}</p>
              <div className="hoverbtns">
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <div className="btns">
                  <button>Share</button>
                  <button>Compare</button>
                  <button>Like</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
