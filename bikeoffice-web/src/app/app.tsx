import { Admin, CustomRoutes, ListGuesser, Resource, } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from '../authProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainLayout } from '../main/layout';
import { TPVPage } from '../modules/tpv/page';
import { ManagePage } from '../modules/manage/page';
import { RentPage } from '../modules/rent/page';
import { routes } from '../main/routes';


export default function App() {
    return (
        <BrowserRouter>
            <Admin layout={MainLayout} dataProvider={simpleRestProvider("/api")} authProvider={authProvider} requireAuth>
                <CustomRoutes>
                    <Route path={routes.tpv.to} Component={TPVPage} />
                    <Route path={routes.rent.to} Component={RentPage}/>
                    <Route path={routes.manage.to} Component={ManagePage} />
                </CustomRoutes>

                <Resource name="users" list={ListGuesser} />
                <Resource name="employees" list={ListGuesser} />
                <Resource name="products" list={ListGuesser} />
            </Admin>
        </BrowserRouter>
    );
}

