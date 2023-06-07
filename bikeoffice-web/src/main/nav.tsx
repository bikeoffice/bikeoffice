import * as React from "react";
import { AppBar, Link, Logout, TitlePortal, UserMenu, useUserMenu } from "react-admin";
import { Box, Tabs, Tab, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "react-router-dom";
import { routes } from "./routes";

export const MainNav = (props: any) => {
	const linkStyle = { color: "white", fontSize: "16px", fontWeight: "800", opacity: 1 };
	const location = useLocation();
	const [value, setValue] = React.useState(2);

	React.useEffect(() => {
		const resource = routes[location.pathname.replace("/", "")];
		if (resource) {
			setValue(resource.value);
		}
	}, [location]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<AppBar
			userMenu={
				<UserMenu>
					<SettingsMenuItem />
					<Logout />
				</UserMenu>
			}>
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

const SettingsMenuItem = React.forwardRef((props, ref) => {
	const { onClose } = useUserMenu();

	return (
		<Link to="/settings">
			<MenuItem onClick={onClose} ref={ref} {...props}>
				<ListItemIcon>
					<SettingsIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Customize</ListItemText>
			</MenuItem>
		</Link>
	);
});
