import {
  get,
  getAll,
  create,
  destroy
} from '../actions/role.action';

const RoleController = {
  get,
  getAll,
  create,
  delete: destroy
};

export default RoleController;
