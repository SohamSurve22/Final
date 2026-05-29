// Auth Middleware to protect routes using JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "exam_secret_key_123";

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.headers["authorization"] || req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // If bearer token format is used: "Bearer <token>"
    const tokenString = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(tokenString, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
