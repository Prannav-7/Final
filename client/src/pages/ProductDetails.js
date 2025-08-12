import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        console.log('Product API Response:', response.data);
        
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setProduct(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      const success = await addToCartContext(id, quantity);
      
      if (success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Error adding to cart: ' + (error.response?.data?.message || error.message));
    }
    setAddingToCart(false);
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    setAddingToWishlist(true);
    try {
      const response = await api.post('/wishlist/add', {
        productId: id
      });
      
      if (response.data.success) {
        alert('Product added to wishlist successfully!');
      } else {
        alert('Failed to add product to wishlist');
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert('Error adding to wishlist: ' + (error.response?.data?.message || error.message));
    }
    setAddingToWishlist(false);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      alert('Please login to buy products');
      navigate('/login');
      return;
    }

    // Add to cart first, then redirect to checkout
    setAddingToCart(true);
    try {
      const success = await addToCartContext(id, quantity);
      
      if (success) {
        navigate('/checkout');
      } else {
        alert('Failed to process buy now request');
      }
    } catch (error) {
      console.error("Error processing buy now:", error);
      alert('Error processing buy now: ' + (error.response?.data?.message || error.message));
    }
    setAddingToCart(false);
  };

  const calculateDiscount = () => {
    if (product.mrp && product.price < product.mrp) {
      return Math.round(((product.mrp - product.price) / product.mrp) * 100);
    }
    return 0;
  };

  const mockReviews = [
    {
      id: 1,
      user: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality product. Highly recommended!",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      user: "Priya Sharma",
      rating: 4,
      comment: "Good value for money. Fast delivery.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 3,
      user: "Amit Singh",
      rating: 5,
      comment: "Perfect product as described. Will buy again.",
      date: "2024-01-05",
      verified: false
    }
  ];

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="error-container">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="back-btn">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();
  const avgRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  return (
    <div>
      <Header />
      <div className="product-details-container">
        <div className="product-details-content">
          {/* Product Images Section */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : '/images/default-product.jpg'} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/default-product.jpg';
                }}
              />
            </div>
            <div className="image-thumbnails">
              <img 
                src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : '/images/default-product.jpg'} 
                alt={product.name}
                className="thumbnail active"
                onError={(e) => {
                  e.target.src = '/images/default-product.jpg';
                }}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info">
            <div className="breadcrumb">
              <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
              <span> / </span>
              <span onClick={() => navigate('/products')} className="breadcrumb-link">Products</span>
              <span> / </span>
              <span className="breadcrumb-link">{product.category}</span>
              <span> / </span>
              <span>{product.name}</span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            <div className="product-brand">Brand: <strong>{product.brand}</strong></div>
            {product.model && <div className="product-model">Model: <strong>{product.model}</strong></div>}
            
            <div className="rating-section">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= avgRating ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <span className="rating-text">({avgRating.toFixed(1)}) | {mockReviews.length} Reviews</span>
            </div>

            <div className="price-section">
              <div className="current-price">₹{product.price?.toLocaleString()}</div>
              {product.mrp && product.mrp > product.price && (
                <>
                  <div className="original-price">₹{product.mrp?.toLocaleString()}</div>
                  <div className="discount-badge">{discount}% OFF</div>
                </>
              )}
            </div>

            <div className="stock-info">
              <span className={product.stock > 10 ? "in-stock" : product.stock > 0 ? "low-stock" : "out-of-stock"}>
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="action-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >-</button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.stock === 0}
                >
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
                
                <button 
                  className="add-to-wishlist-btn"
                  onClick={handleAddToWishlist}
                  disabled={addingToWishlist}
                >
                  {addingToWishlist ? "Adding..." : "♡ Add to Wishlist"}
                </button>

                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={addingToCart || product.stock === 0}
                >
                  {addingToCart ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && (
          <div className="specifications-section">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplier Information */}
        {product.supplier && (
          <div className="supplier-section">
            <h3>Supplier Information</h3>
            <div className="supplier-info">
              <p><strong>Company:</strong> {product.supplier.name}</p>
              <p><strong>Contact:</strong> {product.supplier.contact}</p>
              <p><strong>Location:</strong> {product.supplier.location}</p>
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-list">
            {mockReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.user}</span>
                    {review.verified && <span className="verified-badge">Verified Purchase</span>}
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= review.rating ? "star filled" : "star"}>★</span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
