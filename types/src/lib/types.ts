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
import { usersData, usersDataInsert } from './usersData';
import { testData } from './testData';
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
(async () => {

    try {
        // Insert user data
        console.log('EXECUTING USERS TABLE CREATION...');
        await sequelize.query(usersData, { logging: false });

        const userCount = await User.findAndCountAll()
        if (userCount.count === 0) {
            console.log('EXECUTING USERS DATA INSERTION...');
            await sequelize.query(usersDataInsert, { logging: false });
            console.log('USERS DATA INSERTION DONE!');
        }

        const users = await User.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('schema')), 'schema']], logging: false });
        const existingSchemas = await sequelize.showAllSchemas({ logging: false });
        console.log('existing schemas: ', existingSchemas);

        for (const user of users) {
            const schema = user.get('schema') as any;
            if (!existingSchemas.includes(schema)) {
                console.log('EXECUTING MIGRATION FOR SCHEMA: ', schema);
                await sequelize.createSchema(schema, { logging: false });
                await Employee.sync({ schema, logging: false });
                await Client.sync({ schema, logging: false });
                await BikeSize.sync({ schema, logging: false });
                await BikeDetail.sync({ schema, logging: false });
                await Bike.sync({ schema, logging: false });
                await Category.sync({ schema, logging: false });
                await Product.sync({ schema, logging: false });
                await Rent.sync({ schema, logging: false });
                await Ticket.sync({ schema, logging: false });
                await TicketProduct.sync({ schema, logging: false });
                await sequelize.query(testData.replace(/\$chema/g, schema), { logging: false });
            }
        }
        console.log('MIGRATIONS DONE!');

        // // Insert test data
        // console.log('EXECUTING TEST DATA INSERTION...');
        // await sequelize.query(testData);
        // console.log('TEST DATA INSERTION DONE!');
    } catch (error) {
        console.error('Error during table migration:', error);
    }
})();


