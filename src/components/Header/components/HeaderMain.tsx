import React from "react";
import { useLocation, Link } from "react-router-dom";

const HeaderMain: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  const hideHeader =
    pathParts[0] === "product" && pathParts.length === 1 || 
    location.pathname === "/error" || 
    location.pathname === "/login" || 
    location.pathname === "/protected-error" || 
    location.pathname.includes("/product/") ||
    location.pathname === "*";

  const title =
    pathParts.includes("product") && pathParts.length > 1
      ? pathParts[pathParts.length - 1].replace(/-/g, " ")
      : pathParts[pathParts.length - 1] || "Home";

  const breadcrumbs = [
    { label: "Home", link: "/" },
    ...(pathParts.includes("shop")
      ? [
          { label: "Shop", link: "/shop" },
          ...(pathParts.includes("product") && pathParts.length > 1
            ? [
                {
                  label: title,
                  link: location.pathname,
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

  return (
    <>
      {!isHomePage && !hideHeader && (
        <div className="header-main">
          <main className="header-conteins">
            <section className="header-page">
              <div className="header-navgatepage">
                {(location.pathname !== "/home" && 
                  location.pathname !== "/error" && 
                  location.pathname !== "/protected-error" && 
                  !location.pathname.includes("/product/") && 
                  !location.pathname.includes("/shop/product/")) && 
                  <h2 className="title-page">{title}</h2>}
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
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default HeaderMain;
