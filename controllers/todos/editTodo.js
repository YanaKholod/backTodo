const { HttpError } = require("../../helpers");
const Todo = require("../../models/Todo");

const editTodo = async (req, res) => {
  const { id } = req.params;

  const updateInfo = req.body;

  if (updateInfo.parentTodo) {
    const parentTodo = await Todo.findById(id);

    if (!parentTodo) {
      throw new HttpError(404, "Parent Todo not found");
    }

     const subTask = {
      title: updateInfo.title,
      description:updateInfo.description,
      isCompleted:updateInfo.isCompleted,
    };

    parentTodo.subTodo.push(subTask);

    const result = await parentTodo.save();

    if (!result) {
      throw new HttpError(500, "Failed to save sub-todo");
    }
    res.json("Sub-Todo added successfully");
  } else {
    const result = await Todo.findByIdAndUpdate(id, updateInfo, {
      new: true,
    });

    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json("Update success");
  }
};
module.exports = editTodo;
