const http = require('http');

// Test payment methods API
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/payment/methods',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Payment Methods API Response:');
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    
    try {
      const parsed = JSON.parse(data);
      console.log('\nParsed Response:');
      console.log('Success:', parsed.success);
      console.log('Number of Payment Methods:', parsed.paymentMethods?.length);
      
      if (parsed.paymentMethods) {
        console.log('\nAvailable Payment Methods:');
        parsed.paymentMethods.forEach((method, index) => {
          console.log(`${index + 1}. ${method.name} (${method.id}) - ${method.description}`);
        });
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
  console.error('Error code:', error.code);
  console.error('Error details:', error);
});

req.end();
