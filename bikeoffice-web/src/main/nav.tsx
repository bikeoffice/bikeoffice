import * as React from 'react';
import { AppBar, Link, TitlePortal } from 'react-admin';
import { Box, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const MainNav = () => {
    const linkStyle = { color: "white", fontSize: "16px", fontWeight: "800", opacity: 1 };
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    const routes = {
        tpv: { value: 0, to: '/tpv', label: 'TPV' },
        rent: { value: 1, to: '/rent', label: 'Rent' },
        manage: { value: 2, to: '/manage', label: 'Manage' }
    }

    React.useEffect(() => {
        const resource = routes[location.pathname.replace('/', '')];
        if (resource) {
            setValue(resource.value);
        }        
    }, [location]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AppBar>
            <TitlePortal />
            <Tabs centered value={value} onChange={handleChange}>
                <Link to={routes.tpv.to}><Tab sx={linkStyle} label={routes.tpv.label} /></Link>
                <Link to={routes.rent.to}><Tab sx={linkStyle} label={routes.rent.label} /></Link>
                <Link to={routes.manage.to}><Tab sx={linkStyle} label={routes.manage.label} /></Link>
            </Tabs>
            <Box flex="1" />
        </AppBar>
    )
}
