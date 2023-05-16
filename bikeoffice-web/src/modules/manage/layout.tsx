import { MainNav } from '../../main/nav';
import { Layout } from 'react-admin';

export const ManageLayout = (props: any) =>  <Layout {...props} appBar={MainNav} />;
