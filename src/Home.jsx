import React from "react";
import Images from "./Images";
import "./css/Home.css";
import Item from "./Item";
const Home = () => {
  return (
    <>
      {/* Carousel Section */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleControls"
              className="carousel slide mt-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://hodinkee.imgix.net/uploads/images/caf162dd-5dfe-4c10-9236-65a8e58e6328/rolex_cpo_banner_submariner-1995_09_outils_sssceau_rvb_30pc.png?ixlib=rails-1.1.0&fm=jpg&q=55&auto=format&usm=12"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="Luxury Watch Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://m.media-amazon.com/images/G/31/IMG24/Smart_Watches/META_RAYBANGLASS_NOV25/1400X800_BXGY_2._SX1242_QL85_.jpg"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="Premium Timepieces"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://www.kapoorwatch.com/blogs/wp-content/uploads/Banner-89.webp"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="Elegant Watch Display"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Handcrafted Section */}
      <div className="Herosection_1">
        <div className="container">
          <h3 className="mt-5 pt-3 text-dark head fst-italic">
            Handcrafted Timepieces
          </h3>
          <Images />
        </div>
      </div>

      <div className="Herosection_2">
        <div className="container">
          {/* Heading and Button in one row */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="text-dark head fst-italic">Featured Collections</h3>

            <a
              href="/menu" // Replace with Link if using React Router
              className="btn btn-outline-dark btn-sm fw-bold"
            >
              View Menu
            </a>
          </div>
          <Item />
        </div>
      </div>

      {/* Enhanced Modern Footer */}
      <footer className="theme-footer pt-5 pb-3 fw-medium shadow-lg footer">
        <div className="container">
          <div className="row justify-content-start">
            {/* Contact Info Left Aligned */}
            <div className="col-md-5 mb-4 text-md-start text-center">
              <h5 className="text-uppercase fw-bold mb-3">Contact</h5>
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
                <strong className="text-decoration-none">Noob Ninjas</strong>
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

export default Home;
