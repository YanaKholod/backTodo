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
    const wss = new WebSocket.Server({ server }); // создание подключения

    // подтверждение что клиент подключился
    wss.on("connection", (ws) => {
      console.log("WebSocket client connected");

      // отлов сообщений от клиента
      ws.on("message", (message) => {
        // Add your chatbot logic here
        // You can process the incoming message and send a response back to the client
        ws.send(`Received: ${message}`);
      });

      // закрытие соединения
      ws.on("close", () => {
        console.log("WebSocket client disconnected");
      });
    });
  })

  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // выходит из процесса и завершает работу нод джс и код (1) значит выход с ошибкой
  });
