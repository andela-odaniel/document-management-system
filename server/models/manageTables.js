import sequelizeInstance from './connection';
import Role from './role.model';
import User from './user.model';
import Document from './document.model';


const createTables = () => {
  Role.sync();
  User.sync();
  Document.sync();
};

const dropTables = () => {
  const queryInterface = sequelizeInstance.getQueryInterface();
  queryInterface.dropTable('Documents');
  queryInterface.dropTable('Users');
  queryInterface.dropTable('Roles');
};

export default { createTables, dropTables };
