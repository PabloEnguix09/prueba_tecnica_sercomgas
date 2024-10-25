import { FastifyInstance, FastifyReply } from "fastify";
import { Repository } from "typeorm";
import { Marketer } from "./db/entities/marketer";
import { Operation } from "./db/entities/operation";

interface Options {
    take: number,
    skip: number
}

export async function get(server: FastifyInstance, route: string, reply: FastifyReply, options?: Options) {
    let repo : Repository<Marketer | Operation>;

    switch (true) {
        case route.includes("marketers"):
            repo = server.orm["typeorm"].getRepository(Marketer);
            break;
        case route.includes("operations"):
            repo = server.orm["typeorm"].getRepository(Operation);
            break;
        default:
            reply.code(500).send({message: "An error occurred"});
            return;
    }
    const data = await repo.find(options).then((data) => data).catch((err) => {reply.code(500).send({message: err})});
    reply.code(200).send({success: true, data: data});
}