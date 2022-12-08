import React from "react";

import { Product, FooterBanner, Herobanner } from "../components";

const Home = () => {
  return (
    <>
      <Herobanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {["Product 1", " Product 2"].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
