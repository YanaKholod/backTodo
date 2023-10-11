const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/api/auth-routing");
const todoRoute = require("./routes/api/todo-routing");
require("dotenv").config(); // доступ к переменнім окружения из енв в переменніх окружения на сервере или локально

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // дев дает расширенній терминал

app.use(logger(formatsLogger)); // определяем терминал шорт или дев в зависимости от запущенного скрипта
app.use(cors()); // разрешаем всем доступ
app.use(express.json()); // допускает взодящие данніе в формате джсон и делает его доступнім в реквест бади

app.use("/api/todo/auth", authRoute); // подключаем роут к серверу
app.use("/api/todo/todos", todoRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found " }); // обрабатывает ошибки на несуществующие маршруты
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, stack: err.stack }); // отлавливает ошибки в других частях приложения
});

module.exports = app;
