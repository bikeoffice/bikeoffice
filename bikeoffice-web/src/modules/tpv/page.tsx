import { useEffect, useRef } from "react"
import { ProductList } from "./components/ProductList"
import Ticket from "./components/ticket"
import { TPVMenu } from "./menu"
export const TPVPage = () => {
    const ticketRef = useRef<any>();
    const menuRef = useRef<any>();

    const selectProduct = (product: any) => ticketRef.current.selectProduct(product);
    const setTicket = (ticket: any) => ticketRef.current.setTicket(ticket);
    const reloadTickets = () => setTimeout(menuRef.current.reloadTickets, 1000);

    useEffect(() => {
        const handleCreateTicket = () => {
            setTicket('new');
            reloadTickets();
        };

        document.body.addEventListener('createTicket', handleCreateTicket);
        document.querySelectorAll('.RaAppBar-menuButton, .MuiDrawer-root')
            .forEach((element) => element.setAttribute("style", "display: none"));
        reloadTickets();

        return () => {
            document.body.removeEventListener('createTicket', handleCreateTicket);
            document.querySelectorAll('.RaAppBar-menuButton, .MuiDrawer-root')
                .forEach((element) => element.setAttribute("style", "display: block"));
        };
    }, []);

    return (
        <>
            <TPVMenu ref={menuRef} setTicket={setTicket} />
            <span style={{ display: 'flex', padding: "30px 100px", maxHeight: "calc(100vh - 48px)" }}>
                <ProductList selectProduct={selectProduct} />
                <Ticket ref={ticketRef} closeTicket={reloadTickets} />
            </span>
        </>
    );
};

