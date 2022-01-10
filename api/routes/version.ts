import Route from "../types/Route";
import { version } from "../config";

const Version: Route = {
    paths: [ "/api/version", "/api/v1/version" ],
    method: "GET",
    handler: async (req, res) => {
        if(req.query.type == "text" || req.query.type == "plaintext") {
            if(req.query.module == "backend") {
                res.status(200);
                res.type("text/plain");
                res.send(version.backend);
            } else if(req.query.module == "frontend") {
                res.status(200);
                res.type("text/plain");
                res.send(version.frontend);
            } else if(req.query.module == "api") {
                res.status(200);
                res.type("text/plain");
                res.send(version.api);
            } else {
                res.status(400);
                res.type("text/plain");
                res.send("400 | Bad request.\nPossible fixes:\n    Include parameters: [ type, module ]\n        Parameter \"type\" possible values: [ text, plaintext, json ]\n            Required: true\n        Parameter \"module\" possible values: [ frontend, backend, api ]\n            Required: false");
            }
        } else if(req.query.type == "json") {
            if(req.query.module == "backend") {
                res.status(200);
                res.type("application/json");
                res.send(JSON.stringify({ version: version.backend }, null, 4));
            } else if(req.query.module == "frontend") {
                res.status(200);
                res.type("application/json");
                res.send(JSON.stringify({ version: version.frontend }, null, 4));
            } else if(req.query.module == "api") {
                res.status(200);
                res.type("application/json");
                res.send(JSON.stringify({ version: version.api }, null, 4));
            } else {
                res.status(200);
                res.type("application/json");
                res.send(JSON.stringify({ version: { papyrus: { backend: version.backend, frontend: version.frontend, api: version.api }, database: version.database, node: version.node, npm: version.npm, yarn: version.yarn, tsc: version.typescript, "ts-node": version.ts_node, apache: version.httpd } }, null, 4));
            }
        } else {
            res.status(400);
            res.type("text/plain");
            res.send("400 | Bad request.\nPossible fixes:\n    Include parameters: [ type, module ]\n        Parameter \"type\" possible values: [ text, plaintext, json ]\n            Required: true\n        Parameter \"module\" possible values: [ frontend, backend, api ]\n            Required: false");
        }
    }
};

export default Version;