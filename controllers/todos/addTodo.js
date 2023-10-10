const Todo = require("../../models/Todo");

const addTodo = async (req, res) => {
  const { _id: owner } = req.user;

  const tododData = {
    ...req.body,
    owner,
  };

  await Todo.create(tododData);

  res.json({ message: "Todo was created" });
};

module.exports = addTodo;
