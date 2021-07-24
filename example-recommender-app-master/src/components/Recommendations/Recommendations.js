import React, { memo, useEffect, useState } from "react";
import "./Recommendations.css";
import ProductCard from "components/ProductCard/ProductCard";
import products from "assets/products.json";

const API_TOKEN = "Token a52464f7152e6f50ef16be61586f8456d3c77b76"
const API_URL = "https://api.ubiops.com/v2.1";
const PROJECT_NAME = "recommender-engine-capstone";
const DEPLOYMENT_NAME = "recommender-model-apriori";
const DEPLOYMENT_VERSION = "v1";

async function postRequest(url = "", data = {}) {
  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_TOKEN,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const Recommendations = ({ product }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    postRequest(
      `/projects/${PROJECT_NAME}/deployments/${DEPLOYMENT_NAME}/versions/${DEPLOYMENT_VERSION}/request?timeout=3600`,
      { clicked_product: product }
    ).then((response) => setRecommendations(response.result.recommendation));

    return () => {
      setRecommendations([]);
    };
  }, [product]);

  return (
    <div className="recommendations">
      <h3 className="recommendations__title">Products related to this item</h3>
      <div className="recommendations__list">
        {recommendations.map((recommendation, key) => (
          <ProductCard
            product={recommendation}
            id={products.findIndex((product) => product === recommendation)}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Recommendations);
