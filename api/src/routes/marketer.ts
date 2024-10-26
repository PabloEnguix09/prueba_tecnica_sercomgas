import { FastifyInstance, FastifyReply } from "fastify";
import { get, post } from "../utils";
import { MarketerType } from "../lib/marketer.types";
import { Marketer } from "../db/entities/marketer";

export function marketerRoutes(server: FastifyInstance): void {
    server.get("/marketers", async(request, reply) => {
        await get(server, "/marketers", reply);
    });

    server.post<{Body: MarketerType; Reply: FastifyReply }>("/marketers", async(request, reply) => {
        
        const {name} = request.body;

        const newMarketer = new Marketer();
        newMarketer.name = name;
        newMarketer.created_at = new Date();
        newMarketer.updated_at = new Date();
        
        
        await post(server, "/marketers", reply, newMarketer);
    });
}