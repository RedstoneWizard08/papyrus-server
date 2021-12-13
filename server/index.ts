import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import proxy from 'express-http-proxy';

const app = express();
const port = process.env.PORT || 8900;
const frontendPort = process.env.FRONTEND_PORT || 8901;
const frontend = proxy(`http://localhost:${frontendPort}`, {});

const servlet = http.createServer(app);
const io = new Server(servlet);

io.on("connection", (socket) => {
    console.log(`${socket.id} | Client connected!    | { id: ${socket.id}, ip: ${socket.handshake.address} }`);
    socket.on("disconnect", () => {
        console.log(`${socket.id} | Client disconnected! | { id: ${socket.id}, ip: ${socket.handshake.address} }`);
    });
});

app.get("/*", frontend);

servlet.listen(port, () => {
    console.log(`⚡️ [server] App listening on port ${port} (Frontend on port ${frontendPort}).`);
});