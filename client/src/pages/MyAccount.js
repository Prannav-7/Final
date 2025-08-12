// src/pages/MyAccount.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios.get('/api/orders/mine').then((res) => {
      setOrders(res.data);
      setFilteredOrders(res.data);
    });
    axios.get('/api/users/me').then((res) => {
      setProfile(res.data.profile);
      setAddresses(res.data.addresses);
    });
  }, []);

  useEffect(() => {
    let updatedOrders = [...orders];

    if (filter !== '') {
      updatedOrders = updatedOrders.filter((order) =>
        order.status.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sortOrder === 'date') {
      updatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'total') {
      updatedOrders.sort((a, b) => b.totalAmount - a.totalAmount);
    }

    setFilteredOrders(updatedOrders);
  }, [filter, sortOrder, orders]);

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <section>
        <h3>Profile Settings</h3>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <button>Edit Profile</button>
        <button>Change Password</button>
      </section>

      <section>
        <h3>Saved Addresses</h3>
        {addresses.length === 0 ? (
          <p>No saved addresses.</p>
        ) : (
          <ul>
            {addresses.map((addr, idx) => (
              <li key={idx}>{addr.line1}, {addr.city}, {addr.state} - {addr.zip}</li>
            ))}
          </ul>
        )}
        <button>Add New Address</button>
      </section>

      <section>
        <h3>Order History</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Filter by Status:
            <input
              type="text"
              placeholder="e.g., delivered"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>

          <label style={{ marginLeft: '20px' }}>
            Sort by:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="">None</option>
              <option value="date">Date</option>
              <option value="total">Total Amount</option>
            </select>
          </label>
        </div>

        {filteredOrders.length === 0 ? (
          <p>No matching orders.</p>
        ) : (
          <ul>
            {filteredOrders.map((order, idx) => (
              <li key={idx} style={{ marginTop: '10px' }}>
                <strong>Order ID:</strong> {order._id} <br />
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()} <br />
                <strong>Total:</strong> ₹{order.totalAmount} <br />
                <strong>Status:</strong> {order.status} <br />
                <button onClick={() => window.open(`/api/orders/${order._id}/invoice`, '_blank')}>
                  Download Invoice
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MyAccount;
