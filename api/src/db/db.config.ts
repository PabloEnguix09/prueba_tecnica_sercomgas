import plugin from "typeorm-fastify-plugin";
import { FastifyInstance } from "fastify";
import { Marketer } from "./entities/marketer";
import { Operation } from "./entities/operation";

export function configDb(server: FastifyInstance) {

    server.register(plugin, {
        namespace: "typeorm",
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "sercomgas",
        password: process.env.DB_PASSWORD || "sercomgas",
        database: process.env.NODE_ENV === "dev" ? process.env.DB_DATABASE || "sercomgas" : process.env.DB_TEST_DATABASE || "testDb",
        synchronize: process.env.NODE_ENV === "dev",
        logging: process.env.NODE_ENV === "dev",
        migrations: [__dirname + "/migrations/*.ts"],
        //migrationsRun: process.env.NODE_ENV === "dev",
        migrationsRun: false,
        entities: [Marketer, Operation]
    })
}