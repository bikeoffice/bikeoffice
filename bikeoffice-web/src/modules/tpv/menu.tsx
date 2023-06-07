import { forwardRef, useImperativeHandle, useState } from "react";
import { ticketAPI } from "../api/ticket";

export const TPVMenu = forwardRef(({ setTicket }: any, ref) => {
	const [tickets, setTickets] = useState([]);
	const reloadTickets = () => {
		ticketAPI.get("open").then((tickets: any) => setTickets(tickets));
	};

	useImperativeHandle(ref, () => ({ reloadTickets }));

	const hideMenu = () => {
		document.querySelector(".aside-bar")?.classList.remove("show-animation");
		document.querySelector(".aside-bar")?.classList.add("hide-animation");
		setTimeout(() => {
			document.querySelector(".TPVMenu")?.classList.add("docked");
			document.querySelector(".aside-bar")?.classList.remove("hide-animation");
			document.querySelector(".aside-bar")?.classList.add("show-animation");
		}, 300);
	};

	return (
		<aside className="TPVMenu" onClick={hideMenu}>
			<div className="aside-bar">
				<ul className="ticket-list">
					{tickets.map((ticket: any) => (
						<button key={ticket.id} onClick={() => setTicket(ticket.id)}>
							{"#" + ticket.id}
						</button>
					))}
				</ul>
			</div>
		</aside>
	);
});
