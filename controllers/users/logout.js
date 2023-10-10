const User = require("../../models/User");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }); // сетим токен в пустую строку при віходе

  res.json({
    message: "Logout success",
  });
};
module.exports = logout;
