import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../../../db.json";
import './productPage.css';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("description");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const selectedProduct = data.products.find((prod: any) => prod.id === id);
    setProduct(selectedProduct);
    const productCategory = data.categories.find(
      (category: any) => category.id === selectedProduct?.category_id
    );
    setCategory(productCategory);
  }, [id]);

  const handleAddToCart = (product: any) => {
    if (!selectedSize || !selectedColor) {
      setError("Please select both size and color");
      return;
    }

    const availableStock = product.sizes[selectedSize][selectedColor];

    if (selectedQuantity > availableStock) {
      setError(`Only ${availableStock} items are available in this size and color.`);
      return;
    }

    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);
    let updatedCart;

    if (existingProductIndex === -1) {
      updatedCart = [...cart, { ...product, quantity: selectedQuantity, size: selectedSize, color: selectedColor }];
    } else {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += selectedQuantity;
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
    setError("");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getAvailableSizes = () => {
    return Object.keys(product.sizes);
  };

  const getAvailableColors = () => {
    if (selectedSize) {
      return Object.keys(product.sizes[selectedSize]);
    }
    return [];
  };

  const getAvailableStock = () => {
    if (selectedSize && selectedColor) {
      return product.sizes[selectedSize][selectedColor];
    }
    return 0;
  };

  const incrementQuantity = () => {
    if (selectedQuantity < getAvailableStock()) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSelectedColor(null);
    setSelectedQuantity(1);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getTotalStock = (product: any) => {
    if (!product || !product.sizes) {
      return 0;
    }

    let totalStock = 0;
    for (const size in product.sizes) {
      for (const color in product.sizes[size]) {
        totalStock += product.sizes[size][color];  // Sum up the stock for each color/size combination
      }
    }

    return totalStock;
  };

  const totalAvailableStock = getTotalStock(product);
  const outOfStock = totalAvailableStock === 0;

  if (!product) {
    return <div>Product not found</div>;
  }

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="product-page">
      <header className="cont-conteiner">
        <nav className="sec-conteiner">
          <div className="breadcrumbs-container">
            <ul className="breadcrumbs">
              <li><Link to="/">Home</Link> &gt; </li>
              <li><Link to="/shop">Shop</Link></li>
              <li>{product.name}</li>
            </ul>
          </div>
        </nav>
      </header>


      <div className="cont-conteiner">
        <div className="sec-conteiner">
          <div className="product-details">
            <div className="image-carousel">
              <div className="carousel-container">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`product-image`}
                  className="carousel-image"
                />
                {hasMultipleImages && (
                  <div className="image-thumbnails">
                    {product.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`product-thumbnail-${index}`}
                        className={`thumbnail-image ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => handleImageChange(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="product-info">
              <h1 className="product-name">{product.name}</h1>
              <h3 className="price-p">Rs. {product.price}</h3>

              <div className="prd-avai">
                <img src="/assets/img/star.png" alt="star" />
                <p>5 Customer Reviews</p>
              </div>

              <p className="product-short-description">{product.short_description}</p>

              <div className="size-options">
                <h4>Size</h4>
                {getAvailableSizes().map((size) => (
                  <span
                    key={size}
                    className={size === selectedSize ? "active" : ""}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>

              <div className="color-options">
                <h4>Color</h4>
                {getAvailableColors().map((color) => (
                  <span
                    key={color}
                    className="color-circle"
                    style={{ backgroundColor: color, border: color === selectedColor ? '2px solid #B88E2F' : '2px solid gray' }}
                    onClick={() => setSelectedColor(color)}
                  ></span>
                ))}
              </div>

              {error && <div className="error-message">{error}</div>}

              {outOfStock ? (
                <div className="out-of-stock">
                  Out of stock
                </div>
              ) : (
                <div className="add-to-cart">
                  <div className="quantity-control">
                    <button onClick={decrementQuantity} className="quantity-btn">-</button>
                    <span className="quantity-display">{selectedQuantity}</span>
                    <button onClick={incrementQuantity} className="quantity-btn">+</button>
                  </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                    disabled={getAvailableStock() === 0}
                  >
                    Add To Cart
                  </button>
                </div>
              )}

              <div className="product-metadata">
                <p>SKU: {product.sku}</p>
                {category && <p>Category: {category.name}</p>}
                <p className="tags">
                  Tags: {product.tags.map((tag) => (
                    <span key={tag}>{tag};</span>
                  ))}
                </p>
                <p className="share-icons">
                  Share:

                  <a
                    href="http://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className='bx bxl-facebook-circle'></i>
                  </a>

                  <a
                    href="http://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className='bx bxl-instagram' ></i>
                  </a>
                  <a
                    href="http://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className='bx bxl-linkedin-square' ></i>
                  </a>

                </p>
              </div>
            </div>
          </div>

          <div className="product-tabs">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "additional" ? "active" : ""}
              onClick={() => handleTabClick("additional")}
            >
              Additional Information
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && <p>{product.large_description}
              <div className="grop-p">
                <img src="/assets/img/br-prod.jpg" alt="" />
                <img src="/assets/img/br-prod.jpg" alt="" />
              </div>
            </p>}
            {activeTab === "additional" && <p>{product.additional_information}</p>}
          </div>



          <div className="related-products">
            <h2 className="related-products-title">Related Products</h2>
            <div className="c-carousel-container">
              {data.products.slice(0, 4).map((related) => (
                <div key={related.id} className="product-gb">
                  <Link to={`/shop/product/${related.id}`} className="product-link">
                    <img src={related.image} alt={related.name} className="product-image" />
                    <div className="group">
                      <h4 className="product-name">{related.name}</h4>
                      <p className="short-description">{related.short_description}</p>
                      <div className="price">
                        {related.isNew && (
                          <div className="new-label">New</div>
                        )}
                        {related.discount > 0 ? (
                          <>
                            <div className="discounted-price">
                              Rs. {(related.price - (related.price * related.discount) / 100).toFixed(2)}
                            </div>
                            <div className="total-price">Rs. {related.price}</div>
                            <div className="discount-percentage">-{related.discount}%</div>
                          </>
                        ) : (
                          <div className="total-price">Rs. {related.price}</div>
                        )}
                      </div>
                    </div>
                    <div className="product-price">
                      <button className="btncart" onClick={() => handleAddToCart(related)}>
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
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
