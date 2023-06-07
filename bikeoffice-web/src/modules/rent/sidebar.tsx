import { Menu, Sidebar } from "react-admin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const RentSidebar = () => (
	<Sidebar>
		<>
			<Menu.Item to="/rents-calendar" primaryText="Calendar" leftIcon={<CalendarMonthIcon />} />
			<Menu.ResourceItem name="rents" />
			<Menu.ResourceItem name="bikes" />
			<Menu.ResourceItem name="details" />
			<Menu.ResourceItem name="clients" />
		</>
	</Sidebar>
);
