import { ArrayField, Datagrid, DateField, List, RecordContextProvider, TextField } from "react-admin"
import "./Tickets.scss"
import { useEffect, useState } from "react"
import { ticketAPI } from "../../api/ticket"

export const TicketsList = (props: any) => {
    const [products, setProducts] = useState({products: []})

    useEffect(() => {
        document.querySelector("#main-content")?.setAttribute("style", "display: flex; flex-direction: row; padding-right: 0;")
        return () => {
            document.querySelector("#main-content")?.setAttribute("style", "")
        }
    }, [])


    const loadProducts = (id: any,) => {
        ticketAPI.get(id).then((ticket: any) => {
            setProducts({ products: ticket.products})
        })
        return id
    }

    return (
        <>
            <List {...props} filter={{ status: "closed" }} perPage={50} sx={{ flexGrow: 1 }}>
                <Datagrid rowClick={loadProducts}>
                    <TextField source="id" label="Ticket Number" />
                    <TextField source="payment" label="Payment Method" />
                    <TextField source="cashAmount" label="Cash Amount" />
                    <TextField source="discount" label="Discount" />
                    <TextField source="total" label="Total" />
                    <DateField source="date" label="Date" showTime />
                </Datagrid>
            </List>
            <aside className="products">
            <RecordContextProvider value={products}>
                <ArrayField source="products" label="Products">
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="name" label="Name" />
                        <TextField source="discount" label="Discount" />
                        <TextField source="quantity" label="Quantity" />
                        <TextField source="price" label="Price" />
                    </Datagrid>
                </ArrayField>
            </RecordContextProvider>
            </aside>
        </>
    )
}
