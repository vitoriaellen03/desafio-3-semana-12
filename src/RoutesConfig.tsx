import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import ShopPage from './pages/shopPage/shopPage';
import ContactPage from './pages/contactPage/contactPage';
import ProductPage from './pages/productPage/productPage';
import CartPage from './pages/cartPage/cartPage';
import CheckoutPage from './pages/checkoutPage/checkoutPage';
import PageNotFound from './components/Error/PageNotFound';
import ProtectedRouteError from './components/Error/ProtectedRouteError';

const RoutesConfig: React.FC = () => {
  const isValidProductRoute = (path: string) => path.startsWith('/shop/product');
  const isValidCartRoute = (path: string) => path === "/cart";
  const isValidCheckoutRoute = (path: string) => path === "/checkout";

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/shop/product/:id"
        element={
          <RouteGuard isValidRoute={isValidProductRoute(window.location.pathname)} redirectTo="/error">
            <ProductPage />
          </RouteGuard>
        }
      />

      <Route
        path="/cart"
        element={
          <RouteGuard isValidRoute={isValidCartRoute(window.location.pathname)} redirectTo="/error">
            <CartPage />
          </RouteGuard>
        }
      />

      <Route
        path="/cart/checkout"
        element={
          <RouteGuard isValidRoute={isValidCheckoutRoute(window.location.pathname)} redirectTo="/protected-error">
            <CheckoutPage />
          </RouteGuard>
        }
      />

      <Route path="/error" element={<PageNotFound />} />
      <Route path="/protected-error" element={<ProtectedRouteError />} />
      
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default RoutesConfig;
