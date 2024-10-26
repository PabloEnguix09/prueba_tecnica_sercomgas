import { FastifyInstance, FastifyReply } from "fastify";
import { deleteAll, get, post } from "../utils";
import { OperationType } from "../lib/operation.types";
import { Operation } from "../db/entities/operation";

export function operationRoutes(server: FastifyInstance) {
    server.get("/operations", async(request, reply) => {
        await get(server, "/operations", reply);
    })

    server.post<{Body: OperationType; Reply: FastifyReply }>("/operations", async(request, reply) => {

        const {marketer_id, client_id, type, amount, price} = request.body;

        const newOperation = new Operation();

        newOperation.marketer_id = marketer_id;
        newOperation.client_id = client_id;
        newOperation.type = type;
        newOperation.amount = amount;
        newOperation.price = price;
        newOperation.created_at = new Date();

        await post(server, "/operations", reply, newOperation);
    })

    server.delete("/operations", async(request, reply) => {
        await deleteAll(server, "/operations", reply);
    })
}