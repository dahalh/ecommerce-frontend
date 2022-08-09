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
import ResetPassword from "./pages/register-login/ResetPassword";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Setting from "./pages/setting/Setting";
import Customers from "./pages/customers/Customers";
import Ratings from "./pages/ratings/Ratings";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* private route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <PrivateRoute>
                <NewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/edit/:_id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <PaymentMethod />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              // <PrivateRoute>
              <RegistrationPage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
          />
          <Route
            path="/ratings"
            element={
              <PrivateRoute>
                <Ratings />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:_id"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />

          {/* public routers */}

          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<ResetPassword />} />
          <Route path="/admin/verify-email" element={<EmailVerification />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
