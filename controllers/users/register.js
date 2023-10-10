const { HttpError } = require("../../helpers");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Phone number in use");
  }
  const hashPassword = await bcrypt.hash(password, 10); // хешируем пароль
  await User.create({
    ...req.body,
    password: hashPassword,
    role: "user",
  });

  res.status(201).json({
    message: "Register success",
  });
};

module.exports = register;
