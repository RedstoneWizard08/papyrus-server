import express from "express";

export default interface Route {
    path?: string,
    paths?: string[],
    method?: "GET" | "PUT" | "DELETE" | "POST" | "ALL",
    handler?: (req: express.Request, res: express.Response, next: express.NextFunction) => any
}