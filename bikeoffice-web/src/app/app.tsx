import { Admin, CustomRoutes, Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from '../authProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainLayout } from '../main/layout';
import { TPVPage } from '../modules/tpv/page';
import { RentPage } from '../modules/rent/page';
import { routes } from '../main/routes';
import Settings from '../modules/manage/Settings';


export default function App() {
    return (
        <BrowserRouter>
            <Admin layout={MainLayout} dataProvider={simpleRestProvider("/api")} authProvider={authProvider} requireAuth>
                <Resource name='posts' />
                <CustomRoutes key='tpvModule'>
                    <Route path={routes.tpv.to} Component={TPVPage} />
                </CustomRoutes>
                <CustomRoutes key='rentModule'>
                    <Route path={routes.rent.to} Component={RentPage} />
                </CustomRoutes>
                <CustomRoutes key='manageModule'>
                    {/* The element prop can be passed from an object, with this approach, 
                        can pass a default page to the module and go fully customizable 
                    */}
                    <Route path={routes.manage.to} element={<Settings />} />
                </CustomRoutes>
            </Admin>
        </BrowserRouter>
    );
}

