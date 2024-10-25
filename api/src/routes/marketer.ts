import { FastifyInstance } from "fastify";
import { get } from "../utils";

export function marketerRoutes(server: FastifyInstance): void {
    server.get("/marketers", async(request, reply) => {
        await get(server, "/marketers", reply);
    });
}