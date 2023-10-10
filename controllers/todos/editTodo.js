const { HttpError } = require("../../helpers");
const Todo = require("../../models/Todo");

const editTodo = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;

  const result = await Todo.findByIdAndUpdate(id, updateInfo, {
    new: true,
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json("Update success");
};

module.exports = editTodo;
