import { FastifyInstance } from "fastify";
import { marketerRoutes } from "./routes/marketer";
import { operationRoutes } from "./routes/operation";

export function configRoutes(server: FastifyInstance) {
    
    server.get("/health", (request, reply) => {
        reply.code(200).send({ success: true, message: "Hello World" });
    })

    marketerRoutes(server);
    operationRoutes(server);
}