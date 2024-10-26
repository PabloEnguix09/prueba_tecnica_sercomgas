import { FastifyInstance, FastifyReply } from "fastify";
import { Repository } from "typeorm";
import { Marketer } from "./db/entities/marketer";
import { Operation } from "./db/entities/operation";

interface Options {
    take: number,
    skip: number
}

function getRepository(server: FastifyInstance, route: string): Repository<Marketer | Operation> | void {
    let repo : Repository<Marketer | Operation>;

    switch (true) {
        case route.includes("marketers"):
            repo = server.orm["typeorm"].getRepository(Marketer);
            break;
        case route.includes("operations"):
            repo = server.orm["typeorm"].getRepository(Operation);
            break;
        default:
            return;
    }

    return repo;
}

export async function get(server: FastifyInstance, route: string, reply: FastifyReply, options?: Options) {
    const repo = getRepository(server, route);

    if (!repo) {
        return;
    }
    const data = await repo.find(options).then((data) => data).catch((err) => {reply.code(500).send({message: err})});
    reply.code(200).send({success: true, data: data});
}

export async function post(server: FastifyInstance, route: string, reply: FastifyReply, body: Marketer | Operation) {
    const repo = getRepository(server, route);

    if (!repo) {
        return;
    }

    const searchParams = body instanceof Marketer ? {name: body.name} : {marketer_id: body.marketer_id, client_id: body.client_id, type: body.type, amount: body.amount, price: body.price};

    const rowAlreadyExists = await repo.findOneBy(searchParams)

    if(rowAlreadyExists) {
        reply.code(409).send({message: "Row already exists"});
    } else {
        await repo.save(body).then(() => reply.code(201).send({success: true, data: body}));
    }
}

export async function deleteAll(server: FastifyInstance, route: string, reply: FastifyReply) {
    const repo = getRepository(server, route);

    if (!repo) {
        return;
    }

    await repo.clear();
    reply.code(204).send();
}