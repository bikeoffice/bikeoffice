import { MainNav } from '../../main/nav';
import { Layout } from 'react-admin';
import { RentMenu } from './menu';

export const RentLayout = (props: any) =>  <Layout {...props} appBar={MainNav} menu={RentMenu} />;