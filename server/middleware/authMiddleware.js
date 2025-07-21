// server/middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
  // Placeholder auth logic – always allows the request
  // Replace with real auth logic like JWT verification
  console.log('AuthMiddleware: Request authorized');
  next();
};

module.exports = authMiddleware;
