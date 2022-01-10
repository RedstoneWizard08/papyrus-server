import fs from "fs";
import path from "path";
import Route from "../types/Route";
import express from "express";

export default function setupRoutes(app: express.Express) {
    return new Promise<string>((resolve, reject) => {
        if(!fs.existsSync(path.join(__dirname, "../routes"))) {
            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0mNo routes folder found!`)
            reject("");
            return;
        }
        let done = 0;
        const all = fs.readdirSync(path.join(__dirname, "../routes")).length;
        fs.readdirSync(path.join(__dirname, "../routes")).forEach(async (file) => {
            const route_ = await import(`../routes/${file}`);
            const route: Route = route_.default;
            if(route.handler) {
                if(route.method == "GET") {
                    if(route.paths) {
                        for(let i = 0; i < route.paths.length; i++) {
                            const path = route.paths[i];
                            app.get(path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    } else {
                        if(route.path) {
                            app.get(route.path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${route.path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        } else {
                            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No path(s) specified in route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    }
                } else if(route.method == "ALL") {
                    if(route.paths) {
                        for(let i = 0; i < route.paths.length; i++) {
                            const path = route.paths[i];
                            app.all(path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    } else {
                        if(route.path) {
                            app.all(route.path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${route.path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        } else {
                            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No path(s) specified in route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    }
                } else if(route.method == "DELETE") {
                    if(route.paths) {
                        for(let i = 0; i < route.paths.length; i++) {
                            const path = route.paths[i];
                            app.delete(path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    } else {
                        if(route.path) {
                            app.delete(route.path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${route.path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        } else {
                            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No path(s) specified in route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    }
                } else if(route.method == "POST") {
                    if(route.paths) {
                        for(let i = 0; i < route.paths.length; i++) {
                            const path = route.paths[i];
                            app.post(path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    } else {
                        if(route.path) {
                            app.post(route.path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${route.path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        } else {
                            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No path(s) specified in route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    }
                } else if(route.method == "PUT") {
                    if(route.paths) {
                        for(let i = 0; i < route.paths.length; i++) {
                            const path = route.paths[i];
                            app.put(path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    } else {
                        if(route.path) {
                            app.put(route.path, route.handler);
                            console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Route registered on path \x1b[36m${route.path}\x1b[0m from route \x1b[36mroutes/${file}\x1b[0m`);
                        } else {
                            console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No path(s) specified in route \x1b[36mroutes/${file}\x1b[0m`);
                        }
                    }
                } else {
                    console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No method specified in route \x1b[36mroutes/${file}\x1b[0m`);
                }
            } else {
                console.log(`\x1b[41m\x1b[30m ERROR \x1b[0m No handler specified in route \x1b[36mroutes/${file}\x1b[0m`);
            }
            done++;
            if(done == all) {
                console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Setting up default error handler...\x1b[0m`);
                app.get("/api", async (req, res) => { res.status(404).type("text/plain").send("404 | Route not found."); });
                app.get("/api/*", async (req, res) => { res.status(404).type("text/plain").send("404 | Route not found."); });
                console.log(`\x1b[42m\x1b[30m INFO \x1b[0m Done!\x1b[0m`);
                resolve("");
            }
        });
    });
}