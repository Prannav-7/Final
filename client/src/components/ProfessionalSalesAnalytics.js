import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import api from '../api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler
);

const ProfessionalSalesAnalytics = () => {
  const [salesData, setSalesData] = useState({
    revenue: [],
    orders: [],
    topProducts: [],
    categoryBreakdown: [],
    loading: true
  });

  const [timeFrame, setTimeFrame] = useState('7days'); // 7days, 30days, 6months

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeFrame]);

  const fetchAnalyticsData = async () => {
    try {
      console.log('🔄 Starting analytics data fetch...');
      setSalesData(prev => ({ ...prev, loading: true }));
      
      // Fetch real data from multiple API endpoints
      console.log('📡 Making API calls...');
      const [
        salesAnalyticsResponse,
        monthlyComparisonResponse,
        topProductsResponse,
        categoryBreakdownResponse,
        allOrdersResponse
      ] = await Promise.all([
        api.get('/orders/admin/sales-analytics'),
        api.get('/orders/admin/monthly-comparison'),
        api.get('/orders/admin/top-products'),
        api.get('/orders/admin/category-breakdown'),
        api.get('/orders/admin/all-orders')
      ]);
      
      console.log('✅ API responses received:', {
        salesAnalytics: salesAnalyticsResponse.data,
        monthlyComparison: monthlyComparisonResponse.data,
        topProducts: topProductsResponse.data,
        categoryBreakdown: categoryBreakdownResponse.data,
        allOrders: allOrdersResponse.data
      });

      const salesAnalytics = salesAnalyticsResponse.data.data || {};
      const monthlyComparison = monthlyComparisonResponse.data.data || [];
      const topProducts = topProductsResponse.data.data || [];
      const categoryBreakdown = categoryBreakdownResponse.data.data || [];
      const allOrders = allOrdersResponse.data.data || [];

      // Process the data for charts
      const processedData = processRealData(
        salesAnalytics,
        monthlyComparison,
        topProducts,
        categoryBreakdown,
        allOrders,
        timeFrame
      );

      setSalesData(processedData);
      
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Fallback to sample data if API fails
      const fallbackData = generateSampleData(timeFrame);
      setSalesData({ ...fallbackData, dataSource: 'fallback' });
    } finally {
      setSalesData(prev => ({ ...prev, loading: false }));
    }
  };

  const processRealData = (salesAnalytics, monthlyComparison, topProducts, categoryBreakdown, allOrders, period) => {
    try {
      // Process orders data by time period
      const days = period === '7days' ? 7 : period === '30days' ? 30 : 180;
      const labels = [];
      const revenue = [];
      const orders = [];

      // Create date range for the selected period
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }));

        // Filter orders for this specific date
        const dateStr = date.toISOString().split('T')[0];
        const dayOrders = allOrders.filter(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate === dateStr;
        });

        // Calculate daily totals
        const dailyRevenue = dayOrders.reduce((sum, order) => sum + (order.orderSummary?.total || 0), 0);
        const dailyOrderCount = dayOrders.length;

        revenue.push(dailyRevenue);
        orders.push(dailyOrderCount);
      }

      // Process top products (convert sales data)
      const processedTopProducts = topProducts.slice(0, 5).map(product => ({
        name: product.name || product.productName || 'Unknown Product',
        sales: product.totalSales || product.revenue || 0,
        units: product.totalQuantity || product.quantity || 0
      }));

      // Process category breakdown with colors
      const colors = ['#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e', '#ffd93d', '#6bcf7f'];
      const processedCategoryBreakdown = categoryBreakdown.slice(0, 7).map((category, index) => ({
        category: category.category || category._id || 'Unknown',
        value: category.percentage || Math.round((category.totalSales / salesAnalytics.totalRevenue) * 100) || 0,
        color: colors[index] || '#667eea'
      }));

      return {
        labels,
        revenue,
        orders,
        topProducts: processedTopProducts,
        categoryBreakdown: processedCategoryBreakdown,
        loading: false,
        dataSource: 'real',
        totalRevenue: salesAnalytics.totalRevenue || revenue.reduce((a, b) => a + b, 0),
        totalOrders: salesAnalytics.totalOrders || orders.reduce((a, b) => a + b, 0),
        averageOrderValue: salesAnalytics.averageOrderValue || 
          (orders.reduce((a, b) => a + b, 0) > 0 ? 
            Math.round(revenue.reduce((a, b) => a + b, 0) / orders.reduce((a, b) => a + b, 0)) : 0)
      };
    } catch (error) {
      console.error('Error processing real data:', error);
      return generateSampleData(period);
    }
  };

  const generateSampleData = (period) => {
    const days = period === '7days' ? 7 : period === '30days' ? 30 : 180;
    const labels = [];
    const revenue = [];
    const orders = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }));
      
      // Generate realistic sample data
      revenue.push(Math.floor(Math.random() * 50000) + 10000);
      orders.push(Math.floor(Math.random() * 25) + 5);
    }

    return {
      labels,
      revenue,
      orders,
      topProducts: [
        { name: 'LED Bulbs', sales: 25000, units: 150 },
        { name: 'Ceiling Fans', sales: 18000, units: 60 },
        { name: 'MCB Switches', sales: 12000, units: 80 },
        { name: 'Electrical Wire', sales: 8000, units: 200 },
        { name: 'Power Sockets', sales: 6000, units: 90 }
      ],
      categoryBreakdown: [
        { category: 'Lighting', value: 35, color: '#667eea' },
        { category: 'Fans & Motors', value: 25, color: '#f093fb' },
        { category: 'Switches & Sockets', value: 20, color: '#4facfe' },
        { category: 'Wiring & Cables', value: 15, color: '#11998e' },
        { category: 'Others', value: 5, color: '#ff9a9e' }
      ],
      loading: false,
      dataSource: 'sample'
    };
  };

  // Modern chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: { size: 12, weight: '500' },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false 
        },
        ticks: { 
          color: '#ffffff',
          font: { size: 11 }
        }
      },
      y: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false 
        },
        ticks: { 
          color: '#ffffff',
          font: { size: 11 }
        }
      }
    }
  };

  // Revenue Chart Data
  const revenueChartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Revenue',
        data: salesData.revenue || [],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderColor: '#667eea',
        borderWidth: 3,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4
      }
    ]
  };

  // Orders Chart Data
  const ordersChartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Orders',
        data: salesData.orders || [],
        backgroundColor: [
          '#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e',
          '#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e'
        ],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  // Category Breakdown Chart Data
  const categoryChartData = {
    labels: salesData.categoryBreakdown?.map(item => item.category) || [],
    datasets: [
      {
        data: salesData.categoryBreakdown?.map(item => item.value) || [],
        backgroundColor: salesData.categoryBreakdown?.map(item => item.color) || [],
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff'
      }
    ]
  };

  if (salesData.loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'transparent',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <div style={{ 
        marginBottom: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📊 Professional Sales Analytics
        </h1>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {[
            { value: '7days', label: '7 Days', icon: '📅' },
            { value: '30days', label: '30 Days', icon: '📆' },
            { value: '6months', label: '6 Months', icon: '🗓️' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setTimeFrame(option.value)}
              style={{
                background: timeFrame === option.value 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: timeFrame === option.value ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: timeFrame === option.value ? '0 8px 25px rgba(102, 126, 234, 0.3)' : 'none',
                transform: timeFrame === option.value ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (timeFrame !== option.value) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (timeFrame !== option.value) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'none';
                }
              }}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Total Revenue Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
            <h3 style={{ 
              color: '#10b981', 
              fontSize: '1rem', 
              fontWeight: '600',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Revenue
            </h3>
            <p style={{ 
              fontSize: '2.2rem', 
              fontWeight: '800', 
              margin: '0',
              color: '#ffffff'
            }}>
              ₹{(salesData.totalRevenue || 0).toLocaleString()}
            </p>
            <div style={{
              fontSize: '0.9rem',
              color: '#a7f3d0',
              marginTop: '0.5rem'
            }}>
              {timeFrame === '7days' ? 'Last 7 days' : timeFrame === '30days' ? 'Last 30 days' : 'Last 6 months'}
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
            <h3 style={{ 
              color: '#3b82f6', 
              fontSize: '1rem', 
              fontWeight: '600',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Orders
            </h3>
            <p style={{ 
              fontSize: '2.2rem', 
              fontWeight: '800', 
              margin: '0',
              color: '#ffffff'
            }}>
              {salesData.totalOrders || 0}
            </p>
            <div style={{
              fontSize: '0.9rem',
              color: '#93c5fd',
              marginTop: '0.5rem'
            }}>
              Orders processed
            </div>
          </div>
        </div>

        {/* Average Order Value Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
            <h3 style={{ 
              color: '#f59e0b', 
              fontSize: '1rem', 
              fontWeight: '600',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Avg Order Value
            </h3>
            <p style={{ 
              fontSize: '2.2rem', 
              fontWeight: '800', 
              margin: '0',
              color: '#ffffff'
            }}>
              ₹{salesData.totalOrders > 0 ? Math.round((salesData.totalRevenue || 0) / salesData.totalOrders).toLocaleString() : 0}
            </p>
            <div style={{
              fontSize: '0.9rem',
              color: '#fcd34d',
              marginTop: '0.5rem'
            }}>
              Per order average
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Revenue Trend Chart */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 44, 0.95) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{ 
            color: '#ffffff', 
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📊 Revenue Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 44, 0.95) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{ 
            color: '#ffffff', 
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🎯 Category Breakdown
          </h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut data={categoryChartData} options={{ 
              ...chartOptions, 
              maintainAspectRatio: false,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  position: 'bottom'
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSalesAnalytics;
