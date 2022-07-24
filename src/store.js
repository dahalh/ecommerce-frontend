import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice";
import systemReducer from "./system-state/systemSlice";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/categories/categorySlice";
import productReducer from "./pages/product/productSlice";
import paymentMethodReducer from "./pages/payment-method/paymentMethodSlice";
import customerReducer from "./pages/customers/customerSlice";
import ratingReducer from "./pages/ratings/ratingSlice";
import orderReducer from "./pages/orders/orderSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: systemReducer,
    admin: adminReducer,
    category: categoryReducer,
    products: productReducer,
    paymentMethod: paymentMethodReducer,
    customers: customerReducer,
    ratings: ratingReducer,
    orders: orderReducer,
  },
});

export default store;
