import supertest from "supertest";
import { app } from "../../../bikeoffice-api/src/main";

const agent = supertest(app);

describe("USE CASES", () => {

    var plato: string;

    beforeAll(async () => {

        // test user
        const user = {
            username: "1234",
            password: "1234",
        };

        const res = await agent.post("/auth/login").send(user).set("Content-Type", "application/json");
        const cookie = res.header['set-cookie'][0];
        plato = cookie.substring(cookie.indexOf('plato=') + 6, cookie.indexOf('; '));
        expect(res.statusCode).toEqual(200);
    });

    /**
     * 1) AUTH TESTS
     */

    // check if the cookie is setted successfully
    it("IS THERE PLATO?", () => {
        console.log('el plato es: ', plato);
        expect(plato.length).toBeTruthy();
    });

    it("CHECK AUTH OK", async () => {
        const res = await agent.get('/auth/check').set('Cookie', [`plato=${plato};`]);
        expect(res.statusCode).toEqual(200);
    });

    it("CHECK AUTH KO", async () => {
        const res = await agent.get('/auth/check');
        expect(res.statusCode).toEqual(401);
    });

    it("LOGOUT SUCCESSFULLY", async () => {
        const res = await agent.get('/auth/logout');
        const cookie = res.header['set-cookie'][0];
        const removedPlato = cookie.substring(cookie.indexOf('plato=') + 6, cookie.indexOf('; '));
        expect(res.statusCode).toBe(200);
        expect(removedPlato).toBe('');
    });

    /**
     * 2) AVAILABILITY TESTS
     */
    
    it("", async () => {

    });
    

    /**
     * 3) RENT TESTS
     */

    /**
     * 4) TICKET TESTS
     */
});