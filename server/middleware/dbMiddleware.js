const mongoose = require('mongoose');

// Middleware to check database connection before handling requests
const checkDbConnection = (req, res, next) => {
  const dbState = mongoose.connection.readyState;
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  // Only log for non-health endpoints to reduce noise
  if (!req.path.includes('health') && !req.path.includes('debug')) {
    console.log(`DB Check - State: ${dbState} (${stateMap[dbState]}) for ${req.method} ${req.path}`);
  }
  
  // Always allow requests to proceed - let controllers handle database availability
  // This prevents blocking the entire API when database is temporarily unavailable
  if (dbState === 1) {
    // Database connected - normal operation
    return next();
  } else if (dbState === 2) {
    // Database connecting - allow request but log warning
    console.log(`⚠️ Database connecting - allowing request (controller will handle)`);
    return next();
  } else if (dbState === 0) {
    // Database disconnected - allow request but log warning
    console.log(`⚠️ Database disconnected - allowing request (fallback data may be used)`);
    return next();
  } else {
    // Database disconnecting - allow request but log warning
    console.log(`⚠️ Database disconnecting - allowing request (controller will handle)`);
    return next();
  }
};

// Wait for database connection with timeout
const waitForDbConnection = async (timeoutMs = 30000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Database connection established');
      return true;
    }
    
    console.log(`⏳ Waiting for database connection... (${mongoose.connection.readyState})`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  }
  
  console.log('❌ Database connection timeout reached');
  return false;
};

module.exports = { checkDbConnection, waitForDbConnection };