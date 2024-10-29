import fastify, { FastifyInstance } from "fastify";
import { configDb } from "./db/db.config";
import { configRoutes } from "./routes";
import fastifyCors from "@fastify/cors";

export function buildServer(logger: boolean = false): FastifyInstance {
    const server = fastify({ logger: logger });

    configDb(server);
    configRoutes(server);

    server.listen({ port: parseInt(process.env.PORT || "8080") }, (err: Error | null, address: string): void => {
        if (err) {
            server.log.error("ERROR");
            server.log.error(err);
            process.exit(1);
        }

        server.log.info(`server listening on ${address}`);
    });

    server.register(fastifyCors, {
        origin: ["http://localhost:3000"],
    });

    return server;
}
