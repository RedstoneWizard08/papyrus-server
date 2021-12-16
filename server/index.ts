import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import proxy from 'express-http-proxy';
import mongoose from 'mongoose';

const version = {
    backend: "0.3.2.0-alpha-2021-12-14",
    frontend: "0.2.1.0-alpha-2021-12-14",
    api: "0.1.0.0-alpha-2021-12-14",
    database: "5.0.5",
    node: "16.13.1",
    npm: "8.1.2",
    yarn: "1.22.17",
    httpd: "apache-2.4.41",
    ts_node: "10.4.0",
    typescript: "4.5.2",
};

interface LooseObject {
    [key: string]: any
}

const app = express();
const port = process.env.PORT || 4200;
const frontendPort = process.env.FRONTEND_PORT || 4201;
const apiPort = process.env.API_PORT || 4202;
const frontend = proxy(`http://localhost:${frontendPort}`, {});
const api = proxy(`http://localhost:${apiPort}`);

const servlet = http.createServer(app);
const io = new Server(servlet);

mongoose.connect("mongodb://localhost:27017/papyrus_v6_testing", {}, async (err) => {
    if(err) {
        console.log(err);
        app.get("*", (req, res) => {
            res.status(500);
            res.type("text/plain");
            res.send("500 | Could not connect to database. Please try again later.");
        });
    } else {
        console.log("Connected to database!");
        await import("./database/models/UserData");
        const UserData = mongoose.model("PRS_UserData");
        // SIO
        // var dta = new UserData({ username: 'RedstoneWizard08', name: 'Jacob Sapoznikow', email: 'jacob1coder@gmail.com', avatar: 'none', phone: '5037160470', servers: [ { icon: 'none', name: 'Home', id: 0, description: 'Welcome to Papyrus v6!', poster: 'None', isOwner: true, members: [ { username: 'RedstoneWizard08', icon: 'None', id: 0, status: { icon: 'online', message: 'None' } } ], categories: [ { name: 'uncategorized', id: 0, members: [ { name: 'general', type: 'text', id: 0, description: 'General - Talk about pretty much anything here!' } ] } ] } ] });
        // dta.markModified("anything");
        // var dd = await dta.save();
        io.on("connection", (socket) => {
            console.log(`${socket.id} | Client connected!    | { id: ${socket.id}, ip: ${socket.handshake.address} }`);
            socket.on("request_data", () => {
                var id = "61ba64ed142ea93ba3343990";
                // var id = dd._id;
                mongoose.model("PRS_UserData").findById(id, (err: string, doc: string) => {
                    if(err) return console.error(err);
                    socket.emit("initialUserData", doc);
                });
            });
            socket.on("disconnect", () => {
                console.log(`${socket.id} | Client disconnected! | { id: ${socket.id}, ip: ${socket.handshake.address} }`);
            });
        });
        // Routes
        app.get("/api", api);
        app.get("/api/*", api);

        app.get("/*", frontend);
    }
    servlet.listen(port, () => {
        console.log(`⚡️ [server] App listening on port ${port} (Frontend on port ${frontendPort}, API on port ${apiPort}).`);
    });
});