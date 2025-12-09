import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import axios from "axios";

// 🔹 Static Product List - Watches
const products1 = [
  {
    id: 0,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/l/2/f/-original-imaha8kabchjfqhe.jpeg?q=70",
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/l/2/f/-original-imaha8kabchjfqhe.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/c/t/5/-original-imahauh2fjnzckzt.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/i/e/v/-original-imaha8kahzd67ee5.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/q/6/r/-original-imaha8kagwh4zg4z.jpeg?q=70"
    ],
    title: "Fire-Boltt Ninja Pro Plus",
    per: "Iconic square case chronograph. Racing heritage with bold design and precision engineering.",
    price: 1450,
  },
  {
    id: 1,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/u/t/h/1-nf8047s-effortlessly-stylish-naviforce-men-original-imahgcj3e2dv6fag.jpeg?q=70",
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/u/t/h/1-nf8047s-effortlessly-stylish-naviforce-men-original-imahgcj3e2dv6fag.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/v/p/e/1-nf8047s-effortlessly-stylish-naviforce-men-original-imahgcj3arby8v94.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/t/v/e/1-nf8047s-effortlessly-stylish-naviforce-men-original-imahgcj3bdtangfk.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/d/y/x/1-nf8047s-effortlessly-stylish-naviforce-men-original-imahgcj3zwq5w67c.jpeg?q=70"
    ],
    title: "Rolex Submariner",
    per: "Legendary dive watch with robust construction. Water-resistant up to 300 meters.",
    price: 1000,
  },
  {
    id: 2,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/b/6/1/1-2309-luxury-chrono-dial-alix-men-original-imahf7w3kfp7gfg5.jpeg?q=70",
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/b/6/1/1-2309-luxury-chrono-dial-alix-men-original-imahf7w3kfp7gfg5.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/l/3/q/1-2309-luxury-chrono-dial-alix-men-original-imahf7w3gd4zbn9z.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/i/v/0/1-2309-luxury-chrono-dial-alix-men-original-imahf7w3wszbgzys.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/l/o/a/1-2309-luxury-chrono-dial-alix-men-original-imahf7w3ajswjzhg.jpeg?q=70",
    ],
    title: "Analog Watch Chronograph",
    per: "A premium silver chronograph watch featuring a striking blue dial with sporty detailing.",
    price: 2800,
  },
  {
    id: 3,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/b/i/f/1-9005-tevise-men-original-imahhc64hah5xe2r.jpeg?q=70",
    images: [
     "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/b/i/f/1-9005-tevise-men-original-imahhc64hah5xe2r.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/a/9/s/1-9005-tevise-men-original-imahhc64fe2fst3v.jpeg?q=70",
     "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/b/i/f/1-9005-tevise-men-original-imahhc64hah5xe2r.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/s/l/v/1-9005-tevise-men-original-imahhc64guqddh32.jpeg?q=70"
    ],
    title: "Luxurious sport Watch ",
    per: "A striking silver sports chronograph with a bold green dial and multi-function digital-analog display.",
    price: 2999,
  },
  {
    id: 4,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/h/u/i/-original-imah82pnswgua2vh.jpeg?q=70",
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/h/u/i/-original-imah82pnswgua2vh.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/t/w/a/-original-imah6efg47ffz9hv.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/j/j/g/-original-imah6efgh9ezfhdn.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/x/q/k/-original-imah6efgnckzygsc.jpeg?q=70"
    ],
    title: "Fire-Boltt Rise Bluetooth",
    per: "A modern silver smartwatch with a sleek rectangular display and advanced fitness tracking.",
    price: 1199,
  },
  {
    id: 5,
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/k/i/g/1-chrono-luxury-blue-rosegold-dualtone-ca-9839-cristiano-aillen-original-imahgg4gjhezh3de.jpeg?q=70",
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/k/i/g/1-chrono-luxury-blue-rosegold-dualtone-ca-9839-cristiano-aillen-original-imahgg4gjhezh3de.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/l/g/5/1-chrono-luxury-blue-rosegold-dualtone-ca-9839-cristiano-aillen-original-imahgg4gjacvgyww.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/1/m/8/1-chrono-luxury-blue-rosegold-dualtone-ca-9839-cristiano-aillen-original-imahgg4gfaahe6he.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/r/8/u/1-chrono-luxury-blue-rosegold-dualtone-ca-9839-cristiano-aillen-original-imahgg4ggdvzac5t.jpeg?q=70"
    ],
    title: " Luxury Sports Watch ",
    per: "Soft, lightweight, and comfortable for all-day wear. Ideal for casual or daily use.",
    price: 2899,
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages = selectedProduct
    ? (() => {
        const base = [selectedProduct.image];
        if (Array.isArray(selectedProduct.images) && selectedProduct.images.length) {
          for (const url of selectedProduct.images) {
            if (!base.includes(url)) base.push(url);
          }
        }
        while (base.length < 4) base.push(selectedProduct.image);
        return base.slice(0, 4);
      })()
    : [];

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
    setActiveImageIndex(0);
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
        "http://localhost:3001/add-to-cart",
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
              <div className="product-modal-left">
                <div className="product-modal-image-container">
                  <img 
                    src={productImages[activeImageIndex]} 
                    alt={selectedProduct.title}
                    className="product-modal-image"
                  />
                </div>
                <div className="product-modal-thumbs">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`product-modal-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`thumb-${idx}`} />
                    </button>
                  ))}
                </div>
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
