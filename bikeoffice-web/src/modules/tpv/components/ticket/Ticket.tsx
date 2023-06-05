import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import "./Ticket.scss";
import { DynamicTotal } from "../DynamicTotal";
import { DynamicPrice } from "../DynamicPrice";
import { ticketAPI } from "../../../api/ticket";
import { TicketFooter } from "./components/TicketFooter";
import { TicketHeader } from "./components/TicketHeader";
import { TicketPayment } from "./components/TicketPayment";
import { TicketProductList } from "./components/TicketProductList";
import { TicketTotal } from "./components/TicketTotal";

export const Ticket = forwardRef(({ closeTicket }: any, ref) => {

    const [ticket, setTicket] = useState<any>({});
    const [selectedProducts, setSelectedProducts] = useState<Map<number, any>>(new Map<number, any>());
    const [totals, setTotals] = useState<DynamicTotal>({} as DynamicTotal);
    const [cash, setCash] = useState<any>({ total: 0, selected: true });

    const getTotalPrice = useCallback(() => selectedProducts && Array.from(selectedProducts).reduce((a, [, v]) => a + (v.price * v.quantity), 0), [selectedProducts]);
    const getIva = useCallback(() => selectedProducts && Array.from(selectedProducts).reduce((a, [, v]) => a.set(v.iva, (a.get(v.iva) || 0) + (v.price * v.quantity)), new Map<number, number>()), [selectedProducts]);

    const loadTicket = useCallback((tick: any) => {
        setTicket(tick);
        setTotals(new DynamicTotal({ discount: tick.discount }));
        setCash({ total: tick.cashAmount ?? 0, selected: tick.payment === "cash" });
        setSelectedProducts(tick.products?.reduce((a: any, p: any) => a.set(p.id, new DynamicPrice(p)), new Map<number, any>()) ?? new Map<number, any>())
    }, []);

    useEffect(() => {
        ticketAPI.get().then((ticket: any) => loadTicket(ticket))
    }, [loadTicket]);

    useEffect(() => {
        setTotals(oldTotals => new DynamicTotal({ ...oldTotals, total: getTotalPrice(), iva: getIva() }));
    }, [selectedProducts, getTotalPrice, getIva]);

    useImperativeHandle(ref, () => ({
        selectProduct: function(product: any) {
            if (selectedProducts.has(product.id)) {
                selectedProducts.get(product.id).addQuantity();
                ticketAPI.put(selectedProducts.get(product.id), ticket.id)
            } else {
                selectedProducts.set(product.id, new DynamicPrice(product));
                ticketAPI.post(product, ticket.id)
            }
            setSelectedProducts(new Map(selectedProducts))
        },
        setTicket: function(id: string) {
            ticketAPI.get(id).then((ticket: any) => loadTicket(ticket))
        }
    }));

    const handleCloseTicket = () => {
        if (!cash.selected || cash.total >= totals.total) {
            ticket.total = totals.total
            ticket.cashAmount = cash.selected ? cash.total : 0
            ticketAPI.post(ticket).then(() => ticketAPI.get().then((t: any) => loadTicket(t)))
            closeTicket()
        }
    }

    return (
        <section aria-label="Ticket">
            <TicketHeader id={ticket.id} date={ticket.date} />
            <div className="ticket-separator"></div>
            <div className="ticket-body-header">
                <span>CANT</span>
                <span>DESCRIPCION</span>
                <span>PRECIO</span>
            </div>
            <div className="ticket-separator"></div>
            <TicketProductList selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} ticketId={ticket.id} />
            <div className="ticket-separator dashed"></div>
            <TicketTotal totals={totals} setTotals={setTotals} ticketId={ticket.id} getTotalPrice={getTotalPrice} getIva={getIva} />
            <div className="ticket-separator dashed"></div>
            <TicketPayment cash={cash} setCash={setCash} id={ticket.id} totalPrice={totals.total} />
            <TicketFooter id={ticket.id} />
            <button className="close" onClick={handleCloseTicket}>Cobrar</button>
        </section>
    )
})
