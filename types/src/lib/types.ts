import { Sequelize } from 'sequelize';
import { UserConfig, UserDefinition } from '../models/User';
import { EmployeeDefinition } from '../models/Employee';
import { ProductDefinition } from '../models/Product';
import { ClientConfig, ClientDefinition } from '../models/Client';
import { BikeConfig, BikeDefinition } from '../models/Bike';
import { RentConfig, RentDefinition } from '../models/Rent';
export const sequelize = new Sequelize('postgres://bikeoffice:bikeoffice@localhost:5432/bikeoffice');

// manage
export const Employee = sequelize.define('employee', EmployeeDefinition);
export const User = sequelize.define('user', UserDefinition, UserConfig);
export const Product = sequelize.define('product', ProductDefinition);

// renting
export const Client = sequelize.define('client', ClientDefinition, ClientConfig);
export const Bike = sequelize.define('bike', BikeDefinition, BikeConfig);
export const Rent = sequelize.define('rent', RentDefinition, RentConfig);
// renting - associations


User.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('schema')), 'schema']] })
    .then(users => {
        sequelize.showAllSchemas({ logging: false }).then((data) => {
            users.forEach(user => {
                const schema = user.get('schema') as any;
                if (!data.includes(schema)) {
                    sequelize.createSchema(schema, {}).then(() => {
                        Employee.sync({ schema });
                        Product.sync({ schema });
                        Client.sync({ schema });
                    });
                }
            });
        })
    });
