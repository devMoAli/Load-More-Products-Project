import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const LoadMoreProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const skipRef = useRef(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${skipRef.current}`
      );
      const result = await response.json();
      console.log(result);
      if (result && result.products && result.products.length) {
        if (initialLoad) {
          setProducts(result.products);
          setInitialLoad(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...result.products]);
        }
        skipRef.current += 20;
        if (result.products.length < 20) {
          setDisableButton(true);
        }
      } else {
        setDisableButton(true);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMore = () => {
    fetchProducts();
  };

  return (
    <div className="container">
      <div className="product-container">
        {products.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}

      <div className="button-container">
        <button disabled={disableButton} onClick={loadMore}>
          Load More Products
        </button>
        {disableButton && <p>That's all Products for now!</p>}
      </div>
    </div>
  );
};

export default LoadMoreProducts;
