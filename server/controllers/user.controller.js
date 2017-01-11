import {
  get,
  getAll,
  create,
  edit,
  login,
  destroy,
  documents
} from '../actions/user.action';

const UserController = {
  get,
  getAll,
  create,
  edit,
  delete: destroy,
  login,
  documents
};

export default UserController;
