const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const todoSchema = new Schema(
  {
    owner: { type: String },
    title: { type: String, default: "", minlength: 3 },
    description: {
      type: String,
      default: "",
      minlength: 5,
    },
    isCompleted: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    subTodo: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        isCompleted: { type: Boolean, default: false },
      },
    ],
    steps: [
      {
        title: { type: String, default: "" },
        isCompleted: { type: Boolean, default: false },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

todoSchema.post("save", handleMongooseError);

const Todo = model("todos", todoSchema);

module.exports = Todo;
