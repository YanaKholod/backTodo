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

    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
      console.log("A client connected to the WebSocket"); // подключился клиент

      ws.on("message", (message) => {
        wss.clients.forEach((client) => {
          // проверяет не является ли клиент отправителем чтобы показать остальным сообщение
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      ws.on("close", () => {
        // отключение от подключения
        console.log("A client disconnected from the WebSocket");
      });
    });

    wss.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
    process.on("SIGINT", () => {
      // при прерывании соединения отключает соединение
      server.close(() => {
        console.log("Server and WebSocket closed.");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });


