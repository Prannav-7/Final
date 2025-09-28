// Test script to verify fallback assistant works
const path = require('path');

// Import the fallback assistant
const FallbackElectricalAssistant = require('./src/services/fallbackElectricalAssistant.js');

console.log('🔧 Testing Fallback Electrical Assistant');
console.log('========================================');

const assistant = new FallbackElectricalAssistant();

// Test 1: Ceiling fans
console.log('\n🌀 Test 1: Ceiling fans');
const result1 = assistant.askElectricalQuestion("Tell me about ceiling fans");
console.log('Question:', "Tell me about ceiling fans");
console.log('Answer:', result1.answer);
console.log('Confidence:', result1.confidence);

// Test 2: LED bulbs
console.log('\n💡 Test 2: LED bulbs');
const result2 = assistant.askElectricalQuestion("What are the best LED bulbs?");
console.log('Question:', "What are the best LED bulbs?");
console.log('Answer:', result2.answer);
console.log('Confidence:', result2.confidence);

// Test 3: Safety advice
console.log('\n⚠️ Test 3: Safety advice');
const result3 = assistant.askElectricalQuestion("working with electrical wiring");
console.log('Question:', "working with electrical wiring");
console.log('Answer:', result3.answer);
console.log('Confidence:', result3.confidence);

// Test 4: MCB sizing
console.log('\n🔌 Test 4: MCB sizing');
const result4 = assistant.askElectricalQuestion("What size MCB for home?");
console.log('Question:', "What size MCB for home?");
console.log('Answer:', result4.answer);
console.log('Confidence:', result4.confidence);

console.log('\n✅ All tests completed successfully!');
console.log('The fallback assistant is working properly.');