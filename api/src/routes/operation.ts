import { FastifyInstance } from "fastify";
import { get } from "../utils";

export function operationRoutes(server: FastifyInstance) {
    server.get("/operations", async(request, reply) => {
        await get(server, "/operations", reply);
    })
}