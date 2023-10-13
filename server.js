const app = require("./index");
const mongoose = require("mongoose");
const WebSocket = require("ws");

const { DB_HOST } = process.env;
const PORT = 8080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
   

  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // выходит из процесса и завершает работу нод джс и код (1) значит выход с ошибкой
  });
