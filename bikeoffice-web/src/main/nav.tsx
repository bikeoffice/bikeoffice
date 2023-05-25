import * as React from 'react';
import { AppBar, Link, TitlePortal } from 'react-admin';
import { Box, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { routes } from './routes';

export const MainNav = (props: any) => {
    const linkStyle = { color: "white", fontSize: "16px", fontWeight: "800", opacity: 1 };
    const location = useLocation();
    const [value, setValue] = React.useState(-1);

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
