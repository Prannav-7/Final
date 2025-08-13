import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AdminIndicator from '../components/AdminIndicator';
import SalesDashboard from '../components/SalesDashboard';
import CustomerOrders from '../components/CustomerOrders';
import { useAdmin } from '../hooks/useAdmin';
import api from '../api';

const NewAdminDashboard = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const categories = [
    'Electrical Goods',
    'Hardware & Tools', 
    'Wiring & Cables',
    'Switches & Sockets',
    'Lighting Solutions',
    'Fans & Ventilation',
    'Electrical Motors',
    'Safety Equipment'
  ];

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [isAdmin, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      if (response.data?.data) {
        setProducts(response.data.data);
        calculateStats(response.data.data);
      } else if (response.data?.products) {
        setProducts(response.data.products);
        calculateStats(response.data.products);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (productsData) => {
    const totalProducts = productsData.length;
    const totalValue = productsData.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStock = productsData.filter(product => product.stock > 0 && product.stock <= 10).length;
    const outOfStock = productsData.filter(product => product.stock === 0).length;

    setStats({
      totalProducts,
      totalValue,
      lowStock,
      outOfStock
    });
  };

  const handleDeleteProduct = async (productId, productName) => {
    const confirmMessage = `Are you sure you want to delete "${productName}"?\\n\\nType "DELETE" to confirm:`;
    const userInput = window.prompt(confirmMessage);
    
    if (userInput !== 'DELETE') {
      if (userInput !== null) {
        alert('Product deletion cancelled. You must type "DELETE" exactly to confirm.');
      }
      return;
    }

    try {
      const response = await api.delete(`/products/${productId}`);
      if (response.data?.success) {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
        calculateStats(updatedProducts);
        alert(`✅ Product "${productName}" deleted successfully!`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`❌ Failed to delete product: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await api.put(`/products/${productId}`, updatedData);
      if (response.data?.success || response.data?._id) {
        const updatedProducts = products.map(product => 
          product._id === productId ? { ...product, ...updatedData } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        calculateStats(updatedProducts);
        alert(`✅ Product updated successfully!`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`❌ Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9ff 0%, #fef7ff 100%)' }}>
      <Header />
      
      {/* Admin Dashboard Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            margin: '0 0 10px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            🔧 Admin Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: '0.9',
            margin: 0
          }}>
            Complete Management System - Products, Sales & Customer Orders
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(78, 205, 196, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📦</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.totalProducts}</div>
            <div style={{ fontSize: '1rem', opacity: '0.9' }}>Total Products</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💰</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>₹{stats.totalValue.toLocaleString()}</div>
            <div style={{ fontSize: '1rem', opacity: '0.9' }}>Total Inventory Value</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffd54f 0%, #ffb74d 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(255, 213, 79, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.lowStock}</div>
            <div style={{ fontSize: '1rem', opacity: '0.9' }}>Low Stock Items</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚫</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.outOfStock}</div>
            <div style={{ fontSize: '1rem', opacity: '0.9' }}>Out of Stock</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '20px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'products', label: '📦 Product Management', icon: '📦' },
              { id: 'sales', label: '📊 Daily Sales Report', icon: '📊' },
              { id: 'orders', label: '🛍️ Customer Orders', icon: '🛍️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#667eea',
                  border: activeTab === tab.id ? 'none' : '2px solid #667eea',
                  padding: '12px 25px',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id 
                    ? '0 8px 25px rgba(102, 126, 234, 0.3)'
                    : 'none'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && (
          <div>
            {/* Product Management Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '30px',
              marginBottom: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0, color: '#2c3e50' }}>
                  Product Management
                </h2>
                <button
                  onClick={() => navigate('/add-product')}
                  style={{
                    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>➕</span>
                  Add New Product
                </button>
              </div>

              {/* Search and Filter */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px', display: 'block' }}>
                    Search Products
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '15px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px', display: 'block' }}>
                    Filter by Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '15px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '60px'
                }}>
                  <div style={{
                    border: '6px solid #f3f3f3',
                    borderTop: '6px solid #667eea',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 1s linear infinite',
                    marginRight: '20px'
                  }}></div>
                  <p style={{ fontSize: '18px', color: '#666' }}>Loading products...</p>
                </div>
              ) : (
                <>
                  <p style={{ color: '#666', marginBottom: '15px' }}>
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                  
                  {filteredProducts.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px',
                      background: 'rgba(248, 249, 250, 0.5)',
                      borderRadius: '20px',
                      border: '2px dashed #ddd'
                    }}>
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
                      <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No products found</h3>
                      <p style={{ color: '#9ca3af' }}>Try adjusting your search or filter criteria</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                        <thead>
                          <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#495057', fontWeight: '600' }}>Product</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#495057', fontWeight: '600' }}>Category</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#495057', fontWeight: '600' }}>Price</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#495057', fontWeight: '600' }}>Stock</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#495057', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#495057', fontWeight: '600' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product, index) => (
                            <ProductRow
                              key={product._id}
                              product={product}
                              index={index}
                              onEdit={setEditingProduct}
                              onDelete={handleDeleteProduct}
                              onUpdate={handleUpdateProduct}
                              isEditing={editingProduct?._id === product._id}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sales' && <SalesDashboard />}
        {activeTab === 'orders' && <CustomerOrders />}
      </div>

      {/* Admin Mode Indicator */}
      <AdminIndicator showStatus={true} />
    </div>
  );
};

// Product Row Component for editing functionality
const ProductRow = ({ product, index, onEdit, onDelete, onUpdate, isEditing }) => {
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    category: product.category,
    description: product.description
  });

  const handleSave = () => {
    onUpdate(product._id, editData);
  };

  const handleCancel = () => {
    onEdit(null);
    setEditData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.1)' };
    if (stock <= 10) return { text: 'Low Stock', color: '#ffd54f', bg: 'rgba(255, 213, 79, 0.1)' };
    return { text: 'In Stock', color: '#4caf50', bg: 'rgba(76, 175, 80, 0.1)' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
      <td style={{ padding: '15px', verticalAlign: 'top' }}>
        {isEditing ? (
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        ) : (
          <div>
            <div style={{ fontWeight: '600', color: '#212529', marginBottom: '5px' }}>
              {product.name}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6c757d',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {product.description}
            </div>
          </div>
        )}
      </td>
      
      <td style={{ padding: '15px', color: '#495057' }}>
        {isEditing ? (
          <select
            value={editData.category}
            onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {['Electrical Goods', 'Hardware & Tools', 'Wiring & Cables', 'Switches & Sockets', 'Lighting Solutions', 'Fans & Ventilation', 'Electrical Motors', 'Safety Equipment'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        ) : (
          product.category
        )}
      </td>
      
      <td style={{ padding: '15px', textAlign: 'center' }}>
        {isEditing ? (
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            style={{
              width: '80px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        ) : (
          <span style={{ fontWeight: '600', color: '#28a745' }}>
            ₹{product.price.toLocaleString()}
          </span>
        )}
      </td>
      
      <td style={{ padding: '15px', textAlign: 'center' }}>
        {isEditing ? (
          <input
            type="number"
            value={editData.stock}
            onChange={(e) => setEditData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
            style={{
              width: '80px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        ) : (
          <span style={{ fontWeight: '600', fontSize: '16px', color: '#495057' }}>
            {product.stock}
          </span>
        )}
      </td>
      
      <td style={{ padding: '15px', textAlign: 'center' }}>
        <span style={{
          background: stockStatus.bg,
          color: stockStatus.color,
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {stockStatus.text}
        </span>
      </td>
      
      <td style={{ padding: '15px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✓ Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✕ Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(product)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(product._id, product.name)}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default NewAdminDashboard;
