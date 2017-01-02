import Sequelize from 'sequelize';
import Bcrypt from 'bcrypt-nodejs';
import { sequelizeInstance } from '../database/connection';
import Role from './role.model';

const User = sequelizeInstance.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.VIRTUAL,
    set: (value) => {
      if (!value) { throw new Error('You cannot save the user without a password'); }
      this.setDataValue('password', value);
      // fat arrow syntax would reassign the scope of "this"
      Bcrypt.hash(value, null, null, function (err, hash) {
        if (err) { throw new Error('An error occured saving the user'); }
        this.setDataValue('password_hash', hash);
      });
    },
    validate: {
      lengthCheck: (value) => {
        if (value.lenth < 6) {
          throw new Error('Passwords must be at least 6 characters long');
        }
      }
    }
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
