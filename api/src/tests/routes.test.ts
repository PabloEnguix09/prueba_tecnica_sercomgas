import { buildServer } from "../server";
import * as dotenv from "dotenv";

dotenv.config();

const server = buildServer(false);

describe("ENDPOINT TESTS", () => {

    beforeEach(async () => {
      await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    describe("Health check", () => {
        it("GET /health should return 200 and { success: true, message:'Hello World' }", async () => {

            const response = await server.inject({
                method: "GET",
                url: "/health"
            });

            expect(response.statusCode).toEqual(200);
            expect(response.json()).toEqual({ success: true, message:"Hello World" });
        });
    });

    describe("Endpoint not found", () => {

        it("GET /notAnEndpoint should return 404", async () => {
            const response = await server.inject({
                method: "GET",
                url: "/notAnEndpoint"
            });

            expect(response.statusCode).toEqual(404);
        });

        it("POST /notAnEndpoint should return 404", async () => {
            const response = await server.inject({
                method: "POST",
                url: "/notAnEndpoint"
            });

            expect(response.statusCode).toEqual(404);
        });

        it("DELETE /notAnEndpoint should return 404", async () => {
            const response = await server.inject({
                method: "DELETE",
                url: "/notAnEndpoint"
            });

            expect(response.statusCode).toEqual(404);
        });
    });

    describe("/marketers", () => {
        describe("GET /marketers (empty table)", () => {
            it("should return 200 and empty array", async () => {
                const response = await server.inject({
                    method: "GET",
                    url: "/marketers"
                });
                expect(response.statusCode).toEqual(200);
                expect(response.json().data).toEqual([]);
            });
        });

        describe("POST /marketers", () => {
            it("should return 201", async () => {
                const newMarketer = {
                    name: "test"
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/marketers",
                    body: newMarketer
                });

                expect(response.statusCode).toEqual(201);
                expect(response.json().data.name).toEqual("test");
            });

            it("should return 409", async () => {
                const newMarketer = {
                    name: "test"
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/marketers",
                    body: newMarketer
                });

                expect(response.statusCode).toEqual(409);
                expect(response.json().message).toEqual("Row already exists");
            });

            it("should return 201 (other marketer)", async () => {
                const newMarketer = {
                    name: "other"
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/marketers",
                    body: newMarketer
                });

                expect(response.statusCode).toEqual(201);
                expect(response.json().data.name).toEqual("other");
            });

            it("should return 400 BAD REQUEST", async () => {
                const newMarketer = {
                    notARealField: "notARealValue"
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/marketers",
                    body: newMarketer
                });

                expect(response.statusCode).toEqual(400);                
                expect(response.json().message).toEqual("Invalid request body");
            });
        });

        describe("GET /marketers", () => {
            it("should return 200", async () => {
                const response = await server.inject({
                    method: "GET",
                    url: "/marketers"
                });

                expect(response.statusCode).toEqual(200);
                expect(response.json().data.length).toEqual(2);
            });
        });
    });

    describe("/operations", () => {

        describe("GET /operations (empty table)", () => {
            it("should return 200 and empty array", async () => {
                const response = await server.inject({
                    method: "GET",
                    url: "/operations"
                });
                expect(response.statusCode).toEqual(200);
                expect(response.json().data).toEqual([]);
            });
        });

        describe("POST /operations", () => {
            const newOperation = {
                    marketer_id: 1,
                    client_id: 2,
                    type: "Compra",
                    amount: 1,
                    price: 1
                }

            it("should return 201", async () => {
                const response = await server.inject({
                    method: "POST",
                    url: "/operations",
                    body: newOperation
                });

                expect(response.statusCode).toEqual(201);
                expect(response.json().data.marketer_id).toEqual(1);
                expect(response.json().data.client_id).toEqual(2);
                expect(response.json().data.type).toEqual("Compra");
                expect(response.json().data.amount).toEqual(1);
                expect(response.json().data.price).toEqual(1);
            });

            it("should return 409", async () => {
                const response = await server.inject({
                    method: "POST",
                    url: "/operations",
                    body: newOperation
                });

                expect(response.statusCode).toEqual(409);
                expect(response.json().message).toEqual("Row already exists");
            });

            it("should return 201 (other operation)", async () => {
                const newOperation = {
                    marketer_id: 1,
                    client_id: 2,
                    type: "Venta",
                    amount: 1,
                    price: 1
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/operations",
                    body: newOperation
                });

                expect(response.statusCode).toEqual(201);
                expect(response.json().data.marketer_id).toEqual(1);
                expect(response.json().data.client_id).toEqual(2);
                expect(response.json().data.type).toEqual("Venta");
                expect(response.json().data.amount).toEqual(1);
                expect(response.json().data.price).toEqual(1);
            });

            it("should return 400 BAD REQUEST", async () => {
                const newOperation = {
                    notARealField: "notARealValue"
                }
                const response = await server.inject({
                    method: "POST",
                    url: "/operations",
                    body: newOperation
                });

                expect(response.statusCode).toEqual(400);
                expect(response.json().message).toEqual("Invalid request body");
            });
        });

        describe("GET /operations", () => {
            it("should return 200", async () => {
                const response = await server.inject({
                    method: "GET",
                    url: "/operations"
                });

                expect(response.statusCode).toEqual(200);
                expect(response.json().data.length).toEqual(2);
            });
        });
    });

    describe("DELETE /marketers", () => {
        it("should return 204", async () => {
            const response = await server.inject({
                method: "DELETE",
                url: "/marketers"
            });
            expect(response.statusCode).toEqual(204);
        });
    });

    describe("DELETE /operations", () => {
        it("should return 204", async () => {
            const response = await server.inject({
                method: "DELETE",
                url: "/operations"
            });
            expect(response.statusCode).toEqual(204);
        });
    });
});