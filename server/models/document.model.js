import Sequelize from 'sequelize';
import { sequelizeInstance } from '../database/connection';
import Role from './role.model';
import User from './user.model';


const Document = sequelizeInstance.define('Document', {
  access: {
    type: Sequelize.STRING,
    defaultValue: 'public',
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Document.belongsTo(Role, {
  as: 'role',
  foreignKey: {
    allowNull: false
  }
});

Document.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false
  }
});

export default Document;
