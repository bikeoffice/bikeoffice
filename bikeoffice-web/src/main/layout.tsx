import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TPVLayout } from '../modules/tpv/layout';
import { ManageLayout } from '../modules/manage/layout';
import { routes } from './routes';
import { RentLayout } from '../modules/rent/layout';

export const MainLayout = (props: any) => {
    const [layout, setLayout] = React.useState("manage");
    const location = useLocation();
    const rootPath = '/';

    useEffect(() => {
        if (location.pathname === rootPath) {
            setLayout(routes.tpv.layout);
            return;
        }
        const resource = routes[location.pathname.replace('/', '')];
        if (resource) {
            setLayout(resource.layout);
        }
    }, [location]); 

    if (layout === routes.tpv.layout) {
        return TPVLayout(props)
    } else if (layout === routes.rent.layout) {
        return RentLayout(props)
    } else {
        return ManageLayout(props);
    }
}
