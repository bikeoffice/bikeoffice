import React, { useEffect, useState } from 'react';
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableBikes, setAvailableBikes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeId, setSizeId] = useState<number | undefined>(undefined);

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

      rest.startDate = new Date(rest.startDate).toISOString().split('T')[0];
      rest.endDate = new Date(rest.endDate).toISOString().split('T')[0];

      await dataProvider.create('rents', { data: rest });

      notify('Rent created successfully');
      redirect('list', '/rents');
    } catch (error) {
      notify('Error: Rent could not be created', { type: 'error' });
      throw new Error('Rent creation failed');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await dataProvider.getList('sizes', {
          pagination: { page: 1, perPage: 10 }, // Adjust pagination options as needed
          sort: { field: 'name', order: 'ASC' }, // Sort options for the retrieved sizes
          filter: {}, // Additional filters if required
        }) as any;

        setSizes(data);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    })();
  }, [dataProvider]);

  useEffect(() => {
    if (!sizeId) return;

    const data = {
      startDate: new Date(startDate).toISOString().split('T')[0],
      endDate: new Date(endDate).toISOString().split('T')[0],
      sizeId
    };

    fetch('/api/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => setAvailableBikes(result))
      .catch(error => console.error('Error:', error));
  }, [sizeId, startDate, endDate]);

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSave}>
        <DateInput label="Start Date" source="startDate" value={startDate} onChange={(event) => (setStartDate(event.target.value))} defaultValue={new Date()} />
        <DateInput label="End Date" source="endDate" value={endDate} onChange={(event) => (setEndDate(event.target.value))} defaultValue={new Date()} />
        <SelectInput
          value={sizeId}
          onChange={(event) => (setSizeId(event.target.value))}
          source="sizeId"
          label="Size"
          choices={sizes}
          optionText="name"
          validate={required()}
        />
        <SelectInput
          source="bikeId"
          label="Bike"
          disabled={sizeId == undefined}
          choices={availableBikes}
          optionText="name"
          validate={required()}
        />
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
                  <SelectInput optionText="name" validate={required()} />
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
    </Create >
  );
};

export default RentCreate;
