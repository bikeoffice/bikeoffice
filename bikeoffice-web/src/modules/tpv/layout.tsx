import { Layout } from 'react-admin';
import { Box } from '@mui/material';
import { TPVNav } from './nav';

export const TPVLayout = (props: any) => {

    return <Layout {...props} appBar={TPVNav} menu={Box} />
};
