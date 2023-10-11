const express = require("express");
const { authenticate, isValidId } = require("../../middleware");
const todoController = require("../../controllers/todos/index");
const { controllWrapper } = require("../../helpers");

const router = express.Router();

router.get("/all", authenticate, todoController.getAllTodos);

router.post("/", authenticate, controllWrapper(todoController.addTodo));

router.patch(
  "/change/:id",
  authenticate,
  isValidId,
  controllWrapper(todoController.editTodo)
);

router.delete(
  "/delete/:id",
  authenticate,
  isValidId,
  controllWrapper(todoController.deleteTodo)
);

module.exports = router;
