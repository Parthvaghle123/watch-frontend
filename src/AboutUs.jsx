import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/AboutUs.css";

const AboutUs = () => {
  const watchDetails = [
    {
      id: 1,
      name: "Rolex Submariner",
      description: "The Rolex Submariner is a line of sports watches designed for diving and manufactured by Rolex, known for its robustness and reliability.",
      features: [
        "Water-resistant up to 300 meters",
        "Automatic movement",
        "Ceramic bezel",
        "Luminous markers",
        "Oystersteel construction"
      ],
      price: "₹3500.00",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
    },
    {
      id: 2,
      name: "Tag Heuer Monaco",
      description: "The Tag Heuer Monaco is an iconic square-cased chronograph watch, famous for its association with motorsports and Steve McQueen.",
      features: [
        "Square case design",
        "Chronograph function",
        "Racing heritage",
        "Automatic movement",
        "Sapphire crystal"
      ],
      price: "₹2500.00",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    },
    {
      id: 3,
      name: "Omega Speedmaster",
      description: "The Omega Speedmaster, also known as the Moonwatch, is the watch worn during the first moon landing and is NASA's official watch.",
      features: [
        "Moonwatch heritage",
        "Professional chronograph",
        "Tachymeter scale",
        "Manual winding",
        "Space-tested reliability"
      ],
      price: "₹4000.00",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/x/6/p/1-sl-01-shivark-men-original-imahggzhzyxx83fg.jpeg?q=70"
    },
    {
      id: 4,
      name: "Luxury Matte Black",
      description: "A sleek and modern timepiece featuring a minimalist design with premium materials and exceptional craftsmanship.",
      features: [
        "Matte black finish",
        "Arabic dial",
        "Leather strap",
        "Quartz movement",
        "Elegant design"
      ],
      price: "₹3000.00",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/r/c/j/1-sleek-minimalist-design-arabic-dial-black-watch-for-men-iconic-original-imahgbphz4vgadfs.jpeg?q=70"
    }
  ];

  return (
    <>
      <div className="about-us-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="about-title">About Watch Store</h1>
                <p className="about-subtitle">
                  Your Premier Destination for Luxury Timepieces
                </p>
                <p className="about-description">
                  Welcome to Watch Store, where time meets elegance. We are passionate about 
                  bringing you the finest collection of luxury watches from renowned brands 
                  around the world. Our commitment to quality, authenticity, and exceptional 
                  customer service has made us a trusted name in the watch industry.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="hero-image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                    alt="Luxury Watch"
                    className="hero-watch-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="our-story-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="section-title">Our Story</h2>
                <div className="title-underline"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="story-card">
                  <div className="story-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3>Heritage & Excellence</h3>
                  <p>
                    With decades of experience in the watch industry, we have curated 
                    a collection that represents the pinnacle of horological artistry. 
                    Each timepiece in our store is carefully selected for its quality, 
                    craftsmanship, and timeless appeal.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="story-card">
                  <div className="story-icon">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <h3>Authenticity Guaranteed</h3>
                  <p>
                    We guarantee the authenticity of every watch we sell. All our 
                    timepieces come with official documentation, warranty, and our 
                    commitment to your satisfaction. Your trust is our most valuable asset.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="story-card">
                  <div className="story-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3>Expert Service</h3>
                  <p>
                    Our team of watch experts is dedicated to helping you find the 
                    perfect timepiece. From selection to after-sales service, we're 
                    here to ensure your watch-buying experience is exceptional.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="story-card">
                  <div className="story-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h3>Passion for Timepieces</h3>
                  <p>
                    We don't just sell watches; we share a passion for horology. Every 
                    watch tells a story, and we're here to help you find the one that 
                    speaks to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Watches Section */}
        <div className="featured-watches-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="section-title">Featured Watch Collections</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">
                  Discover our handpicked selection of premium timepieces
                </p>
              </div>
            </div>
            <div className="row">
              {watchDetails.map((watch) => (
                <div key={watch.id} className="col-lg-6 col-md-6 mb-4">
                  <div className="watch-detail-card">
                    <div className="watch-image-container">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="watch-detail-image"
                      />
                    </div>
                    <div className="watch-detail-content">
                      <h3 className="watch-detail-name">{watch.name}</h3>
                      <p className="watch-detail-description">{watch.description}</p>
                      <div className="watch-features">
                        <h4 className="features-title">Key Features:</h4>
                        <ul className="features-list">
                          {watch.features.map((feature, index) => (
                            <li key={index}>
                              <i className="fas fa-check-circle"></i> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="watch-price-badge">
                        <span className="price-label">Starting from</span>
                        <span className="price-value text-white">{watch.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="title-underline"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="feature-box">
                  <i className="fas fa-shield-alt"></i>
                  <h4>Authentic Products</h4>
                  <p>100% genuine watches with official documentation</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="feature-box">
                  <i className="fas fa-truck"></i>
                  <h4>Free Shipping</h4>
                  <p>Complimentary shipping on all orders</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="feature-box">
                  <i className="fas fa-tools"></i>
                  <h4>Expert Service</h4>
                  <p>Professional maintenance and repair services</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="feature-box">
                  <i className="fas fa-headset"></i>
                  <h4>24/7 Support</h4>
                  <p>Round-the-clock customer assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="about-contact-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="section-title">Visit Our Store</h2>
                <div className="title-underline"></div>
                <div className="contact-info">
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Surat, Gujarat, India
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> vaghelaparth2005@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone"></i> +91 8735035021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default AboutUs;

