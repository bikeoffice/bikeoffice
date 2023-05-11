import { Datagrid, List, Loading, TextField, useGetList } from "react-admin"

 const userList = () => {
    return (
    <List>
        <Datagrid>
            <TextField source="name" />
            <TextField source="password" />
            <TextField source="schema" />
        </Datagrid>
    </List>
 )
}

export const UserList = () => {
    const { data, total, isLoading, error } = useGetList("users", {})
    if (isLoading) { return <Loading /> }
    if (error) { return <p>Error</p> }
    console.log(data)
    return userList()
}

