import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { useUser } from '@clerk/clerk-react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const RoutesConfig: React.FC = () => {
  const { user } = useUser();
  const isLoggedIn = user || localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  const isValidProductRoute = (id: string) => !!id;
  const isValidCartRoute = (path: string) => path === "/cart";
  const isValidCheckoutRoute = (path: string) => path === "/cart/checkout";

  return (
    <>
      {loading && <LoadingSpinner />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/shop/product/:id"
          element={
            <RouteGuard isValidRoute={(routeParams: { id: string }) => isValidProductRoute(routeParams.id)} redirectTo="/error">
              <ProductPage />
            </RouteGuard>
          }
        />

        <Route
          path="/cart"
          element={
            <RouteGuard isValidRoute={() => isValidCartRoute(window.location.pathname)} redirectTo="/error">
              <CartPage />
            </RouteGuard>
          }
        />

        <Route
          path="/cart/checkout"
          element={
            isLoggedIn ? (
              <RouteGuard isValidRoute={() => isValidCheckoutRoute(window.location.pathname)} redirectTo="/protected-error">
                <CheckoutPage />
              </RouteGuard>
            ) : (
              <Navigate to="/protected-error" replace />
            )
          }
        />

        <Route path="/error" element={<PageNotFound />} />
        <Route path="/protected-error" element={<ProtectedRouteError />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </>
  );
};

export default RoutesConfig;
