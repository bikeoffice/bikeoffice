import { useEffect, useRef } from "react";
import { ProductList } from "./components/ProductList";
import Ticket from "./components/ticket";
import { TPVMenu } from "./menu";
export const TPVPage = () => {
	const ticketRef = useRef<any>();
	const menuRef = useRef<any>();

	const selectProduct = (product: any) => ticketRef.current.selectProduct(product);
	const setTicket = (ticket: any) => ticketRef.current.setTicket(ticket);
	const reloadTickets = () => setTimeout(menuRef.current.reloadTickets, 1000);

	useEffect(() => {
		const handleCreateTicket = () => {
			setTicket("new");
			reloadTickets();
		};

		document.body.addEventListener("createTicket", handleCreateTicket);
		const style = document.createElement("style");
		style.innerHTML = `
            .RaAppBar-menuButton, .MuiDrawer-root {
                display: none !important;
            }
        `;
		document.head.appendChild(style);
		reloadTickets();

		return () => {
			document.body.removeEventListener("createTicket", handleCreateTicket);
			document.head.removeChild(style);
		};
	}, []);

	return (
		<>
			<TPVMenu ref={menuRef} setTicket={setTicket} />
			<span style={{ display: "flex", padding: "30px 100px", maxHeight: "calc(100vh - 48px)" }}>
				<ProductList selectProduct={selectProduct} />
				<Ticket ref={ticketRef} closeTicket={reloadTickets} />
			</span>
		</>
	);
};
