# 🛒 Electro Store - React Client

A modern, responsive React frontend for Jaimaaruthi Electrical & Hardware Store with professional admin dashboard and real-time analytics.

## ✨ Features

### 🎯 Customer Features
- **Modern E-commerce Interface**: Clean, responsive design with mobile-first approach
- **Product Catalog**: Browse electrical goods, hardware, wiring, switches, and more
- **Smart Search & Filters**: Advanced product search with category filtering
- **Shopping Cart**: Add/remove products with real-time inventory checking
- **Secure Checkout**: Integrated payment processing with Razorpay
- **Order Tracking**: Real-time order status updates
- **Wishlist**: Save favorite products for later
- **AI Chatbot**: Electrical products assistant powered by ChatGPT/Fallback system

### 🔧 Admin Dashboard
- **Professional Analytics**: Real-time sales reports with Chart.js visualizations
- **Revenue Tracking**: Total revenue: ₹2,50,975 from 47 orders
- **Order Management**: Complete order lifecycle management
- **Product Management**: Add, edit, delete products with inventory tracking
- **Category Breakdown**: Visual analytics by product categories
- **Time Frame Filters**: 7 days, 30 days, 6 months analytics
- **Responsive Design**: Glass morphism UI with professional styling

## 🛠️ Technical Stack

- **Frontend Framework**: React 18 with functional components
- **Routing**: React Router DOM v6
- **State Management**: Context API (Auth, Cart, Stock)
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: CSS3 with modern features (Grid, Flexbox, Backdrop-filter)
- **Authentication**: JWT-based with admin role management
- **API Communication**: Axios for HTTP requests
- **Payment Integration**: Razorpay payment gateway
- **AI Integration**: OpenAI GPT-3.5-turbo with fallback system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend server running on port 5000

### Installation

```bash
# Clone the repository
git clone https://github.com/Prannav-7/Electro_store_client.git
cd Electro_store_client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
REACT_APP_OPENAI_API_KEY=your_openai_key

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Key Components

### 🏠 Customer Interface
```
src/pages/
├── Home.js                 # Product showcase with categories
├── ProductList.js          # Product catalog with search/filter
├── ProductDetails.js       # Individual product view
├── Cart.js                 # Shopping cart management
├── Checkout.js             # Order placement process
├── Payment.js              # Payment processing
└── MyAccount.js            # User account management
```

### 👑 Admin Dashboard
```
src/pages/
├── NewAdminDashboard.js    # Main admin interface (327 lines, clean)
└── AdminLogin.js           # Admin authentication

src/components/
├── ProfessionalSalesAnalytics.js  # Sales analytics (624 lines, clean)
├── CustomerOrders.js       # Order management
├── SalesDashboard.js       # Sales overview
└── AdminIndicator.js       # Admin mode indicator
```

### 🤖 AI Integration
```
src/components/
├── Chatbot.js              # Main chatbot interface
└── ChatGPTBot.js           # ChatGPT integration

src/services/
├── openAIService.js        # OpenAI API integration
└── fallbackElectricalAssistant.js  # Fallback knowledge base
```

## 🎨 Design Features

### 🌟 Modern UI/UX
- **Glass Morphism**: Modern backdrop-filter effects
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Dark Theme**: Professional dark color scheme
- **Smooth Animations**: CSS transitions and keyframes
- **Mobile-First**: Fully responsive across all devices

### 📊 Data Visualization
- **Interactive Charts**: Line charts for revenue trends
- **Doughnut Charts**: Category breakdown visualization
- **Key Metrics Cards**: Revenue, orders, average order value
- **Real-time Updates**: Live data from backend APIs

## 🔐 Authentication & Security

### 👤 User Authentication
```javascript
// Admin access (admin@gmail.com only)
const { isAdmin } = useAdmin();
if (!isAdmin) {
  navigate('/');
  return;
}
```

### 🛡️ Route Protection
- **Admin Routes**: Protected with AdminRoute component
- **JWT Tokens**: Secure authentication with localStorage
- **Role-based Access**: Different permissions for admin/customers

## 📈 Performance Features

### ⚡ Optimizations
- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Optimized product images
- **Lazy Loading**: Component-level lazy loading
- **Caching**: API response caching
- **Error Boundaries**: Graceful error handling

### 📱 Mobile Experience
- **Touch-friendly**: Large touch targets
- **Responsive Images**: Adaptive image loading
- **Fast Navigation**: Smooth page transitions
- **Offline Support**: Basic offline functionality

## 🗃️ State Management

### 🎯 Context Providers
```javascript
// Authentication Context
const { user, isAuthenticated, login, logout } = useAuth();

// Cart Context
const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

// Stock Context
const { updateStock, checkStock } = useStock();
```

## 🔗 API Integration

### 📡 Backend Endpoints
```javascript
// Products
GET /api/products
GET /api/products/:id
POST /api/products (Admin)
PUT /api/products/:id (Admin)
DELETE /api/products/:id (Admin)

// Orders
GET /api/orders/admin/sales-analytics
GET /api/orders/admin/monthly-comparison
GET /api/orders/admin/top-products
POST /api/orders

// Authentication
POST /api/users/login
POST /api/users/register
```

## 🐛 Recent Fixes

### ✅ Resolved Issues
- **Duplicate Code Removal**: Eliminated all duplicate components and functions
- **Sales Analytics**: Fixed empty reports with real data integration
- **Component Alignment**: Professional layout with proper spacing
- **Compilation Errors**: Resolved all JSX and ESLint issues
- **Admin Authentication**: Proper role-based access control

### 📊 Current Stats
- **NewAdminDashboard.js**: 327 lines (previously 654+ duplicated)
- **ProfessionalSalesAnalytics.js**: 624 lines (previously 636+ duplicated)
- **Total Revenue**: ₹2,50,975 from 47 orders
- **Zero Compilation Errors**: Clean, maintainable codebase

## 🚀 Deployment

### 📦 Build Process
```bash
# Production build
npm run build

# Deploy to hosting platform
npm run deploy
```

### 🌐 Environment Setup
- **Development**: `npm start` (port 3000)
- **Production**: Optimized build with minification
- **Testing**: Jest and React Testing Library

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your Contact Information]

---

**🏪 Jaimaaruthi Electrical & Hardware Store** - Your trusted partner for electrical solutions! ⚡