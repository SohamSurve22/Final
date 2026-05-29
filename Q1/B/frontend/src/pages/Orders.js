import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api";

// Orders Page
function Orders({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Fetch orders for logged in user
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await getOrders(user.email);
        setOrders(res.data);
      } catch (err) {
        alert("Could not fetch orders");
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>

      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div className="card mb-3" key={order._id}>
            <div className="card-header">
              <strong>Order ID:</strong> {order._id} &nbsp;|&nbsp;
              <strong>Status:</strong> {order.status} &nbsp;|&nbsp;
              <strong>Total:</strong> ₹{order.totalAmount}
              <br />
              <small className="text-muted">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </small>
            </div>
            <div className="card-body">
              {/* Order Items Table */}
              <table className="table table-sm table-bordered">
                <thead className="table-secondary">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
