import React from "react";

import { client } from "../lib/client";
import Product from "../components/Product";
import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Explore.Do what you can't.</h2>
        <p>Best Selling Products</p>
      </div>
      <div className="products-container">
        {products?.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      <FooterBanner FooterBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
