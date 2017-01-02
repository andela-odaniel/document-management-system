import Role from '../models/role.model';

const data = [
  { title: 'admin' },
  { title: 'regular' }
];

export default (cb, done) => {
  Role.bulkCreate(data)
    .then(() => {
      cb(done);
    });
};
