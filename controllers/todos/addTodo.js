const Todo = require("../../models/Todo");

const addTodo = async (req, res) => {
  const { _id: owner } = req.user;

  const todoData = {
    ...req.body,
    owner,
  };

  await Todo.create(todoData);

  res.json({ message: "Todo was created" });
};

module.exports = addTodo;
