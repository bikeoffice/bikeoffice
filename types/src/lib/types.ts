import { Sequelize } from 'sequelize';
import { UserDefinition } from '../models/User';
import { EmployeeDefinition } from '../models/Employee';
export const sequelize = new Sequelize('postgres://bikeoffice:bikeoffice@localhost:5432/bikeoffice');

export const Employee = sequelize.define('employees', EmployeeDefinition);
export const User = sequelize.define('users', UserDefinition);

User.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('schema')), 'schema']] })
    .then( users => {
    sequelize.showAllSchemas({ logging: false }).then((data) => {
        users.forEach(user => {
            const schema = user.get('schema') as any;
            if (!data.includes(schema)) {
                sequelize.createSchema(schema, {}).then(() => {
                    Employee.sync({schema});
                });
            }
        });
    })
});
