import Role from '../models/role.model';
import User from '../models/user.model';
import Document from '../models/document.model';


export const createTables = (done) => {
  Role.sync().then(() => {
    User.sync().then(() => {
      Document.sync().then(() => {
        done();
      });
    });
  });
};

export const dropTables = (done) => {
  Document.drop().then(() => {
    User.drop().then(() => {
      Role.drop().then(() => {
        done();
      });
    });
  });
};
