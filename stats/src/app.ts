import express, { Request, Response } from "express";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Stats microservice listening on port ${port}`);
});
