const Todo = require("../../models/Todo");

const getCurrent = async (req, res) => {
  const { email, fullName, role, id } = req.user;

  const todos = await Todo.find({ owner: id }); // ищем все тудухи по владельцу айди текущего пользователя

  res.json({
    id,
    email,
    fullName,
    role,
    todos,
  });
};

module.exports = getCurrent;
