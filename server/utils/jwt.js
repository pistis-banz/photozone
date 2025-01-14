const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = {
  createToken,
};
