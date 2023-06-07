import { useEffect, useState } from "react";
import { AppBar, Link, TitlePortal } from "react-admin";
import { Box, Tabs, Tab } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./nav.scss";

export const TPVNav = () => {
	const linkStyle = { color: "white", fontSize: "16px", fontWeight: "800", opacity: 1 };
	const location = useLocation();
	const [value, setValue] = useState(0);

	const routes = {
		tpv: { value: 0, to: "/tpv", label: "TPV" },
		rent: { value: 1, to: "/rent", label: "Rent" },
		manage: { value: 2, to: "/manage", label: "Manage" },
	};

	useEffect(() => {
		document.querySelector(".TPVMenu")?.classList.add("docked");
		document.querySelector(".RaAppBar-menuButton")?.setAttribute("style", "display: none");
		document.querySelector(".MuiTabs-root")?.setAttribute("style", "margin-left: 40px");
		return () => {
			document.querySelector(".RaAppBar-menuButton")?.setAttribute("style", "display: block");
			document.querySelector(".MuiTabs-root")?.setAttribute("style", "");
		};
	}, []);

	useEffect(() => {
		const resource = routes[location.pathname.replace("/", "")];
		if (resource) {
			setValue(resource.value);
		}
	}, [location]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const toggleMenu = () => {
		document.querySelector(".aside-bar")?.classList.remove("show-animation");
		document.querySelector(".aside-bar")?.classList.add("hide-animation");
		setTimeout(() => {
			document.querySelector(".TPVMenu")?.classList.toggle("docked");
			document.querySelector(".aside-bar")?.classList.remove("hide-animation");
			document.querySelector(".aside-bar")?.classList.add("show-animation");
		}, 300);
	};

	const createTicket = () => {
		document.body.dispatchEvent(new CustomEvent("createTicket"));
	};

	return (
		<AppBar>
			<button className="ticket-btn" onClick={toggleMenu}>
				Tickets Abiertos
			</button>
			<button className="ticket-btn" onClick={createTicket}>
				Nuevo Ticket
			</button>
			<TitlePortal />
			<Tabs centered value={value} onChange={handleChange}>
				<Link to={routes.tpv.to}>
					<Tab sx={linkStyle} label={routes.tpv.label} />
				</Link>
				<Link to={routes.rent.to}>
					<Tab sx={linkStyle} label={routes.rent.label} />
				</Link>
				<Link to={routes.manage.to}>
					<Tab sx={linkStyle} label={routes.manage.label} />
				</Link>
			</Tabs>
			<Box flex="1" />
		</AppBar>
	);
};
