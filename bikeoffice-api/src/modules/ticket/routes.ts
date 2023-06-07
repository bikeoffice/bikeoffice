import express from "express";
import { TicketService } from "./service";

export const TicketRouter = express.Router();

TicketRouter.get("/new", TicketService.create);
TicketRouter.get("/open", TicketService.getOpen);
TicketRouter.get("/:id", TicketService.getOne);
TicketRouter.get("/", TicketService.getLatest);

TicketRouter.post("/:id", TicketService.close);
TicketRouter.post("/:id/:productId", TicketService.addProduct);

TicketRouter.put("/:id", TicketService.update);
TicketRouter.put("/:id/:productId", TicketService.updateProduct);

TicketRouter.delete("/:id", TicketService.delete);
TicketRouter.delete("/:id/:productId", TicketService.deleteProduct);
