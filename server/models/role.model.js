import Sequelize from 'sequelize';
import sequelizeInstance from './connection';


const Role = sequelizeInstance.define('Role', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

export default Role;
