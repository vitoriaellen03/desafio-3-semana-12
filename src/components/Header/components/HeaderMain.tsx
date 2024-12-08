import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import FilterShop from "../../../pages/shopPage/FilterShop";

const HeaderMain: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    const fetchProductName = () => {
      if (location.pathname.includes("/product/")) {
        const nameElement = document.querySelector(".product-name");
        if (nameElement) {
          setProductName(nameElement.textContent || "");
        }
      }
    };

    fetchProductName();
    window.addEventListener("load", fetchProductName);

    return () => {
      window.removeEventListener("load", fetchProductName);
    };
  }, [location.pathname]);

  const hideHeader =
    pathParts[0] === "product" && pathParts.length === 1 ||
    location.pathname === "/error" ||
    location.pathname === "/login" ||
    location.pathname === "/protected-error" ||
    location.pathname.includes("/product/") ||
    location.pathname === "*";

  const title =
    pathParts.includes("product") && pathParts.length > 1
      ? productName || pathParts[pathParts.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
      : (pathParts[pathParts.length - 1] || "Home")
        .replace(/\b\w/g, (char) => char.toUpperCase());

  const productId = pathParts[pathParts.length - 1];
  const productLink = `/shop/product/${productId}`;

  const breadcrumbs = [
    { label: "Home", link: "/" },
    ...(pathParts.includes("shop")
      ? [
        { label: "Shop", link: "/shop" },
        ...(pathParts.includes("product") && pathParts.length > 1
          ? [
            {
              label: productName || title,
              link: productLink,
            },
          ]
          : []),
      ]
      : pathParts.map((part, index) => {
        const link = "/" + pathParts.slice(0, index + 1).join("/");
        return { label: part.charAt(0).toUpperCase() + part.slice(1), link };
      })),
  ];

  const isHomePage = location.pathname === "/";
  const isProductPage = location.pathname.includes("/product/");
  const isShopPage = location.pathname === "/shop"; // Verifica se está na página shop

  return (
    <section>
      {isHomePage && (
        <div className="home-section">
          <div className="sec-main">
            <div className="cont-main">
              <div className="items-main">
                <h4 className="subtitle-main">New Arrival</h4>
                <h1 className="title-main">Discover Our New Collection</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
              </div>
              <div>
                <Link to='/shop' className="btn-main">Buy Now</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProductPage && (
        <div className="product-section cont-conteiner">
          <div className="sec-conteiner">
            <ul className="breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="breadcrumb-item">
                  <Link to={crumb.link} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && " > "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!isHomePage && !hideHeader && (
        <div className="header-navgatepage">
          <div className="h-main">
            {location.pathname !== "/home" &&
              location.pathname !== "/error" &&
              location.pathname !== "/protected-error" &&
              !location.pathname.includes("/product/") &&
              !location.pathname.includes("/shop/product/") && (
                <>
                  <img src="../../assets/img/logo.svg" alt="logo for site" className="logo" />
                  <h2 className="title-page">{title}</h2>
                </>
              )}
            <ul className="breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="breadcrumb-item">
                  <Link to={crumb.link} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && " > "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isShopPage && <FilterShop />
      }
    </section>
  );
};

export default HeaderMain;
