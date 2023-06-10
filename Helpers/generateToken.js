const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (id, rol) => {
  return jwt.sign(
    {
      _id: id,
      role: rol,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { generateToken, decodeSign, verifyToken };
