import { MainNav } from '../../main/nav';
import { Layout, MenuItemLink, Sidebar, Menu } from 'react-admin';
import { Settings as SettingsIcon } from '@mui/icons-material';

// de esta manera se puede tener un menu unificado al estilo react admin, combinando rutas
// custom y rutas del palo resource para hacer el crud típico
// con esto podemos elegir que sale en el menu lateral, y lo ponemos en cada layout
// podemos tambien usar el objeto de config de rutas para enviar un componente como página
// de por defecto o incluso un dashboard, o no hacerlo y enviar directamente hacia la ruta que
// se quiera
const CustomSidebar = () => (
    <Sidebar>
        <>
        <MenuItemLink to="/settings" primaryText="settings" leftIcon={<SettingsIcon/>} />
        <Menu.ResourceItem name="posts" />
        {/* Add more custom menu items as needed */}
        </>
    </Sidebar>
);

export const ManageLayout = (props: any) => <Layout sidebar={undefined} {...props} appBar={MainNav} />;
