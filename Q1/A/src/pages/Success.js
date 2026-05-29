import React from "react";

// Success Page Component
// Renders the order confirmation details, order ID, delivery details, and itemized bill
function Success({ orderData, resetApp }) {
  // If order data doesn't exist, provide a fallback or return early
  if (!orderData) {
    return (
      <div className="text-center py-5">
        <h2>No Order Found</h2>
        <button className="btn btn-primary mt-3" onClick={resetApp}>
          Go to Home
        </button>
      </div>
    );
  }

  const { orderId, customer, items, totalAmount } = orderData;

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Order Success Card */}
          <div className="card shadow-sm border-1 rounded-3 bg-white mb-4">
            <div className="card-body text-center p-5">
              {/* Success Badge */}
              <div className="mb-4 text-success">
                <i className="bi bi-check-circle-fill" style={{ fontSize: "5rem" }}></i>
              </div>
              <h2 className="fw-bold text-success mb-2">Order Placed Successfully!</h2>
              <p className="text-muted mb-4">
                Thank you for ordering with QuickBites. Your food is being prepared and will be delivered shortly.
              </p>
              
              {/* Order ID Banner */}
              <div className="bg-light p-3 rounded mb-4 border d-inline-block">
                <span className="text-secondary small d-block">YOUR ORDER ID</span>
                <strong className="fs-5 text-dark font-monospace">{orderId}</strong>
              </div>

              <div className="row text-start mt-4">
                {/* Delivery Information Summary */}
                <div className="col-md-6 mb-4">
                  <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">Delivery Details</h5>
                  <p className="mb-1"><strong>Name:</strong> {customer.name}</p>
                  <p className="mb-1"><strong>Phone:</strong> {customer.phone}</p>
                  <p className="mb-1"><strong>Email:</strong> {customer.email}</p>
                  <p className="mb-1 text-wrap"><strong>Address:</strong> {customer.address}</p>
                </div>
                
                {/* Payment Information Summary */}
                <div className="col-md-6 mb-4">
                  <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">Payment Details</h5>
                  <p className="mb-1"><strong>Payment Method:</strong> {customer.paymentMethod}</p>
                  <p className="mb-1"><strong>Status:</strong> <span className="badge bg-success">Success</span></p>
                  <p className="mb-1"><strong>Amount Paid:</strong> <span className="fw-bold text-success">₹{totalAmount}</span></p>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="text-start">
                <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">Items Ordered</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle text-dark">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">₹{item.price}</td>
                          <td className="text-end">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">Grand Total:</td>
                        <td className="text-end fw-bold text-success">₹{totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="mt-5">
                <button
                  className="btn btn-warning btn-lg fw-bold text-dark px-5 py-2"
                  onClick={resetApp}
                >
                  <i className="bi bi-house-door me-2"></i> Go Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
