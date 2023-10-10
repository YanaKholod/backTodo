const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../helpers");
const User = require("../../models/User");
require("dotenv").config(); // пакет для доступа к переменнім окружения из .env, config считівает файл .env
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" }); // токен кодируется с помощью сикрет кей
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    //  user: {
    //    email: user.email,
    //    fullName: user.fullName,
    //    role: user.role,
    //    id: user.id,
    //  },
  });
};

module.exports = login;
