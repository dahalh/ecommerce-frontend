import React from "react";
import { Container } from "react-bootstrap";
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
      <Container>
        <main className="main">{children}</main>
      </Container>

      <Footer />
      {/* footer section */}
    </div>
  );
};

export default AdminLayout;
