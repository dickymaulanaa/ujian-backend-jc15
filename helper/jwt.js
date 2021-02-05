const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
  return jwt.sign(payload, "password", {
    expiresIn: "12h",
  });
};
const checkToken = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    jwt.verify(req.token, "password", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err.message,
          status: "Unauthorized",
        });
      }

      req.users = decoded;
      next();
    });
  }
};

module.exports = {
  createJWTToken,
  checkToken,
};
