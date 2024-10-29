import * as dotenv from "dotenv";
import { buildServer } from "./server";

dotenv.config()

async function start() {
    buildServer(process.env.NODE_ENV === "dev");
}

start();