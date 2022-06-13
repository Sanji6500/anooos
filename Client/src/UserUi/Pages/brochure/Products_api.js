import "../brochure/product_card.css";
import { AiFillHeart } from "react-icons/ai";
import React from "react";

import { useAxiosGet } from "../Hooks/HttprRequeste";

function Products_api() {
  let content = null;
  const url = "/merchants/allproducts";

  let products = useAxiosGet(url);
  if (products.errors) {
    content = <p>there was an error please refresh of try to login </p>;
  }

  // if (products.loading) {
  //   <CircleLoader color="0477FF" loading={products.loading} />;
  // }
  // if (!products.loading) {
  //   <CircleLoader color="0477FF" loading={!products.loading} size={150} />;
  // }

  if (products.data) {
    content = products.data.map((product) => (
      <div className="productCard" key={product._id}>
        <div className="productImage">
          <img
            alt=""
            src={"http://localhost:6500/" + product.product_id.productImages}
          />
          <ul className="Action">
            <li>
              <AiFillHeart />
            </li>
          </ul>
        </div>
        <div className="productName">
          <h3>{product.product_id.productName}</h3>
        </div>
        <div className="price">
          <div className="Discount">
            <span className="priceBeforDiscount">
              {product.priceBeforeDiscount}
            </span>
            <span className="currency">€</span>
          </div>
          <div className="afterDiscount">
            <span className="priceAfterDiscount ">
              {product.priceAfterDiscount}
            </span>
            <span className="currency">€</span>
          </div>
        </div>
      </div>
    ));
  }

  return <div className="productContent">{content}</div>;
}

export default Products_api;
