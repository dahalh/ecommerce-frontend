import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* header section */}
      <Header />

      {/* main content*/}
      <main className="main">{children}</main>

      <Footer />
      {/* footer section */}
    </div>
  );
};
