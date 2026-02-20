import React, { useState } from "react";
import { headerStyles } from "../styles/header.styles";
import { cartStyles } from "../styles/cart.styles";
import { CircleX, ShoppingCart, ShoppingBag } from "lucide-react";

export const Header = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onClearCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <header className={headerStyles.header} data-purpose="main-header">
      <h1 className={headerStyles.title}>Tienda de Libros</h1>

      <div
        className={headerStyles.cartTrigger}
        data-purpose="cart-icon-container"
        id="cart-trigger"
        onClick={() => setActive(!active)}
      >
        <ShoppingCart className={headerStyles.cartIcon} />
        <span className={headerStyles.badge} id="cart-count">
          {countProducts}
        </span>
      </div>

      <div
        className={`${cartStyles.dropdown} ${active ? "" : "modal-hidden"}`}
        data-purpose="cart-dropdown"
        id="cart-modal"
      >
        <div id="cart-items-container">
          {allProducts.length > 0 ? (
            <div className={cartStyles.section} id="cart-filled-state">
              <div className={cartStyles.sectionTitle}>Tu carrito</div>
              <div className={cartStyles.itemsList}>
                {allProducts.map((product) => (
                  <div className={cartStyles.itemRow} key={product.id}>
                    
                    {/* ---MEJORA: Agregamos la imagen en el carrito --- */}
                    <img 
                      src={product.urlImage} 
                      alt={product.title} 
                      style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} 
                    />
                    
                    <div className="flex-1">
                      <div className={cartStyles.itemContainer}>
                        <span className={cartStyles.itemTitle}>
                          {product.quantity}x {product.title}
                        </span>
                        <span className={cartStyles.itemPrice}>
                          ${product.price * product.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      className={cartStyles.removeBtn}
                      data-purpose="remove-item"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <CircleX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className={cartStyles.totalRow}>
                <span className={cartStyles.totalLabel}>Total:</span>
                <span className={cartStyles.totalValue}>${total}</span>
              </div>

              <div className={cartStyles.actions}>
                <button
                  className={cartStyles.clearBtn}
                  id="clear-cart"
                  onClick={onClearCart}
                >
                  Vaciar Carrito
                </button>
                <button className={cartStyles.payBtn}>Pagar</button>
              </div>
            </div>
          ) : (
            <div className={cartStyles.emptyState} id="cart-empty-state">
              <ShoppingBag className={cartStyles.emptyIcon} />
              <p className={cartStyles.emptyText}>El carrito está vacío</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
