const { HttpError } = require("../../helpers");
const Todo = require("../../models/Todo");

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const result = await Todo.findByIdAndRemove(id);

  if (!result) {
    throw new HttpError(404, "Not found 1");
  }

  res.json("Delete success");
};

module.exports = deleteTodo;
