import React from "react";
import { productStyles } from "../styles/product.styles";
import { data } from "../data/data";

export const ProductList = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {
  const onAddToCart = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setAllProducts(products);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }

    setTotal(total + product.price);
    setCountProducts(countProducts + 1);
  };

  return (
    <main
      className={productStyles.layout}
      data-purpose="book-listing-container"
    >
      <section>
        <div className={productStyles.grid}>
          {data.map((product) => (
            <article
              className={productStyles.card}
              data-purpose="book-card"
              key={product.id}
            >
              <div className={productStyles.imageWrapper}>
                <img
                  alt={product.title}
                  className={productStyles.image}
                  src={product.urlImage}
                />
              </div>
              <div className={productStyles.content}>
                <div>
                  <h2 className={productStyles.title}>{product.title}</h2>
                  <p className={productStyles.author}>{product.author}</p>
                </div>
                <div className={productStyles.footer}>
                  <span className={productStyles.price}>${product.price}</span>
                  <button
                    className={productStyles.addButton}
                    data-purpose="add-to-cart-btn"
                    onClick={() => onAddToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
