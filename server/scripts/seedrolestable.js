import Role from '../models/role.model';

const data = [
  { title: 'admin' },
  { title: 'regular' }
];

/**
 * Adds seed data to the roles table
 * @exports SeedRoles
 * @param {any} done
 * @returns {any} void
 */
export const SeedRoles = (done) => {
  Role.bulkCreate(data)
    .then(() => {
      done();
    });
};

/**
 * Truncates the roles table
 * @exports UnseedRoles
 * @param {any} done
 * @returns {any} void
 */
export const UnseedRoles = (done) => {
  Role.destroy({ cascade: true, truncate: true, restartIdentity: true })
    .then(() => {
      done();
    });
};
