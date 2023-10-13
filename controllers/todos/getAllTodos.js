const Todo = require("../../models/Todo");

const getAllTodos = async (req, res) => {
  const { id } = req.user;

  const todos = await Todo.find({ owner: id });

  res.json({
    todos,
  });
};

module.exports = getAllTodos;
