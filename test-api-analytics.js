const http = require('http');

function testAPI(endpoint, description) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`\n=== ${description} ===`);
        console.log(`Status: ${res.statusCode}`);
        try {
          const parsed = JSON.parse(data);
          console.log('Response:', JSON.stringify(parsed, null, 2));
          resolve(parsed);
        } catch (e) {
          console.log('Raw response:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`Error testing ${description}:`, err);
      reject(err);
    });

    req.end();
  });
}

async function testAllEndpoints() {
  try {
    console.log('🧪 Testing Analytics API Endpoints...\n');
    
    // Test sales analytics
    await testAPI('/api/orders/admin/sales-analytics?month=2025-09', 'Sales Analytics');
    
    // Test monthly comparison
    await testAPI('/api/orders/admin/monthly-comparison?current=2025-09&previous=2025-08', 'Monthly Comparison');
    
    // Test top products
    await testAPI('/api/orders/admin/top-products?month=2025-09', 'Top Products');
    
    // Test category breakdown
    await testAPI('/api/orders/admin/category-breakdown?month=2025-09', 'Category Breakdown');
    
    // Test all orders
    await testAPI('/api/orders/admin/all-orders', 'All Orders');
    
    console.log('\n✅ API Testing Complete!');
    
  } catch (error) {
    console.error('❌ API Testing Failed:', error);
  }
}

testAllEndpoints();