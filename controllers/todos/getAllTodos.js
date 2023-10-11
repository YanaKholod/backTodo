const Todo = require("../../models/Todo");

const getAllTodos = async (req, res) => {
  const { id } = req.user;

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const totalTodos = await Todo.countDocuments({ owner: id });
  const totalPages = Math.ceil(totalTodos / perPage);

  let query = Todo.find({ owner: id })
    .skip((page - 1) * perPage)
    .limit(perPage);

  const sortBy = req.query.sortBy || "title";
  const sortOrder = req.query.sortOrder || "asc";

  if (sortBy === "title") {
    const sortDirection = sortOrder === "asc" ? 1 : -1;
    query = query
      .collation({ locale: "en", strength: 1 })
      .sort({ companyName: sortDirection });
  }

  const todos = await query.exec();

  res.json({
    todos,
    totalPages,
    currentPage: page,
  });
};

module.exports = getAllTodos;
