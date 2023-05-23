import { Menu, Sidebar } from "react-admin";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';

export const RentSidebar = () => (
    <Sidebar>
        <>
            <Menu.Item to="/rents-calendar" primaryText="Calendar" leftIcon={<CalendarMonthIcon />} />
            <Menu.ResourceItem name="rents" />
            <Menu.ResourceItem name="bikes" />
            <Menu.ResourceItem name="clients" />
        </>
    </Sidebar>
);