import { useEffect } from "react";
import { Admin, CustomRoutes, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "../authProvider";
import { BrowserRouter, Route } from "react-router-dom";
import { MainLayout } from "../main/layout";
import { TPVPage } from "../modules/tpv/page";
import { RentPage } from "../modules/rent/page";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import LoupeIcon from "@mui/icons-material/Loupe";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import PersonIcon from "@mui/icons-material/Person";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import SellIcon from "@mui/icons-material/Sell";
import { RentCreate } from "../modules/rent/create";
import { MyCalendar } from "../modules/rent/calendar";
import { RentList } from "../modules/rent/list";
import { SettingsPage } from "../modules/settings/page";
import { TicketsList } from "../modules/manage/components/Tickets";
import { ManagePage } from "../modules/manage/page";
import Login from "../main/login";
import "./app.module.scss";

export default function App() {
	useEffect(() => {
		document.querySelector("body")?.setAttribute(
			"style",
			`
            --primary-color: #3C6E71;
            --secondary-color: #353535;
            --tertiary-color: #284B63;
            --alert-color: #FF7B7B;
            --text-hover-color: #FFFFFF;
            --text-color: #000000;
        `,
		);
	}, []);

	return (
		<BrowserRouter>
			<Admin layout={MainLayout} dashboard={() => <div />} dataProvider={simpleRestProvider("/api")} authProvider={authProvider} requireAuth loginPage={Login}>
				<Resource name="rents" icon={SellIcon} list={RentList} show={ShowGuesser} edit={EditGuesser} create={RentCreate} />
				<Resource name="clients" icon={PersonIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="bikes" icon={PedalBikeIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="details" icon={LoupeIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="sizes" icon={FormatSizeIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="categories" icon={CategoryIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="products" icon={ProductionQuantityLimitsIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
				<Resource name="tickets" list={TicketsList} />

				<CustomRoutes>
					<Route path="/tpv" Component={TPVPage} />
					<Route path="/rent" Component={RentPage} />
					<Route path="/rents-calendar" Component={MyCalendar} />
					<Route path="/" Component={ManagePage} />
					<Route path="/manage" Component={ManagePage} />
					<Route path="/settings" Component={SettingsPage} />
				</CustomRoutes>
			</Admin>
		</BrowserRouter>
	);
}
