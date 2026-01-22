const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};

module.exports = auth;
