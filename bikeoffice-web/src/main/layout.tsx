import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TPVLayout } from '../modules/tpv/layout';
import { ManageLayout } from '../modules/manage/layout';

export const MainLayout = (props: any) => {
    const [layout, setLayout] = React.useState("manage");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith("/tpv")) {
            setLayout("tpv");
        } else {
            setLayout("manage");
        }
    }, [location]);

    if (layout === "tpv") {
        return TPVLayout(props)
    } else {
        return ManageLayout(props)
    }
}
