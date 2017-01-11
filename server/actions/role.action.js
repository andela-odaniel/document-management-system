import Role from '../models/role.model';

/**
 * Gets a single user
 * @exports get
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function get(req, res) {
  Role.findOne({ where: { id: req.params.id } })
    .then((role) => {
      res.status(200).json(role);
    });
}

/**
 * Gets all users
 * @exports getAll
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function getAll(req, res) {
  Role.findAll()
    .then((roles) => {
      res.status(200).json(roles);
    });
}

/**
 * Creates a new user
 * @exports create
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function create(req, res) {
  Role.create(req.body)
    .then(() => {
      res.status(201).json({
        message: 'Role created successfully'
      });
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          message: 'This role already exists in the database'
        });
      }
    });
}

/**
 * Deletes a existing user
 * @exports destroy
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function destroy(req, res) {
  Role.destroy({ where: { id: req.params.id } })
    .then((numberOfRows) => {
      console.log('numberOfRows', numberOfRows);
      if (numberOfRows >= 1) {
        return res.status(200).send({
          message: 'Role deleted successfully'
        });
      } else { // eslint-disable-line no-else-return
        return res.status(404).json({
          message: 'Role not found'
        });
      }
    });
}
