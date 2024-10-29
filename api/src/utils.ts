import { FastifyInstance, FastifyReply } from "fastify";
import { Repository } from "typeorm";
import { Marketer } from "./db/entities/marketer";
import { Operation } from "./db/entities/operation";

function getRepository(server: FastifyInstance, route: string): Repository<object> | void {
    let repo : Repository<object>;

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

function createSearchParams<T extends object>(body: T): object {

    let searchParams = {};

    switch (true) {
        case body instanceof Marketer:
            searchParams = {name: body.name};
            break;
        case body instanceof Operation:
            searchParams = {marketer_id: body.marketer_id, client_id: body.client_id, type: body.type, amount: body.amount, price: body.price};
            break;
        default:
            break;
    }
    return searchParams;
}

function isBodyCorrect<T>(body: T): boolean {

    let isBodyCorrect = true;

    switch (true) {
        case body instanceof Marketer:
            isBodyCorrect = body.name !== undefined;
            break;
        case body instanceof Operation:
            isBodyCorrect = body.marketer_id !== undefined && body.client_id !== undefined && body.type !== undefined && body.amount !== undefined && body.price !== undefined;
            break;
        default:
            break;
    }

    return isBodyCorrect;
}

export async function get(server: FastifyInstance, route: string, reply: FastifyReply) {
    const repo = getRepository(server, route);

    if (!repo) {
        return;
    }
    const data = await repo.find().then((data) => data).catch((err) => {reply.code(500).send({message: err})});
    reply.code(200).send({success: true, data: data});
}

export async function post<T extends object>(server: FastifyInstance, route: string, reply: FastifyReply, body: T) {
    const repo = getRepository(server, route);

    if (!repo) {
        return;
    }

    if (isBodyCorrect(body) === false) {
        reply.code(400).send({message: "Invalid request body"});
        return;
    }
    
    const searchParams = createSearchParams(body);

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
    const repository = route.split("/")[1];
    await repo.query(`TRUNCATE TABLE ${repository} RESTART IDENTITY CASCADE`);
    reply.code(204).send();
}