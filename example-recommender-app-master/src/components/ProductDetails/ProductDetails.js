import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter, generatePrice } from "utils";
import products from "assets/products.json";
import productImage from "assets/images/product.png";

import {
  PrimaryButton,
  Price,
  Recommendations,
  SecondaryButton,
  Link,
} from "components";
import { CartContext } from "App";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products[id];
  const [, setCartItems] = useContext(CartContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(generatePrice().toString());
  }, [id]);

  return (
    <div>
      <Link to="/">
        <SecondaryButton startIcon="icon-arrow-left">Back</SecondaryButton>
      </Link>
      <div className="product-details">
        <div className="product-details__illustration">
          <img src={productImage} alt={product} />
        </div>
        <div className="product-details__content">
          <h1 className="product-details__title">
            {capitalizeFirstLetter(product)}
          </h1>
          <Price>€ {price}</Price>
          <PrimaryButton
            className="product-details__cart-button"
            startIcon="icon-shopping-cart"
            onClick={() => setCartItems((prevState) => prevState + 1)}
          >
            Add to cart
          </PrimaryButton>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
            orci ac auctor augue mauris. Et tortor consequat id porta nibh
            venenatis cras sed.
          </p>
          <p>
            Nibh praesent tristique magna sit amet purus gravida quis. Viverra
            nam libero justo laoreet. Dui accumsan sit amet nulla facilisi morbi
            tempus. Mi tempus imperdiet nulla malesuada.
          </p>
        </div>
      </div>

      <Recommendations product={product} />
    </div>
  );
};

export default ProductDetails;
