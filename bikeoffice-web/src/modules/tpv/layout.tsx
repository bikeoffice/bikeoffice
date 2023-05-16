import { Layout } from 'react-admin';
import { Box } from '@mui/material';
import { MainNav } from '../../main/nav';

export const TPVLayout = (props: any) => <Layout {...props} appBar={MainNav} menu={Box} />;
