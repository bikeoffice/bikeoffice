import { Admin, CustomRoutes, EditGuesser, ListGuesser, Resource, ShowGuesser, useRedirect } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from '../authProvider';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import { MainLayout } from '../main/layout';
import { TPVPage } from '../modules/tpv/page';
import { RentPage } from '../modules/rent/page';
import { routes } from '../main/routes';
import Settings from '../modules/manage/Settings';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import { RentCreate } from '../modules/rent/create';
import { MyCalendar } from '../modules/rent/calendar';

export default function App() {

    return (
        <BrowserRouter>
            <Admin layout={MainLayout} dashboard={() => <div/>} dataProvider={simpleRestProvider("/api")} authProvider={authProvider} requireAuth>
                <Resource name='rents' icon={SellIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} create={RentCreate} />
                <Resource name='bikes' icon={PedalBikeIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
                <Resource name='clients' icon={PersonIcon} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
                <CustomRoutes key='tpvModule' >
                    <Route path={routes.tpv.to} Component={TPVPage} />
                </CustomRoutes>
                <CustomRoutes key='rentModule'>
                    <Route path={routes.rent.to} Component={RentPage} />
                    <Route path='/rents-calendar' Component={MyCalendar} />
                </CustomRoutes>
                <CustomRoutes key='manageModule'>
                    <Route path={routes.manage.to} element={<div/>} />
                </CustomRoutes>
            </Admin>
        </BrowserRouter>
    );
}

