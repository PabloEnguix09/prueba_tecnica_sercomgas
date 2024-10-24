import * as dotenv from "dotenv";
import { buildServer } from "./server";

dotenv.config()

async function start() {
    buildServer();

    /*
    server.register(fastifyCors, {
        origin: [
            "http://localhost:3000"],
    });

    configDb(server);*/

}

start();