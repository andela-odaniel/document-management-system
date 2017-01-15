import Document from '../models/document.model';
import Role from '../models/role.model';

/**
 * Fetches a Document
 * if the user has the permission to view it
 * @exports get
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function get(req, res) {
  Document.findOne({ where: { id: req.params.id } })
    .then((document) => {
      Role.findOne({ where: { id: document.roleId } })
        .then((role) => {
          if (
            (role.title === 'public') ||
            (req.decoded.id === document.userId) ||
            (role.title === 'role' && req.decoded.role === role.title)
          ) {
            return res.status(200).json(document);
          } else { // eslint-disable-line no-else-return
            return res.status(403).json({
              message: 'You are not authorized to view the resource'
            });
          }
        });
    });
}

/**
 * Fetches all documents
 * that the user has permission to view
 * @exports getAll
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function getAll(req, res) {
  if (req.decoded.role === 'admin') {
    Document.findAll().then((documents) => {
      res.status(200).json(documents);
    });
  } else {
    Document.findAll({
      where: {
        $or: [{
          userId: req.decoded.id
        }, {
          access: 'public'
        }]
      }
    }).then((documents) => {
      res.status(200).json(documents);
    });
  }
}

/**
 * Fetches all role access documents
 * that the user has permission to view
 * @exports getAll
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function getAllForRole(req, res) {
  Role.findOne({
    where: {
      title: req.decoded.role
    }
  }).then((role) => {
    Document.findAll({
      where: {
        $and: [{
          access: 'role'
        }, {
          roleId: role.id
        }]
      }
    }).then((documents) => {
      res.status(200).json(documents);
    });
  });
}

/**
 * Fetches all Documents
 * created by a user
 * @exports getAll
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function getAllByUser(req, res) {
  Document.findAll({ where: { userId: req.decoded.id } })
    .then((documents) => {
      res.status(400).json(documents);
    });
}

/**
 * Creates a Document
 * @exports create
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function create(req, res) {
  Role.findOne({ where: { title: req.decoded.role } })
    .then((role) => {
      const newDocument = {};
      Object.assign(newDocument, req.body, { userId: req.decoded.id, roleId: role.id });
      Document.create(newDocument)
        .then((document) => {
          res.status(201).json({
            message: 'Document created successfully',
            document
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
    });
}

/**
 * Edits a Document
 * @exports edit
 * @param {any} req
 * @param {any} res
 *@returns {any} res
 */
export function edit(req, res) {
  Document.update(req.body, {
    where: {
      $and: [{
        id: req.params.id
      }, {
        userId: req.decoded.id
      }]
    }
  }).then((numberOfRows) => {
    if (numberOfRows > 0) {
      return res.status(200).json({
        message: 'Document edited successfully'
      });
    } else { // eslint-disable-line no-else-return
      return res.status(404).json({
        message: 'Document not found'
      });
    }
  });
}

/**
 * Deletes a Document
 * @exports destroy
 * @param {any} req
 * @param {any} res
 * @returns {any} res
 */
export function destroy(req, res) {
  Document.destroy({
    where: {
      $and: [{
        id: req.params.id
      }, {
        userId: req.decoded.id
      }]
    }
  }).then((numberOfRows) => {
    if (numberOfRows > 0) {
      return res.status(200).json({
        message: 'Document deleted successfully'
      });
    } else { // eslint-disable-line no-else-return
      return res.status(404).json({
        message: 'Document not found'
      });
    }
  });
}
