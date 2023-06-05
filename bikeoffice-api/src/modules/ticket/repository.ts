import { Product, Ticket, TicketProduct, sequelize } from "@bikeoffice/types";

export const TicketRepository = {} as any;

TicketRepository.create = (schema: string, model: string, body: any) => {
    return sequelize.model(model).schema(schema).create(body)
}

TicketRepository.update = (schema: string, model: string, params: any, body: any) => {
    return sequelize.model(model).schema(schema).update(body, { where: { ...params } })
}

TicketRepository.delete = (schema: string, model: string, params: any) => {
    return sequelize.model(model).schema(schema).destroy({ where: { ...params } })
}

TicketRepository.getTicket = async (schema: string, params: any, order: any) => {
    const ticket: any = (await Ticket.schema(schema)
        .findOne({
            where: params,
            order: [order ?? ["id", "ASC"]],
            include: {
                model: TicketProduct.schema(schema),
                include: [Product.schema(schema)]
            },
        }))?.toJSON();

    if (!ticket) return null;

    ticket.products = ticket.ticketProducts.map((tp: any) => ({
        id: tp.product.id,
        name: tp.product.name,
        price: tp.modifiedPrice ?? tp.product.price,
        quantity: tp.quantity,
        discount: tp.discount,
        iva: tp.product.iva,
        stock: tp.product.stock,
    }));
    delete ticket.ticketProducts;

    return ticket;
}

TicketRepository.getTicketsRaw = async (schema: string, model: string, params: any) => {
    return sequelize.model(model).schema(schema).findAll({ where: { ...params } })
}
