import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Role from '../models/role.model';
import Document from '../models/document.model';


/**
 * Fetches a User
 * @exports get
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function get(req, res) {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json(user);
    });
}

/**
 * Fetches all Users
 * @exports getAll
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function getAll(req, res) {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    });
}

/**
 * Creates a User
 * @exports create
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function create(req, res) {
  User.create(req.body)
    .then((user) => {
      Role.find({ where: { id: user.roleId } })
        .then((role) => {
          const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: role.title
          }, process.env.SECRET);
          res.status(201).json({
            message: 'User created successfully',
            user,
            token
          });
        });
    })
    .catch((err) => {
      res.status(422).json({
        message: (() => {
          const message = [];
          err.errors.map((error) => { // eslint-disable-line array-callback-return
            message.push(error.message);
          });
          return message;
        })()
      });
    });
}

/**
 * Edits a User
 * @exports edit
 * @param {any} req
 * @param {any} res
 *@returns {any} res
 */
export function edit(req, res) {
  User.update(req.body, { where: { id: req.params.id } })
    .then((numberOfRows) => {
      if (numberOfRows > 0) {
        return res.status(200).json({
          message: 'User edited successfully'
        });
      } else { // eslint-disable-line no-else-return
        res.status(404).json({
          message: 'User not found'
        });
      }
    });
}

/**
 * Deletes a User
 * @exports destroy
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function destroy(req, res) {
  User.destroy({ where: { id: req.params.id } })
    .then((numberOfRows) => {
      if (numberOfRows > 0) {
        return res.status(200).json({
          message: 'User deleted successfully'
        });
      } else { // eslint-disable-line no-else-return
        res.status(404).json({
          message: 'User not found'
        });
      }
    });
}

/**
 * Attempts to authenticate a User
 * @exports login
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function login(req, res) {
  const userdata = req.body;
  if (userdata.username && userdata.password) {
    User.find({ where: { username: userdata.username } })
      .then((user) => {
        if (user && user.authenticate(userdata.password)) {
          Role.find({ where: { id: user.roleId } })
            .then((role) => {
              const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: role.title
              }, process.env.SECRET);
              return res.status(200).json({
                message: 'Login successful',
                token
              });
            });
        } else {
          return res.status(403).json({
            message: 'Authentication failed. Username or Password incorrect'
          });
        }
      });
  } else {
    return res.status(400).json({
      message: 'Please fill required fields'
    });
  }
}

/**
 * Fetches document created by a User
 * @exports documents
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function documents(req, res) {
  Document.findAll({ where: { userId: req.params.id } })
    .then((fetchedDocuments) => {
      res.status(200).json(fetchedDocuments);
    });
}
