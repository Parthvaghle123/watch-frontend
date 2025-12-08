import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import axios from "axios";

// 🔹 Static Product List - Watches
const products1 = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    title: "Tag Heuer Monaco",
    per: "Iconic square case chronograph. Racing heritage with bold design and precision engineering.",
    price: 1450,
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    title: "Rolex Submariner",
    per: "Legendary dive watch with robust construction. Water-resistant up to 300 meters.",
    price: 1000,
  },
  {
    id: 2,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/w/o/q/-original-imahfz23mgs7z3qs.jpeg?q=70",
    title: "TSHOT PREMIUM LIMITED",
    per: "The Moonwatch. Professional chronograph with legendary space exploration heritage.",
    price: 2800,
  },
  {
    id: 3,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/r/c/j/1-sleek-minimalist-design-arabic-dial-black-watch-for-men-iconic-original-imahgbphz4vgadfs.jpeg?q=70",
    title: "Luxury Matte Black ",
    per: "Fire-Boltt Axiom Smart Watch 1.43 AMOLED Display, Health & Fitness Tracking, Always-On Screen, Wireless Charging, Rotating Crown, Bluetooth Calling, Metal Case Watch for Man & Woman - Silver Whit",
    price: 1999,
  },
  {
    id: 4,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/x/6/p/1-sl-01-shivark-men-original-imahggzhzyxx83fg.jpeg?q=70",
    title: "Silicone Boys Analog Watch",
    per: "Elevate your everyday style with this sleek and modern black quartz wristwatch, designed for those who appreciate simplicity, elegance, and durability.",
    price: 1950,
  },
  {
    id: 5,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/j/n/2/1-silicone-belt-bluematrix-men-original-imahdubvpdxp2uds.jpeg?q=70",
    title: "Analog Watch",
    per: "Soft, lightweight, and comfortable for all-day wear. Ideal for casual or daily use.",
    price: 2200,
  },
];

const Item = () => {
  const [filteredProducts, setFilteredProducts] = useState(products1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Search Filter
  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    if (query) {
      setLoading(true);
      setTimeout(() => {
        const filtered = products1.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        setLoading(false);
      }, 800);
    } else {
      setFilteredProducts(products1);
    }
  }, [location.search]);

  // 🔹 Open Product Modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // 🔹 Close Product Modal
  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // 🔹 Add To Cart Function
  const addToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://watch-backend-ijad.onrender.com/add-to-cart",
        {
          productId: product.id.toString(),
          image: product.image,
          title: product.title,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMessage(`${product.title} added to cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // Close modal after adding to cart
      closeProductModal();
    } catch (error) {
      console.error(error);
      alert("Already added item");
    }
  };

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
                  alt={selectedProduct.title}
                  className="product-modal-image"
                />
              </div>
              <div className="product-modal-info">
                <h2 className="product-modal-title">{selectedProduct.title}</h2>
                <p className="product-modal-description">{selectedProduct.per}</p>
                <div className="product-modal-price-section">
                  <h3 className="product-modal-price">₹{selectedProduct.price}</h3>
                  <button 
                    className="product-modal-add-btn"
                    onClick={() => addToCart(selectedProduct)}
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
                  key={item.id} 
                  className="watch-product-box"
                  onClick={() => openProductModal(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="watch-image-container">
                    <img className="watch-image" src={item.image} alt={item.title} />
                  </div>

                  <div className="watch-product-details">
                    <h2 className="watch-title">{item.title}</h2>
                    <p className="watch-description">{item.per}</p>
                    
                    <div className="watch-price-section">
                      <div className="watch-price-availability">
                        <h3 className="watch-price mb-3 text-dark ">₹{item.price}</h3>                      </div>
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
    </>
  );
};

export default Item;
