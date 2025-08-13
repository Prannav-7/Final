const http = require('http');

// Test daily sales API
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders/admin/daily-sales?date=' + new Date().toISOString().split('T')[0],
  method: 'GET',
  headers: {
    'Authorization': 'Bearer test_admin_token' // You'll need a real admin token
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Daily Sales API Response:');
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    
    try {
      const parsed = JSON.parse(data);
      console.log('\n=== DAILY SALES SUMMARY ===');
      if (parsed.success && parsed.data) {
        console.log('Date:', parsed.data.date);
        console.log('Total Orders:', parsed.data.summary.totalOrders);
        console.log('Total Revenue: ₹' + parsed.data.summary.totalRevenue);
        console.log('Completed Orders:', parsed.data.summary.completedOrders);
        console.log('Pending Orders:', parsed.data.summary.pendingOrders);
        console.log('Average Order Value: ₹' + parsed.data.summary.averageOrderValue);
        
        console.log('\n=== PAYMENT METHODS ===');
        Object.entries(parsed.data.paymentMethodBreakdown).forEach(([method, data]) => {
          console.log(`${method}: ${data.count} orders, ₹${data.revenue} revenue`);
        });
        
        console.log('\n=== TOP PRODUCTS ===');
        parsed.data.topProducts.slice(0, 3).forEach((product, index) => {
          console.log(`${index + 1}. ${product.name} - Sold: ${product.totalQuantity}, Revenue: ₹${product.totalRevenue}`);
        });
        
        console.log('\n=== CUSTOMER ORDERS COUNT ===');
        console.log(`Total customer orders with details: ${parsed.data.customerOrders.length}`);
      } else {
        console.log('No sales data or API error:', parsed.message);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
  console.log('\nNote: This requires admin authentication. Please log in as admin first.');
});

req.end();
