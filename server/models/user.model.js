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
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'Passwords must be at least six characters'
      }
    },
    set(value) {
      this.setDataValue('password', value);
      this.setDataValue('password_hash', Bcrypt.hashSync(value));
    },
  },
  password_hash: {
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
}, {
  instanceMethods: {
    authenticate: function (password) { // eslint-disable-line object-shorthand
      return Bcrypt.compareSync(password, this.password_hash);
    }
  }
});

User.belongsTo(Role, {
  as: 'role',
  foreignKey: {
    allowNull: true
  }
});

export default User;
