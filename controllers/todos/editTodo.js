const { HttpError } = require("../../helpers");
const Todo = require("../../models/Todo");

const editTodo = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  

  if (updateInfo.parentTodo) {
    // It's an update for a sub-todo
    const parentTodo = await Todo.findById(updateInfo.parentTodo);

    if (!parentTodo) {
      throw new HttpError(404, "Parent Todo not found");
    }

    // Push the new sub-todo into the parent's subTodos array
    parentTodo.subTodos.push(updateInfo);

    const result = await parentTodo.save();
    
 if (!result) {
      throw new HttpError(500, "Failed to save sub-todo");
    }

    res.json("Sub-Todo added successfully");
  } else {
    // It's an update for the parent todo
    const result = await Todo.findByIdAndUpdate(id, updateInfo, {
      new: true,
    });
    
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json("Update success");
};

module.exports = editTodo;
