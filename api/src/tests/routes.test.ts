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

            it("should return 404", async () => {
                const response = await server.inject({
                    method: "GET",
                    url: "/marketerss"
                });

                expect(response.statusCode).toEqual(404);
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

        describe("DELETE /marketers", () => {
            it("should return 204", async () => {
                const response = await server.inject({
                    method: "DELETE",
                    url: "/marketers"
                });

                expect(response.statusCode).toEqual(204);
            });
        });
    });
});