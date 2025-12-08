import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import "./css/Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [filter, setFilter] = useState("All");
  const [showCancelToast, setShowCancelToast] = useState(false);
  const [cancelToastMessage, setCancelToastMessage] = useState("");
  const navigate = useNavigate();

  const fetchOrders = useCallback(() => {
    const token = localStorage.getItem("token");
    
    // Check if token exists
    if (!token) {
      alert("Please login to view your orders");
      navigate("/login");
      return;
    }

    axios
      .get("https://watch-backend-ijad.onrender.com/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.orders || res.data))
      .catch((err) => {
        console.error("Error fetching orders", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Your session has expired. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
        } else {
          console.error("Error fetching orders:", err.message);
        }
      });
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please login to cancel orders");
      navigate("/login");
      return;
    }

    const reasonToSend = cancelReason === "Other" ? customReason : cancelReason;

    if (!reasonToSend.trim()) {
      alert("Please enter a reason");
      return;
    }

    try {
      await axios.put(
        `https://watch-backend-ijad.onrender.com/api/cancel-order/${cancelOrderId}`,
        { reason: reasonToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      document.getElementById("cancelCloseBtn").click();
      setCancelToastMessage("Order cancelled successfully");
      setShowCancelToast(true);
      setTimeout(() => setShowCancelToast(false), 3000);

      setCancelOrderId(null);
      setCancelReason("");
      setCustomReason("");
      fetchOrders();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        alert("Cancel failed. Please try again.");
      }
    }
  };

  const downloadPDF = (order) => {
    const doc = new jsPDF();

    // Color scheme - Dark and White Theme
    const darkColor = [33, 37, 41]; // Dark gray/black
    const white = [255, 255, 255];
    const lightGray = [248, 249, 250]; // Very light gray for alternating rows
    const darkGray = [52, 58, 64]; // Dark gray for accents

    // Set page background to white
    doc.setFillColor(...white);
    doc.rect(0, 0, 210, 297, "F");

    // Add border frame - compact height (dark theme)
    doc.setDrawColor(...darkColor);
    doc.setLineWidth(2);
    doc.line(10, 10, 200, 10); // Top
    doc.line(200, 10, 200, 180); // Right - compact height
    doc.line(10, 180, 10, 10); // Left

    // Center the content by adjusting starting position
    let y = 30;

    // Company name and details (left side) - dark theme
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.setTextColor(...darkColor);
    doc.text("WATCH STORE", 20, y);

    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.setTextColor(...darkColor);
    doc.text("123 Watch Avenue, Time Square NY 10001", 20, y + 10);
    doc.text("Phone: 1-800-TIMEPIECE", 20, y + 18);
    doc.text("https://watch-frontend-black.vercel.app/", 20, y + 26);

    // Invoice banner - dark theme
    doc.setFillColor(...darkColor);
    doc.rect(20, y + 35, 70, 14, "F");
    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.setTextColor(...white);
    doc.text(`INVOICE ${order.orderId}`, 55, y + 43, { align: "center" });

    // Date
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.setTextColor(...darkColor);
    doc.text(
      `Date: ${new Date(order.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toUpperCase()}`,
      20,
      y + 55
    );

    // Customer details (right side) - dark theme
    const rightX = 120;
    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.setTextColor(...darkColor);
    doc.text("CUSTOMER DETAILS:", rightX, y + 15);

    doc.setFont("times", "normal");
    doc.setTextColor(...darkColor);
    doc.text(`Email: ${order.email}`, rightX, y + 27);
    doc.text(`Phone: ${order.phone}`, rightX, y + 35);
    doc.text(`Address: ${order.address}`, rightX, y + 43);
    doc.text(`Payment: ${order.paymentMethod}`, rightX, y + 51);
    doc.text(`Status: ${order.status}`, rightX, y + 59);

    // Cancel reason if applicable
    if (order.status === "Cancelled" && order.cancelReason) {
      doc.setTextColor(220, 53, 69); // Red for cancelled
      doc.text(`Cancel Reason: ${order.cancelReason}`, rightX, y + 67);
      doc.setTextColor(...darkColor);
    }

    // Separator line - dark theme
    doc.setDrawColor(...darkColor);
    doc.setLineWidth(0.8);
    doc.line(20, y + 70, 190, y + 70);

    // Items table
    const tableStartY = y + 80;

    // Table headers
    const headerY = tableStartY;

    // Header background - dark theme
    doc.setFillColor(...darkColor);
    doc.rect(20, headerY - 6, 170, 10, "F");

    // Header text - white on dark
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.setTextColor(...white);
    doc.text("DESCRIPTION", 35, headerY);
    doc.text("QTY", 100, headerY);
    doc.text("PRICE", 125, headerY);
    doc.text("TOTAL", 155, headerY);

    // Table rows - dark theme
    doc.setFont("times", "normal");
    doc.setTextColor(...darkColor);
    let currentY = headerY + 12;

    order.items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;

      // Row background (alternating - light gray and white)
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(20, currentY - 4, 170, 8, "F");
      } else {
        doc.setFillColor(...white);
        doc.rect(20, currentY - 4, 170, 8, "F");
      }

      doc.text(item.title, 25, currentY);
      doc.text(item.quantity.toString(), 100, currentY);
      doc.text(`${item.price.toFixed(2)}`, 130, currentY);
      doc.text(`${itemTotal.toFixed(2)}`, 160, currentY);

      currentY += 10;
    });

    // Separator line before total - dark theme
    doc.setDrawColor(...darkColor);
    doc.line(20, currentY + 3, 190, currentY + 3);

    // Grand Total - dark theme
    const grandTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    currentY += 12;

    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.setTextColor(...darkColor);
    doc.text("TOTAL", 130, currentY);
    doc.text(`${grandTotal.toFixed(2)}`, 160, currentY);

    // Watch Quote Section - positioned after total, before bottom border
    const watchQuotes = [
      '"Time is the most valuable thing you can spend."',
      '"Every second counts, make it timeless."',
      '"Precision in every moment."',
      '"Crafting time, one tick at a time."',
      '"Elegance that stands the test of time."',
      '"Timepieces that tell your story."',
      '"Where craftsmanship meets time."',
      '"Timeless elegance, modern precision."',
      '"A watch is more than time, it\'s a statement."',
      '"Quality time deserves quality timepieces."',
    ];

    // Select random quote
    const randomQuote =
      watchQuotes[Math.floor(Math.random() * watchQuotes.length)];

    const quoteY = currentY + 25;
    doc.setFontSize(13);
    doc.setFont("times", "italic");
    doc.setTextColor(...darkGray);
    doc.text(randomQuote, 105, quoteY, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.setTextColor(...darkColor);
    doc.text("- TimePiece Watch Store", 105, quoteY + 8, { align: "center" });

    // Calculate content height and center the border
    const contentHeight = quoteY + 20; // Add some padding after quote
    const borderHeight = Math.max(170, contentHeight + 20); // Ensure minimum height

    // Redraw border with proper centering - dark theme
    doc.setDrawColor(...darkColor);
    doc.setLineWidth(2);
    doc.line(10, 10, 200, 10); // Top
    doc.line(200, 10, 200, 10 + borderHeight); // Right
    doc.line(200, 10 + borderHeight, 10, 10 + borderHeight); // Bottom
    doc.line(10, 10 + borderHeight, 10, 10); // Left

    // Bottom border accent - dark theme
    doc.setFillColor(...darkColor);
    doc.rect(10, 10 + borderHeight - 3, 190, 3, "F");

    doc.save(`TimePiece_Invoice_${order.orderId}.pdf`);
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="container my-5">
      <div className="col-lg-10 mx-auto">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="order-heading ">🛒 My Orders</h2>
          <select
            className="form-select select-hover-effect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {showCancelToast && (
          <div className="toast-popup bg-danger d-flex justify-content-between align-items-center">
             {cancelToastMessage}
            <button
              className="btn-close btn-close-white ms-2"
              onClick={() => setShowCancelToast(false)}
            ></button>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <div className="alert alert-info text-center">
            <i className="fas fa-box-open me-1"></i> No orders found!
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const grandTotal = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order.orderId || index}
                className={`card shadow-sm mb-4 border-start border-4 ${
                  order.status === "Cancelled"
                    ? "border-danger"
                    : order.status === "Approved"
                    ? "border-success"
                    : "border-warning"
                }`}
              >
                <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <strong>Order ID:</strong>&nbsp;{order.orderId}
                  </div>
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <i className="fas fa-calendar-alt me-1 text-secondary"></i>
                    <strong>Date:</strong>&nbsp;
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="d-flex align-items-center">
                    <strong>Status:</strong>&nbsp;
                    <span
                      className={`badge badge-fixed ${
                        order.status === "Cancelled"
                          ? "bg-danger"
                          : order.status === "Approved"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                    {order.status === "Approved" && (
                      <button
                        className="btn btn-sm btn-outline-danger ms-2 fw-bold "
                        data-bs-toggle="modal"
                        data-bs-target="#cancelModal"
                        onClick={() => {
                          setCancelOrderId(order._id);
                          setCancelReason("");
                          setCustomReason("");
                        }}
                      >
                        <i className="fas fa-ban me-1"></i>Cancel
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline-primary fw-bold ms-2"
                      onClick={() => downloadPDF(order)}
                    >
                      Download
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  {/* Email, Phone, Address */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                      <i className="fas fa-envelope me-1"></i>
                      <strong>Email:</strong> {order.email}
                    </div>
                    <div className="col-md-6 mb-2">
                      <i className="fas fa-phone me-1"></i>
                      <strong>Phone:</strong> {order.phone}
                    </div>
                    <div className="col-md-6 mb-2">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      <strong>Address:</strong> {order.address}
                    </div>
                    <div className="col-md-6 mb-2">
                      <i className="fas fa-credit-card me-1"></i>
                      <strong>Payment Mode:</strong> {order.paymentMethod}
                    </div>
                  </div>

                  {/* Cancel Reason */}
                  {order.status === "Cancelled" && order.cancelReason && (
                    <div className="text-danger mt-2 fw-semibold">
                      <i className="fas fa-times-circle me-1"></i>
                      <strong>Cancel Reason:</strong> {order.cancelReason}
                    </div>
                  )}

                  {/* Table */}
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered text-center align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Item</th>
                          <th>Price (₹)</th>
                          <th>Qty</th>
                          <th>Status</th>
                          <th>Total (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={i}>
                            <td className="fs-6">{item.title}</td>
                            <td className="fs-6">₹{item.price.toFixed(2)}</td>
                            <td className="text-success">{item.quantity}</td>
                            <td>
                              <span
                                className={`badge badge-fixed ${
                                  item.status === "Cancelled"
                                    ? "bg-danger"
                                    : "bg-success"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="table-secondary fw-bold fs-5">
                          <td colSpan="4" className="text-end">
                            Grand Total
                          </td>
                          <td className="fs-5 text-dark fw-bold">
                            ₹{grandTotal.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Cancel Modal */}
        <div
          className="modal fade"
          id="cancelModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form onSubmit={handleCancel} className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="cancelCloseBtn"
                ></button>
              </div>
              <div className="modal-body">
                {[
                  "Wrong contact number entered",
                  "Wrong address selected",
                  "Ordered by mistake",
                  "Expected delivery time is too long",
                  "Other",
                ].map((reason) => (
                  <div className="form-check" key={reason}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cancel_reason"
                      value={reason}
                      checked={cancelReason === reason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    <label className="form-check-label">{reason}</label>
                  </div>
                ))}
                {cancelReason === "Other" && (
                  <textarea
                    className="form-control mt-2"
                    placeholder="Write your reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-danger fw-bold bt1">
                  Submit Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
