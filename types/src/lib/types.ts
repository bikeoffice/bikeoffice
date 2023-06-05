import { Sequelize } from 'sequelize';
import { UserConfig, UserDefinition } from '../models/User';
import { EmployeeDefinition } from '../models/Employee';
import { ClientConfig, ClientDefinition } from '../models/Client';
import { BikeConfig, BikeDefinition } from '../models/Bike';
import { RentConfig, RentDefinition } from '../models/Rent';
import { BikeDetailConfig, BikeDetailDefinition } from '../models/BikeDetail';
import { BikeSizeConfig, BikeSizeDefinition } from '../models/BikeSize';
import { CategoryConfig, CategoryDefinition } from '../models/Category';
import { TicketDefinition, TicketProductsDefinition } from '../models/Ticket';
import { ProductConfig } from '../models/Product';
import { ProductDefinition } from '../models/Product';
export const sequelize = new Sequelize('postgres://bikeoffice:bikeoffice@localhost:5432/bikeoffice');

// manage
export const Employee = sequelize.define('employee', EmployeeDefinition);
export const User = sequelize.define('user', UserDefinition, UserConfig);
export const Product = sequelize.define('product', ProductDefinition, ProductConfig);
// renting
export const Client = sequelize.define('client', ClientDefinition, ClientConfig);
export const Bike = sequelize.define('bike', BikeDefinition, BikeConfig);
export const Rent = sequelize.define('rent', RentDefinition, RentConfig);
export const BikeDetail = sequelize.define('bikeDetail', BikeDetailDefinition, BikeDetailConfig);
export const BikeSize = sequelize.define('bikeSize', BikeSizeDefinition, BikeSizeConfig);
export const Category = sequelize.define('category', CategoryDefinition, CategoryConfig);
// tpv
export const Ticket = sequelize.define('ticket', TicketDefinition);
export const TicketProduct = sequelize.define('ticketProduct', TicketProductsDefinition);

// rent
Rent.belongsTo(Client);
Rent.belongsTo(Bike);
Client.hasMany(Rent);
Bike.hasMany(Rent);
Bike.belongsTo(BikeDetail, { foreignKey: 'detailId' });
BikeDetail.belongsTo(BikeSize, { foreignKey: 'sizeId' });
Rent.belongsTo(Product);
Product.belongsTo(Category);

// tpv
TicketProduct.belongsTo(Ticket);
TicketProduct.belongsTo(Product);
Ticket.hasMany(TicketProduct);
Product.hasMany(TicketProduct);

// table migration
User.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('schema')), 'schema']] })
    .then(users => {
        sequelize.showAllSchemas({ logging: false }).then((data) => {
            users.forEach(user => {
                const schema = user.get('schema') as any;
                if (!data.includes(schema)) {
                    sequelize.createSchema(schema, {}).then(() => {
                        Employee.sync({ schema })
                            .then(() => Client.sync({ schema }))
                            .then(() => BikeSize.sync({ schema }))
                            .then(() => BikeDetail.sync({ schema }))
                            .then(() => Bike.sync({ schema }))
                            .then(() => Category.sync({ schema }))
                            .then(() => Product.sync({ schema }))
                            .then(() => Rent.sync({ schema }))
                            .then(() => Ticket.sync({ schema }))
                            .then(() => TicketProduct.sync({ schema }))
                            .catch(error => {
                                console.error('Error syncing models:', error);
                            });
                    })
                }
            })
        })
    })

