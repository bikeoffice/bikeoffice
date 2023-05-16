import * as React from 'react';
import { AppBar, Link, TitlePortal } from 'react-admin';
import { Box, Tabs, Tab } from '@mui/material';

export const MainNav = () => {
    const [value, setValue] = React.useState(2);

    return (
    <AppBar>
        <TitlePortal />
        <Tabs centered value={value} onChange={(_, newValue: number) => setValue(newValue)} >
            <Link to="/tpv"><Tab sx={{color: "white", fontSize: "16px", fontWeight: "800", opacity: 1}} label="TPV"/></Link>
            <Link to="/rent"><Tab sx={{color: "white", fontSize: "16px", fontWeight: "800", opacity: 1}}  label="Rent"/></Link>
            <Link to="/manage"><Tab sx={{color: "white", fontSize: "16px", fontWeight: "800", opacity: 1}}  label="Manage"/></Link>
        </Tabs>
        <Box flex="1" />
    </AppBar>
)}

