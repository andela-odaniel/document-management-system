import {
  get,
  getAll,
  getAllForRole,
  create,
  edit,
  destroy
} from '../actions/document.action';

const DocumentController = {
  get,
  getAll,
  getAllForRole,
  create,
  edit,
  delete: destroy
};

export default DocumentController;
