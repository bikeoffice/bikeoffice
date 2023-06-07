import { MainNav } from "../../main/nav";
import { Layout } from "react-admin";
import { RentSidebar } from "./sidebar";

export const RentLayout = (props: any) => <Layout {...props} appBar={MainNav} sidebar={RentSidebar} />;
