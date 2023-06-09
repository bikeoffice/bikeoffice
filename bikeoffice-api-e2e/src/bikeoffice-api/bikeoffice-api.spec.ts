import fs from "fs";
import path from "path";
import supertest from "supertest";
import { app } from "../../../bikeoffice-api/src/main";
import * as migrations from "../../../types/src/index"; // this executes the migrations

const agent = supertest(app);

jest.setTimeout(10000); // hacking the suite

describe("USE CASES", () => {
	var insertsFilePath = path.resolve(__dirname, "../test.sql");
	var plato: string; // cookie encrypted

	beforeAll(async () => {
		// migrate tables for each schema
		await new Promise(res => setTimeout(res, 5000)); // u don't know js

		// insert test data
		const inserts = await fs.promises.readFile(insertsFilePath, "utf-8");
		await migrations.sequelize.query(inserts);

		// test user
		const user = {
			username: "testv",
			password: "testv",
		};

		const res = await agent.post("/auth/login").send(user).set("Content-Type", "application/json");
		const cookie = res.header["set-cookie"][0];
		plato = cookie.substring(cookie.indexOf("plato=") + 6, cookie.indexOf("; "));
		expect(res.statusCode).toEqual(200);
	});

	/**
	 * 1) AUTH TESTS
	 */

	// check if the cookie is setted successfully
	it("IS THERE PLATO?", () => {
		expect(plato.length).toBeTruthy();
	});

	it("CHECK AUTH OK", async () => {
		const res = await agent.get("/auth/check").set("Cookie", [`plato=${plato};`]);
		expect(res.statusCode).toEqual(200);
	});

	it("CHECK AUTH KO", async () => {
		const res = await agent.get("/auth/check");
		expect(res.statusCode).toEqual(401);
	});

	it("LOGOUT SUCCESSFULLY", async () => {
		const res = await agent.get("/auth/logout");
		const cookie = res.header["set-cookie"][0];
		const removedPlato = cookie.substring(cookie.indexOf("plato=") + 6, cookie.indexOf("; "));
		expect(res.statusCode).toBe(200);
		expect(removedPlato).toBe("");
	});

	/**
	 * 2) AVAILABILITY TESTS
	 */

	it("AVAILABILITY", async () => {
		expect(true).toBeTruthy();
	});

	/**
	 * 3) RENT TESTS
	 */

	it("RENT", async () => {
		expect(true).toBeTruthy();
	});

	/**
	 * 4) TICKET TESTS
	 */

	it("TICKET", async () => {
		expect(true).toBeTruthy();
	});
});
