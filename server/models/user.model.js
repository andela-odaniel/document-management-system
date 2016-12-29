import Sequelize from 'sequelize';
import sequelizeInstance from './connection';
import Role from './role.model';


const User = sequelizeInstance.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

User.belongsTo(Role, {
  as: 'role',
  foreignKey: {
    allowNull: false
  }
});

export default User;
