import { Datagrid, DateInput, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField } from "react-admin";

export const RentList = (props) => {

    return (
        <List
            {...props}
            filters={<RentFilter />}
            perPage={10}
        >
            <Datagrid rowClick="edit">
                <ReferenceField
                    label="Client"
                    source="clientId"
                    reference="clients"
                >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField
                    label="Bike"
                    source="bikeId"
                    reference="bikes"
                >
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="startDate" label="Start Date" />
                <TextField source="endDate" label="End Date" />
            </Datagrid>
        </List>
    );
};

export default RentList;

const RentFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput
            source="clientId"
            label="Client"
            reference="clients"
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
            source="bikeId"
            label="Bike"
            reference="bikes"
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <DateInput source="startDate" label="Start Date" />
        <DateInput source="endDate" label="End Date" />
    </Filter>
);
