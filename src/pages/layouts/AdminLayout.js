import React from "react";
import { AdminSidebar } from "../../components/admin-sidebar/AdminSidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* header section */}
      <Header />

      <AdminSidebar />
      {/* main content*/}
      <main className="main">{children}</main>

      <Footer />
      {/* footer section */}
    </div>
  );
};

export default AdminLayout;
