const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
    console.log(`Message from ${data.ip} at ${data.time}: ${data.msg}`);
    io.emit("chat message", data); // そのままクライアントに送信
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server listen on 3000");
});
