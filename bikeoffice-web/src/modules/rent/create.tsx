import React from 'react';
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  FormDataConsumer,
  useNotify,
  useRedirect,
  useDataProvider,
} from 'react-admin';

export const RentCreate = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleSave = async (values: any) => {
    const { clientOption, clientId, name, email, phone, ...rest } = values;

    try {
      if (clientOption === 'new') {
        const newClient = { name, email, phone };
        const { data } = await dataProvider.create('clients', { data: newClient });
        rest.clientId = data.id;
      } else {
        rest.clientId = clientId;
      }

      await dataProvider.create('rents', { data: rest });

      notify('Rent created successfully');
      redirect('list', '/rents');
    } catch (error) {
      notify('Error: Rent could not be created', { type: 'error' });
      throw new Error('Rent creation failed');
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSave}>
        <DateInput label="Start Date" source="startDate" defaultValue={new Date()} />
        <DateInput label="End Date" source="endDate" defaultValue={new Date()} />

        <ReferenceInput
          label="Bike"
          source="bikeId"
          reference="bikes"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <React.Fragment>
              <SelectInput
                source="clientOption"
                label="Client Option"
                choices={[
                  { id: 'existing', name: 'Select Existing Client' },
                  { id: 'new', name: 'Create New Client' },
                ]}
                defaultValue="existing"
                {...rest}
              />

              {formData.clientOption === 'existing' ? (
                <ReferenceInput
                  label="Client"
                  source="clientId"
                  reference="clients"
                  validate={required()}
                  perPage={100}
                  sort={{ field: 'name', order: 'ASC' }}
                >
                  <SelectInput optionText="name" />
                </ReferenceInput>
              ) : (
                <React.Fragment>
                  <TextInput source="name" label="Name" validate={required()} />
                  <TextInput source="email" label="Email" validate={required()} />
                  <TextInput source="phone" label="Phone" validate={required()} />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};

export default RentCreate;
