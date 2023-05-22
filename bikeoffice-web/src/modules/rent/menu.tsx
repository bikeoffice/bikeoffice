import { Menu } from "react-admin"

export const RentMenu = () => {
    <Menu>
        <Menu.DashboardItem />
        <Menu.Item to="/rents" primaryText="rent" />
        <Menu.ResourceItem name="calendar" />
        <Menu.ResourceItem name="clients" />
        <Menu.ResourceItem name="bikes" />
    </Menu>
}