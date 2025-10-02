// Simple test to diagnose ChatGPT API connection issues
const testOpenAI = async () => {
  const apiKey = process.env.OPENAI_API_KEY || 'your-api-key-here';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  console.log('🔍 Testing OpenAI API Connection...');
  console.log('API Key:', apiKey.substring(0, 20) + '...');
  console.log('API URL:', apiUrl);

  const testMessage = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Say "Hello, I am working!" - this is just a test.'
      }
    ],
    max_tokens: 50
  };

  try {
    console.log('📤 Sending test request...');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(testMessage)
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.error('❌ Parsed Error:', errorData);
        
        if (errorData.error) {
          if (errorData.error.code === 'invalid_api_key') {
            console.error('🔑 Invalid API Key - Please check your OpenAI API key');
          } else if (errorData.error.code === 'insufficient_quota') {
            console.error('💰 Insufficient Quota - Your OpenAI account may need more credits');
          } else if (errorData.error.code === 'rate_limit_exceeded') {
            console.error('⏱️ Rate Limit Exceeded - Too many requests, try again later');
          } else {
            console.error('🚫 API Error:', errorData.error.message);
          }
        }
      } catch (parseError) {
        console.error('❌ Could not parse error response');
      }
      
      return { success: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    console.log('✅ Success! Full response:', data);
    
    if (data.choices && data.choices[0]) {
      console.log('🤖 ChatGPT Response:', data.choices[0].message.content);
      return { success: true, response: data.choices[0].message.content };
    }

  } catch (error) {
    console.error('❌ Network/Fetch Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('🌐 Network Error - Check your internet connection');
    } else if (error.name === 'SyntaxError') {
      console.error('📝 JSON Parse Error - Invalid response format');
    } else {
      console.error('🚫 Unknown Error:', error.message);
    }
    
    return { success: false, error: error.message };
  }
};

// Test the API
testOpenAI().then(result => {
  if (result.success) {
    console.log('🎉 OpenAI API is working correctly!');
  } else {
    console.log('💥 OpenAI API test failed:', result.error);
  }
});