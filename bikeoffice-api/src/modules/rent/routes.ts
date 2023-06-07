import express from "express";
import { getMany } from "./service";

export const RentsCalendarRouter = express.Router();

RentsCalendarRouter.get("/", async (req, res) => {
	const rents = await getMany({ filter: {}, limit: null, offset: null, order: null }, { req });
	return res.send(rents);
});
