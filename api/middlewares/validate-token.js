const jwt = require("jsonwebtoken")

// Middleware to validate token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: "Access denied" })
    const verified = jwt.verify(token, process.env.JWT_KEY)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" })
  }
}

module.exports = verifyToken
