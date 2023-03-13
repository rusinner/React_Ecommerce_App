import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ herobanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{herobanner.smallText}</p>
        <h3>{herobanner.midText}</h3>
        <h1>{herobanner.largeText1}</h1>
        <img
          src={urlFor(herobanner.image)}
          alt="samsung smartphone"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/Samsung_Galaxy_Z_Fold4`}>
            <button type="button">{herobanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{herobanner.product}</h5>
            <p>{herobanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
