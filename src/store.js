import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice";
import systemReducer from "./system-state/systemSlice";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/categories/categorySlice";
import productReducer from "./pages/product/productSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: systemReducer,
    admin: adminReducer,
    category: categoryReducer,
    products: productReducer,
  },
});

export default store;
