import { TicketRepository } from "./repository";

export const TicketService = {} as any

TicketService.create = (req: any, res: any) => {
    TicketRepository.create(req.user.schema, "ticket", { status: 'open' })
        .then((t: any) => res.json(t))
}

TicketService.getOne = (req: any, res: any) => {
    TicketRepository.getTicket(req.user.schema, req.params)
        .then((t: any) => res.send(t).status(200))
}

TicketService.getLatest = (req: any, res: any) => {
    TicketRepository.getTicket(req.user.schema, { status: 'open' }, ['createdAt', 'DESC'])
        .then(async (t: any) => {
            res.send(t ?? await TicketRepository.create(req.user.schema, "ticket", { status: 'open' }))
                .status(200)
        })
}

TicketService.getOpen = (req: any, res: any) => {
    TicketRepository.getTicketsRaw(req.user.schema, "ticket", { status: 'open' })
        .then((tickets: any) => res.send(tickets).status(200))
}

TicketService.close = (req: any, res: any) => {
    const { total, cashAmount } = req.body;
    TicketRepository.update(req.user.schema, "ticket", req.params,
        { status: 'closed', total, cashAmount })
        .then(() => res.sendStatus(200))
}

TicketService.addProduct = (req: any, res: any) => {
    const { id: ticketId, productId } = req.params;
    const { quantity = 1, discount = 0, modifiedPrice = null } = req.body;
    TicketRepository.create(req.user.schema, "ticketProduct",
        { ticketId, productId, quantity, discount, modifiedPrice })
        .then(() => res.sendStatus(200))
}

TicketService.update = (req: any, res: any) => {
    TicketRepository.update(req.user.schema, "ticket", req.params, req.body)
        .then(() => res.sendStatus(200))
}

TicketService.updateProduct = (req: any, res: any) => {
    const { id: ticketId, productId } = req.params;
    const { quantity = 1, discount = 0, modifiedPrice = null } = req.body;
    TicketRepository.update(req.user.schema, "ticketProduct",
        { ticketId, productId }, { quantity, discount, modifiedPrice })
        .then(() => res.sendStatus(200))
}

TicketService.delete = (req: any, res: any) => {
    TicketRepository.delete(req.user.schema, "ticket", req.params)
        .then(() => res.sendStatus(200))
}

TicketService.deleteProduct = (req: any, res: any) => {
    const { id: ticketId, productId } = req.params;
    TicketRepository.delete(req.user.schema, "ticketProduct", { ticketId, productId })
        .then(() => res.sendStatus(200))
}
