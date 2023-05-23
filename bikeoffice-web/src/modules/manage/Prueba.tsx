import { Layout, Sidebar, Menu, MenuItemLink, AppBar, Title } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostIcon from '@mui/icons-material/PostAdd';
import { Card, CardContent } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MainNav } from '../../main/nav';

export const Prueba = () => {

    const theme = createTheme({
        components: {
            // Name of the component
            MuiCardContent: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        padding: '0',
                    },
                },
            },
        },
    });

    return (
        <>
            <MainNav />
            <br />

            {/* <Card style={{width: '100%'}}> */}
            <Title title="Prueba" />
            <ThemeProvider theme={theme}>
                <CardContent>
                    <h1>Esto es una prueba</h1>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div><div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolores porro corrupti quas cupiditate repellendus laudantium reprehenderit voluptas ratione magnam delectus voluptatem et ipsam magni nesciunt labore, minus omnis in.
                    </div>
                </CardContent>
            </ThemeProvider>
            
        </>
    );
};
