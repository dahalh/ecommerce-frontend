import React from "react";
import "./App.css";
import RegistrationPage from "./pages/register-login/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/register-login/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerification from "./pages/register-login/EmailVerification";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import Categories from "./pages/categories/Categories";
import Product from "./pages/product/Product";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";
import PaymentMethod from "./pages/payment-method/PaymentMethod";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* private route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/products" element={<Product />} />
          <Route path="/product/new" element={<NewProduct />} />
          <Route path="/product/edit/:_id" element={<EditProduct />} />

          <Route path="/payments" element={<PaymentMethod />} />

          {/* public routers */}

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin/verify-email" element={<EmailVerification />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
