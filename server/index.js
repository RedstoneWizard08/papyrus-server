const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const proxy = require("express-http-proxy");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8900;
const frontendPort = process.env.FRONTEND_PORT || 8901;
const frontend = proxy(`http://localhost:${frontendPort}`, {});

const servlet = http.createServer(app);
const io = new Server(servlet);



servlet.listen(port, () => {
    console.log(`App listening on port ${port} (Frontend on port ${frontendPort}).`);
});