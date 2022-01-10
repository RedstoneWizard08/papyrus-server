import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import setupRoutes from './scripts/setup_routes';
import fs from "fs";
import path from 'path';

const app = express();
const port = process.env.PORT || 4202;

const servlet = http.createServer(app);

const env_ = fs.readFileSync(path.join(__dirname, "env.json"));
const env = JSON.parse(env_.toString());

mongoose.connect(`mongodb://${env.mongodb.username}:${env.mongodb.password}@dns.nosadnile.net:27017/papyrus_v6_api_testing`, {}, async (err) => {
    if(err) {
        console.log(err);
        app.get("*", async (req, res) => {
            res.status(500);
            res.type("text/plain");
            res.send("500 | Could not connect to database. Please try again later.");
        });
    } else {
        console.log("Connected to database!");

        // Routes
        await setupRoutes(app);
    }
    servlet.listen(port, async () => {
        console.log(`⚡️ [server] App listening on port ${port}.`);
    });
});