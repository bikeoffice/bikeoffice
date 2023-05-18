import { Admin, CustomRoutes, ListGuesser, Resource, } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from '../authProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainLayout } from '../main/layout';
import { TPVPage } from '../modules/tpv/page';
import { ManagePage } from '../modules/manage/page';


export default function App() {
    return (
        <BrowserRouter>
            <Admin layout={MainLayout} dataProvider={simpleRestProvider("/api")} authProvider={authProvider} requireAuth>
                <CustomRoutes>
                    <Route path="/tpv" Component={TPVPage} />
                    <Route path="/manage" Component={ManagePage} />
                </CustomRoutes>

                <Resource name="users" list={ListGuesser} />
                <Resource name="employees" list={ListGuesser} />
                <Resource name="products" list={ListGuesser} />
            </Admin>
        </BrowserRouter>
    );
}

