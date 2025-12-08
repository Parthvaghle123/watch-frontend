import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Cart.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Check if token exists
      if (!token) {
        alert("Please login to view your cart");
        navigate("/login");
        return;
      }

      const res = await axios.get("https://watch-backend-78qk.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cart = res.data.cart || [];
      setCartItems(cart);
      const total = cart.reduce((sum, item) => sum + item.total, 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to update cart");
        navigate("/login");
        return;
      }
      await axios.put(
        `https://watch-backend-78qk.onrender.com/update-quantity/${productId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to remove items from cart");
        navigate("/login");
        return;
      }
      await axios.delete(
        `https://watch-backend-78qk.onrender.com/remove-from-cart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">🛒 Shopping Cart</h1>
        <p className="cart-subtitle">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-text">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/menu" className="btn-shop-now">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            {cartItems.map((item, index) => (
              <div key={item.productId} className="cart-item-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="cart-item-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">₹{item.price} per item</p>
                  
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.productId, "decrease")}
                      className="quantity-btn quantity-btn-decrease"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, "increase")}
                      className="quantity-btn quantity-btn-increase"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total-section">
                  <div className="cart-item-total">
                    <span className="total-label">Total</span>
                    <span className="total-amount text-dark">₹{item.total}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="btn-remove-item"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">₹{totalAmount}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">Free</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row summary-total">
                  <span className="summary-label">Total</span>
                  <span className="summary-value">₹{totalAmount}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-checkout">
                Proceed to Checkout
              </Link>
              
              <Link to="/menu" className="btn-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
