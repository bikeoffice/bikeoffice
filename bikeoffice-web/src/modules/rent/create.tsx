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

      const rentCreationResponse = await dataProvider.create('rents', { data: rest });
      await handleDowngradeStock(rentCreationResponse.data.bikeId);
      await handleRegisterRentAsProduct(rentCreationResponse.data);

      notify('Rent created successfully');
      redirect('list', '/rents');
    } catch (error: any) {
      notify('Error: Rent could not be created', { type: 'error' });
      console.log('el error es: ', error.message);
      throw new Error('Rent creation failed');
    }
  };

  const handleDowngradeStock = async (bikeId: number) => {
    const bikeDetail = getBikeDetail(bikeId);
    const currentStock = bikeDetail.stock;
    await dataProvider.update('details', { id: bikeDetail.id, data: { stock: currentStock - 1 } } as any);
  }

  const getBikeDetail = (bikeId: number) => {
    const rentedBike: any = availableBikes.find((b: any) => b.id === bikeId);
    return rentedBike.bikeDetail;
  }

  const handleRegisterRentAsProduct = async (rent: any) => {
    console.log('la rent es: ', rent);
    const { data } = await dataProvider.create('rentProducts', {
      data: {
        price: calculateTotalPricePerRent(new Date(rent.startDate), new Date(rent.endDate), getBikeDetail(rent.bikeId).price),
        rentId: rent.id,
        categoryId: 1  // name service of type rent
      }
    }
    );
  }

  const calculateTotalPricePerRent = (startDate: Date, endDate: Date, pricePerDay: number) => (Math.max(Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)), 1) * pricePerDay);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await dataProvider.getList('sizes', {
          pagination: { page: 1, perPage: 10 },
          sort: { field: 'name', order: 'ASC' },
          filter: {},
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
