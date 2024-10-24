import { FastifyInstance } from "fastify";

export function configRoutes(server: FastifyInstance) {
    
    server.get("/health", (request, reply) => {
        reply.code(200).send({ success: true, message: "Hello World" });
    })
}