import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Menu.css";
import axios from "axios";

const Item = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Fetch products with proper loading state management
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Always set loading to true initially to prevent flash
        setLoading(true);

        const response = await axios.get(
          "https://watch-backend-78qk.onrender.com/api/products"
        );

        // Set products immediately
        setProducts(response.data);
        setFilteredProducts(response.data);
        setError(null);

        // Check if this is first load for spinner timing
        const isFirstLoad = !sessionStorage.getItem("menuPageLoaded");

        if (isFirstLoad) {
          // First load → show spinner for 2.5 seconds
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("menuPageLoaded", "true");
          }, 700);
        } else {
          // Subsequent loads → show data immediately
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search filtering
  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    if (query) {
      setLoading(true);
      setTimeout(() => {
        const filtered = products.filter((item) =>
          item.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const addToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        "https://watch-backend-78qk.onrender.com/add-to-cart",
        {
          productId: product._id,
          image: product.image,
          title: product.name,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMessage(`${product.name} added to cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Already added item");
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="Herosection_1">
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px", width: "100%" }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Herosection_1">
        <div className="container">
          <div className="alert alert-danger text-center">❌ {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Toast Popup */}
      {showToast && <div className="toast-popup bg-dark">🛒 {toastMessage}</div>}

      {/* 🔹 Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductModal}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal-close" onClick={closeProductModal}>
              ×
            </button>
            <div className="product-modal-body">
              <div className="product-modal-image-container">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="product-modal-image"
                />
              </div>
              <div className="product-modal-info">
                <h2 className="product-modal-title">{selectedProduct.name}</h2>
                <p className="product-modal-description">{selectedProduct.description}</p>
                <div className="product-modal-price-section">
                  <h3 className="product-modal-price">₹{selectedProduct.price}</h3>
                  <button 
                    className="product-modal-add-btn"
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductModal();
                    }}
                  >
                    <span>🛒</span> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="Herosection_1">
        <div className="container">
          {/* Loader */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center my-5">
              <div className="spinner-border text-dark mb-4" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div
              className="alert alert-danger text-center mt-3 fw-bold mb-4 m-auto"
              style={{
                width: "18%",
                backgroundColor: "#e7414c",
              }}
            >
               No products found.
            </div>
          ) : (
            <div className="container" id="products1">
              {filteredProducts.map((item) => (
                <div 
                  key={item._id} 
                  className="watch-product-box"
                  onClick={() => openProductModal(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="watch-image-container">
                    <img className="watch-image" src={item.image} alt={item.name} />
                  </div>

                  <div className="watch-product-details">
                    <h2 className="watch-title">{item.name}</h2>
                    <p className="watch-description">{item.description}</p>
                    
                    <div className="watch-price-section">
                      <div className="watch-price-availability">
                        <h3 className="watch-price mb-3 text-dark">₹{item.price}</h3>
                      </div>
                      <button 
                        className="watch-add-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                      >
                        <span>🛒</span> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modern Footer */}
      <footer className="theme-footer pt-5 pb-3 fw-medium shadow-lg footer">
        <div className="container">
          <div className="row justify-content-start">
            {/* Contact Info Left Aligned */}
            <div className="col-md-5 mb-4 text-md-start text-center">
              <h5 className="text-uppercase fw-bold mb-3">
                Contact
              </h5>
              <p className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Surat, Gujarat
              </p>
              <p className="mb-2">
                <i className="far fa-envelope me-2"></i>
                vaghelaparth2005@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>
                +91 8735035021
              </p>
            </div>
          </div>

          <hr className=" border-secondary" />

          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 text-md-start text-center  mb-md-0">
              <p className="mb-0">
                Owned by:{" "}
                <strong className="text-decoration-none">
                Noob Ninjas
                </strong>
              </p>
            </div>

            {/* Social Icons Modernized */}
            <div className="col-md-6 text-md-end text-center">
              <ul className="list-inline mb-0">
                {[
                  { icon: "facebook-f", link: "#" },
                  { icon: "x-twitter", link: "#" },
                  { icon: "linkedin-in", link: "#" },
                  { icon: "instagram", link: "#" },
                  { icon: "youtube", link: "#" },
                ].map((social, idx) => (
                  <li className="list-inline-item mx-1" key={idx}>
                    <a
                      href={social.link}
                      className="social-icon d-inline-flex align-items-center justify-content-center rounded-circle"
                      aria-label={social.icon}
                    >
                      <i className={`fab fa-${social.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Item;
